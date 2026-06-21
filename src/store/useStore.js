import { create } from "zustand";
import { persist } from "zustand/middleware";

const getSelectionKey = (productId, variantId = "default") =>
  `${productId}-${variantId}`;

const removeItem = (items, key) => {
  const copy = { ...items };
  delete copy[key];
  return copy;
};

const setQuantitySafe = (items, key, quantity) => {
  if (quantity <= 0) return removeItem(items, key);

  return {
    ...items,
    [key]: quantity,
  };
};

const planProductIds = ["basic", "standard", "unlimited"];
const sensorProductIds = ["motion-sensor"];

const isAnySensorSelected = (items) =>
  sensorProductIds.some((sensorId) =>
    Object.entries(items).some(
      ([key, qty]) => key.startsWith(`${sensorId}-`) && qty > 0,
    ),
  );

const applyHubRule = (items, productId, newQty, nextItems) => {
  if (productId === "motion-sensor" && newQty > 0) {
    return setQuantitySafe(
      nextItems,
      getSelectionKey("wyze-hub", "default"),
      1,
    );
  }

  if (
    productId === "wyze-hub" &&
    newQty <= 0 &&
    isAnySensorSelected(nextItems)
  ) {
    return setQuantitySafe(
      nextItems,
      getSelectionKey("wyze-hub", "default"),
      1,
    );
  }

  return nextItems;
};

const getPlanSelection = (selectedItems, planId) => {
  const next = { ...selectedItems };

  planProductIds.forEach((id) => {
    const key = getSelectionKey(id, "default");
    next[key] = id === planId ? 1 : 0;
  });

  return Object.fromEntries(Object.entries(next).filter(([, q]) => q > 0));
};

const initialItems = {
  [getSelectionKey("Wyze Cam v4", "default")]: 1,
  [getSelectionKey("Wyze Cam Pan v3", "default")]: 1,
  [getSelectionKey("unlimited", "default")]: 1,
  [getSelectionKey("motion-sensor", "default")]: 1,
  [getSelectionKey("wyze-hub", "default")]: 1,
  [getSelectionKey("micro-sd", "default")]: 1,
};

export const useStore = create(
  persist(
    (set, get) => ({
      selectedItems: initialItems,

      selectPlan: (productId) =>
        set((state) => ({
          selectedItems: getPlanSelection(state.selectedItems, productId),
        })),

      saveConfiguration: () => {
        const state = get();

        const savedConfigs = JSON.parse(
          localStorage.getItem("my-saved-systems") || "[]",
        );
        const newConfig = {
          id: Date.now(),
          items: state.selectedItems,
          date: new Date().toISOString(),
        };

        localStorage.setItem(
          "my-saved-systems",
          JSON.stringify([...savedConfigs, newConfig]),
        );

        return true;
      },

      setQuantity: (productId, variantId = "default", quantity) =>
        set((state) => {
          const key = getSelectionKey(productId, variantId);
          const newQty = Math.max(0, quantity);

          let next = setQuantitySafe(state.selectedItems, key, newQty);

          next = applyHubRule(next, productId, newQty, next);

          return { selectedItems: next };
        }),

      updateQuantity: (productId, variantId = "default", delta) =>
        set((state) => {
          const key = getSelectionKey(productId, variantId);
          const current = state.selectedItems[key] || 0;
          const newQty = Math.max(0, current + delta);

          let next = setQuantitySafe(state.selectedItems, key, newQty);

          next = applyHubRule(next, productId, newQty, next);

          return { selectedItems: next };
        }),
    }),
    {
      name: "bundle-storage",
    },
  ),
);
