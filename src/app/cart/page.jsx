"use client";

import Productitem from "@/components/product/Productitem";
import { useDeletedItems } from "../deletedItemsContext";

export default function CartPage() {
  const { cartProducts } = useDeletedItems();

  return (
    <main>
      <h1>Cart</h1>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartProducts.map((item) => <Productitem key={item.id} item={item} />)
      )}
    </main>
  );
}
