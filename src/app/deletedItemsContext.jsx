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
        : [...items, product],
    );
  }

  return (
    <DeletedItemsContext.Provider
      value={{ deletedProducts, addDeletedProduct, cartProducts, addToCart }}
    >
      {children}
    </DeletedItemsContext.Provider>
  );
}

export function useDeletedItems() {
  return useContext(DeletedItemsContext);
}
