"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  changeCartQuantity,
  removeFromCart,
} from "@/lib/slices/cartSlice";
import styles from "./page.module.css";

function getColorName([red, green, blue]) {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  if (max - min < 35) {
    if (max < 70) return "Black";
    if (max > 220) return "White";
    return "Gray";
  }

  const hue =
    max === red
      ? ((green - blue) / (max - min) + (green < blue ? 6 : 0)) * 60
      : max === green
        ? ((blue - red) / (max - min) + 2) * 60
        : ((red - green) / (max - min) + 4) * 60;

  if (hue < 15 || hue >= 345) return "Red";
  if (hue < 45) return "Orange";
  if (hue < 70) return "Yellow";
  if (hue < 165) return "Green";
  if (hue < 200) return "Cyan";
  if (hue < 255) return "Blue";
  if (hue < 290) return "Purple";
  return "Pink";
}

function ProductColor({ image }) {
  const [color, setColor] = useState(null);

  function sampleImage(event) {
    const imageElement = event.currentTarget;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;

    try {
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        setColor({ name: "unavailable", hex: "#d8d8d8" });
        return;
      }

      context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
      const { data } = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      const colors = new Map();
      const allColors = new Map();

      for (let index = 0; index < data.length; index += 4) {
        if (data[index + 3] < 150) continue;

        const rgb = [data[index], data[index + 1], data[index + 2]];
        const key = rgb.map((value) => Math.round(value / 32) * 32).join(",");
        allColors.set(key, (allColors.get(key) || 0) + 1);
        if (Math.max(...rgb) < 245) {
          colors.set(key, (colors.get(key) || 0) + 1);
        }
      }

      const palette = colors.size ? colors : allColors;
      const dominantColor = [...palette.entries()].sort(
        (first, second) => second[1] - first[1],
      )[0]?.[0];

      if (!dominantColor) {
        setColor({ name: "unavailable", hex: "#d8d8d8" });
        return;
      }

      const rgb = dominantColor.split(",").map(Number);
      const hex = `#${rgb.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
      setColor({ name: getColorName(rgb), hex });
    } catch {
      setColor({ name: "unavailable", hex: "#d8d8d8" });
    }
  }

  return (
    <p className={styles.colorInfo}>
      <span
        className={styles.colorSwatch}
        style={{ backgroundColor: color?.hex || "#d8d8d8" }}
      />
      {color ? `Approx. ${color.name}` : "Finding color..."}
      <img
        className={styles.colorSampler}
        src={image}
        crossOrigin="anonymous"
        alt=""
        aria-hidden="true"
        onLoad={sampleImage}
        onError={() => setColor({ name: "unavailable", hex: "#d8d8d8" })}
      />
    </p>
  );
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  return (
    <main className={styles.cart}>
      <h1 className={styles.title}>Shopping Cart</h1>
      {cart.cartProducts.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.columnHeadings}>
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span className={styles.removeHeading}>Remove</span>
          </div>
          <div>
            {cart.cartProducts.map((item) => (
              <article className={styles.row} key={item.id}>
                <div className={styles.product}>
                  <img className={styles.image} src={item.image} alt="" />
                  <div className={styles.productInfo}>
                    <h2>{item.title}</h2>
                    <ProductColor image={item.image} />
                  </div>
                </div>
                <div className={styles.quantity}>
                  <button
                    type="button"
                    aria-label={`Decrease ${item.title} quantity`}
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      dispatch(
                        changeCartQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        }),
                      )
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.title} quantity`}
                    disabled={item.quantity >= 10}
                    onClick={() =>
                      dispatch(
                        changeCartQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        }),
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <p className={styles.price}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className={styles.removeButton}
                  type="button"
                  aria-label={`Remove ${item.title} from cart`}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" />
                  </svg>
                </button>
              </article>
            ))}
          </div>
          <div className={styles.summary}>
            <p>Total quantity: {cart.totalQuantity}</p>
            <p>Total: ${cart.totalPrice.toFixed(2)}</p>
          </div>
        </>
      )}
    </main>
  );
}
