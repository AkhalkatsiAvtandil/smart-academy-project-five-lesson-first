"use client";

import { createContext, useContext, useState } from "react";

const DeletedItemsContext = createContext(null);

export function DeletedItemsProvider({ children }) {
  const [deletedProducts, setDeletedProducts] = useState([]);

  function addDeletedProduct(product) {
    setDeletedProducts((items) => [...items, product]);
  }

  return (
    <DeletedItemsContext.Provider
      value={{ deletedProducts, addDeletedProduct }}
    >
      {children}
    </DeletedItemsContext.Provider>
  );
}

export function useDeletedItems() {
  return useContext(DeletedItemsContext);
}
