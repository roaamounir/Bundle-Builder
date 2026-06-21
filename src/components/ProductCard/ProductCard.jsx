import { getImage } from "../../utils/imageLoader";
import { useState } from "react";
import { getSelectionKey } from "../../utils/productLookup";

const ProductCard = ({
  product,
  isSelected,
  onUpdateQuantity,
  selectedItems,
}) => {
  const [activeVariantId, setActiveVariantId] = useState(() => {
    if (product?.variants?.length > 0) {
      if (selectedItems) {
        const selectedVariant = product.variants.find(
          (v) => (selectedItems[getSelectionKey(product.id, v.id)] || 0) > 0,
        );
        if (selectedVariant) return selectedVariant.id;
      }

      return product.variants[0]?.id || "default";
    }

    return "default";
  });

  const key = getSelectionKey(product.id, activeVariantId);
  const currentQty = selectedItems ? selectedItems[key] || 0 : 0;

  return (
    <div
      className={`relative bg-white rounded-[10px] p-4 transition-all duration-200 
  flex flex-col md:flex-col lg:flex-row items-center gap-[20px] h-full 
  border-2
  ${
    isSelected
      ? "border-[#4E2FD2] shadow-md bg-[#F4F1FF]"
      : "border-transparent hover:border-gray-300"
  }`}
    >
      {product.discount && (
        <span className="absolute top-3 left-3 bg-indigo-700 text-white text-[10px] font-bold px-4 py-0.5 rounded-full">
          {product.discount}
        </span>
      )}

      <img
        src={getImage(product.image)}
        alt={product.name}
        className="w-[150px] h-[100px] md:w-[100px] md:h-[90px] lg:w-[101px] lg:h-[137px] object-contain flex-shrink-0"
      />
      <div className="flex-1 flex flex-col justify-between w-full min-w-0">
        {" "}
        <div>
          <h3 className="font-bold text-[#1F1F1F] text-[14px] md:text-[16px] truncate">
            {product.name}
          </h3>
          <p className="text-[12px] text-gray-500 mt-1 mb-1 leading-tight md:text-[10px] lg:text-[12px]">
            {product.description}
            {product.learnMore && (
              <a
                href={`/learn-more/${product.id}`}
                className="text-indigo-600 underline text-[12px]"
              >
                Learn More
              </a>
            )}
          </p>
        </div>
        {product.variants?.length > 0 && (
          <div className="flex gap-1 md:gap-0.5 lg:gap-1 md:m-0 mb-2 mt-1">
            {product.variants.map((v) => (
              <div
                key={v.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveVariantId(v.id);
                }}
                className={`flex items-center gap-1 md:gap-0.5 px-1 md:px-0.5 py-1 md:py-0.5 cursor-pointer transition-all ${
                  activeVariantId === v.id
                    ? "border border-[#4E2FD2] bg-[#F4F1FF]"
                    : "border border-gray-300 bg-white"
                }`}
              >
                {v.icon && (
                  <div className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full overflow-hidden flex-shrink-0">
                    <img src={getImage(v.icon)} alt={v.name} />
                  </div>
                )}

                <span className="text-[10px] font-medium whitespace-nowrap md:text-[8px] lg:text-[10px]">
                  {v.name}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-row items-center justify-between mt-auto pt-4 w-full gap-2  md:m-0">
          <div className="flex items-center">
            <button
              disabled={currentQty === 0}
              onClick={(e) => {
                e.stopPropagation();
                onUpdateQuantity(product.id, activeVariantId, -1);
              }}
              className={`w-6 h-6  border border-gray-300 rounded-[4px] bg-white flex items-center justify-center text-[10px] sm:text-xs font-bold transition-colors
    ${currentQty === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"}`}
            >
              -
            </button>
            <span className="w-4 h-4  flex items-center justify-center text-[10px] font-bold">
              {currentQty}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateQuantity(product.id, activeVariantId, 1);
              }}
              className="w-6 h-6 border border-gray-300 rounded-[4px] p-2 bg-[#F0F4F7] hover:bg-gray-50 flex items-center justify-center text-[10px] sm:text-xs"
            >
              +
            </button>
          </div>
          <div className="text-right">
            {product.originalPrice && (
              <p className="text-[9px] lg:text-[16px] text-[#D8392B] line-through leading-none mb-0.5  md:m-0">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-[14px] lg:text-[16px]  text-[#1F1F1F] leading-none">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
