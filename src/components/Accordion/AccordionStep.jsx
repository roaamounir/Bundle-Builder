import { useStore } from "../../store/useStore";
import ProductCard from "../ProductCard/ProductCard";
import NextButton from "../UI/NextButton";
import CompactItem from "../ProductCard/CompactItem";
import { getSelectionKey } from "../../utils/productLookup";

const AccordionStep = ({
  stepData,
  isOpen,
  index,
  onToggle,
  onNext,
  icon,
  nextStepTitle,
}) => {
  const selectedItems = useStore((state) => state.selectedItems);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const selectPlan = useStore((state) => state.selectPlan);
  const isPlanOrSensor = stepData.id === "plan" || stepData.id === "sensors";

  const selectedCount = stepData.items.reduce((count, item) => {
    const variants = item.variants || [{ id: "default" }];
    const hasSelectedVariant = variants.some((v) => {
      const key = getSelectionKey(item.id, v.id);
      return (selectedItems[key] || 0) > 0;
    });
    return hasSelectedVariant ? count + 1 : count;
  }, 0);


  const isReadOnlySection = stepData.id === "plan" || stepData.id === "sensors";

  const setSinglePlanSelection = (productId) => {
    selectPlan(productId);
  };

  return (
    <div
      className={`border border-gray-200  overflow-hidden transition-colors duration-300 ${
        isOpen ? "bg-[#EDF4FF]" : "bg-white"
      }`}
    >
      <div
        className={`p-1 flex flex-col gap-3 cursor-pointer transition-colors duration-300 ${
          isOpen ? "bg-[#EDF4FF]" : "bg-white"
        }`}
        onClick={onToggle}
      >
        <span className="text-[12px] text-[#484848] font-bold tracking-wider uppercase ">
          STEP {index + 1} OF 4
        </span>
        <div className="p-2 border-t border-gray-200 ">
          <div className="w-full h-[2px]" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={icon}
                alt="Step Icon"
                className="w-6 h-6 object-contain"
              />
              <h2 className="text-[16px] sm:text-[20px] lg:text-[28px] font-bold text-[#0B0D10]">
                {" "}
                {stepData.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {selectedCount > 0 && (
                <span className="text-[14px] font-semibold text-[#4E2FD2]">
                  {selectedCount} selected
                </span>
              )}
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="p-6 border-t border-gray-300 ">
          <div
            className={`grid gap-4 items-stretch ${
              isPlanOrSensor
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-5 lg:grid-cols-2"
            }`}
          >
            {" "}
            {stepData.items.map((item, index) => {
              const variants = item.variants || [{ id: "default" }];
              const isSelected = variants.some(
                (v) => (selectedItems[`${item.id}-${v.id}`] || 0) > 0,
              );

              const isFifthItem = index === 4;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col h-full col-span-1 
       ${isFifthItem ? "lg:col-span-2 flex justify-center" : ""} 
      `}
                >
                  <div
                    className={`h-full w-full ${isFifthItem ? "lg:max-w-[400px] mx-auto" : ""}`}
                  >
                    {isReadOnlySection ? (
                      <CompactItem
                        key={item.id}
                        product={item}
                        isSelected={isSelected}
                        showCounter={stepData.id !== "plan"}
                        onToggle={() => {
                          if (stepData.id === "plan") {
                            setSinglePlanSelection(item.id);
                            return;
                          }
                          updateQuantity(
                            item.id,
                            "default",
                            isSelected ? 0 : 1,
                          );
                        }}
                        quantity={selectedItems[`${item.id}-default`] || 0}
                        onUpdateQuantity={(delta) =>
                          updateQuantity(item.id, "default", delta)
                        }
                      />
                    ) : (
                      <ProductCard
                        product={item}
                        selectedItems={selectedItems}
                        isSelected={isSelected}
                        onUpdateQuantity={updateQuantity}
                        compact={stepData.id === "cameras"}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {index < 3 && (
            <div className="flex justify-center w-full mt-5 whitespace-nowrap px-6 py-3">
              <NextButton text={nextStepTitle} onClick={onNext} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordionStep;
