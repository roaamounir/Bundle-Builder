import { useStore } from "../../store/useStore";
import { PRODUCT_LOOKUP_MAP } from "../../utils/productLookup";
import { getImage } from "../../utils/imageLoader";
import toast from "react-hot-toast";
import { calculateFinancials } from "../../utils/cartEngine";
import { useMemo } from "react";
const ReviewPanel = () => {
  const selectedItems = useStore((state) => state.selectedItems);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const saveConfiguration = useStore((state) => state.saveConfiguration);
  const { subtotal, originalTotal, savings } = useMemo(
    () => calculateFinancials(selectedItems, PRODUCT_LOOKUP_MAP),
    [selectedItems],
  );
  const categories = [
    { id: "cameras", title: "CAMERAS" },
    { id: "sensors", title: "SENSORS" },
    { id: "extras", title: "ACCESSORIES" },
  ];
  const selectedPlan = Object.entries(selectedItems).find(([key, qty]) => {
    const product = PRODUCT_LOOKUP_MAP[key];
    return product?.category === "plan" && qty > 0;
  });

  const plan = selectedPlan ? PRODUCT_LOOKUP_MAP[selectedPlan[0]] : null;
  return (
    <div className="bg-[#EDF4FF] p-15 sm:p-5  w-full border border-blue-100 shadow-sm">
      <div>
        <span className="text-[12px] font-bold text-[#484848] tracking-[0.2em] uppercase">
          Review
        </span>
        <h1 className="text-2xl font-bold text-[#0B0D10]">
          Your security system
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>
      <div className="mt-3 pt-3 border-t border-blue-200/50 ">
        <div className="flex flex-col md:flex-row lg:flex-col gap-6">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {categories.map((category) => {
              const items = Object.entries(selectedItems).filter(
                ([key, qty]) => {
                  const product = PRODUCT_LOOKUP_MAP[key];
                  return product && product.category === category.id && qty > 0;
                },
              );

              if (items.length === 0) return null;

              return (
                <div key={category.id} className="border-b border-[#CED6DE] ">
                  <h3 className="text-[12px] font-400 text-[#A8B2BD] uppercase tracking-[0.2em] mb-2 ">
                    {category.title}
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {items.map(([key, quantity]) => {
                      const product = PRODUCT_LOOKUP_MAP[key];
                      return (
                        <div
                          key={key}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 gap-2 "
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0 pr-4">
                            <img
                              src={getImage(product.image)}
                              alt={product.name}
                              className="w-10 h-10 object-contain bg-white p-1 rounded-md border border-gray-100 flex-shrink-0"
                            />
                            <span className="text-[14px] sm:text-sm font-semibold leading-tight">
                              {" "}
                              {product.name}
                              {product.variantName && (
                                <span className="text-gray-500 font-normal block sm:inline">
                                  {" " + product.variantName}
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                            {" "}
<div className="flex items-center rounded-md shadow-sm">
                              <button
                                disabled={quantity === 0}
                                onClick={() =>
                                  updateQuantity(
                                    product.id,
                                    product.variantId,
                                    -1,
                                  )
                                }
                                className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-2 border-gray-300 rounded-[3px]  bg-white flex items-center justify-center text-[10px] sm:text-xs font-bold transition-colors ${
                                  quantity === 0
                                    ? "opacity-40 cursor-not-allowed"
                                    : ""
                                }`}
                              >
                                -
                              </button>
                              <span className="text-xs sm:text-sm font-bold w-6 text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.id,
                                    product.variantId,
                                    1,
                                  )
                                }
                                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border border-gray-300 rounded-[3px]  bg-[#F0F4F7] hover:bg-gray-50 flex items-center justify-center text-[10px] sm:text-xs"
                              >
                                +
                              </button>
                            </div>
                            <div className="text-right w-14 sm:w-16">
                              {product.originalPrice > product.price && (
                                <div className="text-[14px] text-[#6F7882] line-through">
                                  $
                                  {(product.originalPrice * quantity).toFixed(
                                    2,
                                  )}
                                </div>
                              )}

                              <div className="text-[14px] sm:text-sm font-bold text-[#4E2FD2]">
                                {product.price === 0
                                  ? "FREE"
                                  : `$${(product.price * quantity).toFixed(2)}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {plan && (
              <div className="flex flex-col py-3 border-b border-blue-200/50 gap-2">
                <h3 className="text-[12px] font-400 text-[#A8B2BD] uppercase tracking-[0.2em]">
                  plan
                </h3>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-0">
                    <img
                      src={getImage("planIcon1.png")}
                      className="w-10 h-10 object-contain rounded-md border border-gray-100"
                    />

                    <span className="font-bold text-[16px] leading-[100%] tracking-[-0.002em] [leading-trim:none]">
                      {" "}
                      {plan.name.split(" ").map((word, index) => (
                        <span
                          key={index}
                          className={
                            word.toLowerCase() === "cam"
                              ? "text-[#4E2FD2]"
                              : "text-[#000000]"
                          }
                        >
                          {word}{" "}
                        </span>
                      ))}
                    </span>
                  </div>

                  <div className="text-right">
                    {plan.originalPrice && plan.originalPrice > plan.price ? (
                      <>
                        <div className="text-[14px] text-[#6F7882] line-through decoration-[#6F7882]">
                          ${plan.originalPrice.toFixed(2)}/mo
                        </div>
                      </>
                    ) : (
                      <div className="text-[14px] font-bold text-[#6F7882]">
                        ${plan.price.toFixed(2)}/mo
                      </div>
                    )}
                    <div className="text-[14px] sm:text-sm font-bold text-[#4E2FD2]">
                      ${plan.price}/mo
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 gap-2 sm:gap-0">
              <div className="text-xs sm:text-sm font-semibold flex items-center gap-3">
                <img
                  src={getImage("transport.png")}
                  alt="Shipping Icon"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
                Fast Shipping
              </div>

              <div className="text-right">
                <div className="text-[14px] sm:text-[14px] text-[#6F7882] line-through">
                  $5.99
                </div>
                <div className="text-[14px] sm:text-[14px]  text-[#4E2FD2]">
                  FREE
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={getImage("discountIcon.png")}
                  alt="Guarantee"
                  className="w-16 h-16 sm:w-16 sm:h-16 object-contain flex-shrink-0" 
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="hidden md:block lg:hidden">
                    <span className="text-[#1F1F1F] font-bold text-[13px]">
                      30-day hassle-free returns
                    </span>
                    <p className="text-[11px] text-[#1F1F1F] leading-tight">
                      If you're not totally in love with the product, we will
                      refund you 100%.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <div className="bg-[#4E2FD2] text-white text-[10px] px-2 py-0.5 rounded font-bold mb-0.5">
                    as low as $19.19/mo
                  </div>
                  <div className="text-xl font-bold leading-none">
                    <span className="text-gray-400 line-through text-[16px] mr-2">
                      ${originalTotal.toFixed(2)}
                    </span>
                    <span className="text-[#4E2FD2] text-[20px]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="text-[12px] text-[#0AA288] font-bold leading-tight mb-2 text-center">
                  Congrats! You're saving ${savings.toFixed(2)} on your security
                  bundle!
                </div>
                <button
                  onClick={() => toast.success("Checkout!")}
                  className="w-full bg-[#4E2FD2] text-white py-3 rounded-xl font-bold hover:bg-indigo-800 shadow-lg text-base"
                >
                  Checkout
                </button>
                <button
                  onClick={() => {
                    const isSaved = saveConfiguration();
                    if (isSaved) {
                      toast.success("System saved successfully!", {
                        position: "bottom-center",
                        duration: 3000,
                      });
                    }
                  }}
                  className="w-full text-center text-[14px] text-[#484848] underline mt-3"
                >
                  Save my system for later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPanel;
