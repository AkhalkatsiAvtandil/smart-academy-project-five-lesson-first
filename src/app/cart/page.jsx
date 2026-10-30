"use client";

import Productitem from "@/components/product/Productitem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeCartQuantity } from "@/lib/slices/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  return (
    <div>
      <h1>Cart</h1>
      {cart.cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.cartProducts.map((item) => (
          <Productitem
            key={item.id}
            item={item}
            onQuantityChange={(id, quantity) =>
              dispatch(changeCartQuantity({ id, quantity }))
            }
          />
        ))
      )}
      <p>Total Quantity: {cart.totalQuantity}</p>
      <p>Total Price: ${cart.totalPrice.toFixed(2)}</p>
    </div>
  );
}
