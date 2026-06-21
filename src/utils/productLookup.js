import productsData from "../data/products.json";

export const getSelectionKey = (productId, variantId = "default") =>
  `${productId}-${variantId}`;


const generateProductLookup = () => {
  const lookupMap = {};

  productsData.steps.forEach((step) => {
    step.items.forEach((item) => {
      // Products with color/variant options
      if (item.variants && item.variants.length > 0) {
        item.variants.forEach((variant) => {
          const key = `${item.id}-${variant.id}`;
          lookupMap[key] = {
            ...item,
            category: item.category || step.id, 
            variantId: variant.id,
            variantName: variant.name,
          };
        });
      } else {
        const key = `${item.id}-default`;
        lookupMap[key] = {
          ...item,
          category: item.category || step.id,
          variantId: "default",
          variantName: "",
        };
      }
    });
  });

  return lookupMap;
};

export const PRODUCT_LOOKUP_MAP = generateProductLookup();