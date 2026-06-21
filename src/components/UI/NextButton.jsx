const NextButton = ({ text, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-[242px] h-[39px] text-[#4E2FD2] rounded-[7px] 
                 py-[5px] px-[16px] border border-[#4E2FD2] 
                 font-gilroy text-[18px] leading-[24px] 
                 flex items-center justify-center gap-[10px] 
                 transition-all active:scale-95 ${className}`}
    >
      {text}
    </button>
  );
};

export default NextButton;