import { getSelectionKey } from "./productLookup";
export const calculateFinancials = (selectedItems, productMap) => {
  let subtotal = 0;
  let originalTotal = 0;

  Object.entries(selectedItems).forEach(([key, qty]) => {
    const product = productMap?.[key];
    if (product && qty > 0) {
      subtotal += product.price * qty;
      originalTotal += (product.originalPrice || product.price) * qty;
    }
  });

  return {
    subtotal,
    originalTotal,
    savings: Math.max(0, originalTotal - subtotal),
  };
};
export const applySensorHubRule = (items, productId, newQty) => {
  const next = { ...items };

  if (productId === "motion-sensor" && newQty > 0) {
    const hubKey = getSelectionKey("wyze-hub", "default");
    next[hubKey] = 1;
  }

  return next;
};
