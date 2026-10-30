"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";

export default function StoreProvider({ children }) {
  // Create the store instance the first time this renders
  const [store] = useState(makeStore);

  return <Provider store={store}>{children}</Provider>;
}
