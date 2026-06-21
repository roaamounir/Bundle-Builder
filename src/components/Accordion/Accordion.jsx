import { useState } from "react";
import productsData from "../../data/products.json";
import AccordionStep from "./AccordionStep";
import { stepIcons, nextTitles } from "../UI/constants";
const Accordion = () => {
  const [openStep, setOpenStep] = useState(0);

  return (
    <div>
      {productsData.steps.map((stepData, index) => (
        <AccordionStep
          key={stepData.id} 
          index={index}
          stepData={stepData}
          icon={stepIcons[stepData.id]}
          nextStepTitle={nextTitles[index]}
          isOpen={openStep === index}
          onToggle={() =>
            setOpenStep((prev) => (prev === index ? -1 : index))
          }
          onNext={() => setOpenStep((prev) => prev + 1)}
        />
      ))}
    </div>
  );
};

export default Accordion;
