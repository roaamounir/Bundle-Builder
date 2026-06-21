const CompactItem = ({
  product,
  isSelected,
  onToggle,
  quantity,
  onUpdateQuantity,
  showCounter = true,
}) => (
  <div
    onClick={onToggle}
    className={`border-2 rounded-xl p-4 md:p-5 cursor-pointer transition-all duration-200 ${
      isSelected
        ? "border-[#4E2FD2] bg-[#F4F1FF]"
        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
    }`}
  >
    <div className="flex flex-row justify-between items-start gap-2 md:gap-4">
      <div className="flex-1 overflow-hidden">
        <h3 className="font-bold text-[#0B0D10] text-[15px] md:text-[17px] leading-tight truncate md:truncate-none">
          {product.name}
        </h3>
        <p className="text-[12px] md:text-[13px] text-gray-500 mt-1 leading-snug">
          {product.description}
        </p>

        {product.features?.length > 0 && (
          <ul className="mt-3 space-y-1">
            {product.features.slice(0, 2).map((feature) => (
              <li
                key={feature}
                className="text-[11px] md:text-[12px] text-gray-700 flex items-center font-medium"
              >
                <span className="text-[#00A884] mr-2">✓</span> {feature}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-right shrink-0">
        <span className="block text-[16px] md:text-[20px] font-extrabold text-[#0B0D10]">
          ${product.price}
        </span>
        <span className="text-[10px] md:text-[11px] text-gray-400 font-medium">
          / mo
        </span>
      </div>
    </div>

    {showCounter && (
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Qty
        </span>
        <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
          <button
            disabled={quantity === 0}
            onClick={(e) => {
              e.stopPropagation();
              onUpdateQuantity(-1);
            }}
            className={`px-2.5 py-1 text-sm font-bold transition-colors ${
              quantity === 0
                ? "opacity-40 cursor-not-allowed text-gray-400"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            -
          </button>
          <span className="px-3 text-sm font-bold text-[#0B0D10] w-8 text-center">
            {quantity}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateQuantity(1);
            }}
            className="px-2.5 py-1 text-gray-600 hover:bg-gray-50 text-sm font-bold"
          >
            {" "}
            +{" "}
          </button>
        </div>
      </div>
    )}
  </div>
);

export default CompactItem;
