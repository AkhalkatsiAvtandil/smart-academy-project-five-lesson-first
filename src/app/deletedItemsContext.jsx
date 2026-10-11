"use client";

import { createContext, useContext, useState } from "react";

const DeletedItemsContext = createContext(null);

export function DeletedItemsProvider({ children }) {
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  function addDeletedProduct(product) {
    setDeletedProducts((items) => [...items, product]);
  }

  function addToCart(product) {
    setCartProducts((items) =>
      items.some((item) => item.id === product.id)
        ? items
        : [...items, { ...product, quantity: 1 }],
    );
  }

  function changeQuantity(id, quantity) {
    setCartProducts((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(10, quantity)) }
          : item,
      ),
    );
  }

  return (
    <DeletedItemsContext.Provider
      value={{
        deletedProducts,
        addDeletedProduct,
        cartProducts,
        addToCart,
        changeQuantity,
      }}
    >
      {children}
    </DeletedItemsContext.Provider>
  );
}

export function useDeletedItems() {
  return useContext(DeletedItemsContext);
}
