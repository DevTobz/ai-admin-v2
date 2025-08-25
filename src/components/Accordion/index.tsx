import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultActiveIds?: string[];
  className?: string;
  itemClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  activeTitleClassName?: string;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultActiveIds = [],
  className = "",
  itemClassName = "",
  titleClassName = "",
  contentClassName = "",
  activeTitleClassName = "",
  icon = <FaChevronDown color="#141B34" />,
  activeIcon = <MinusIcon />,
}) => {
  const [activeIds, setActiveIds] = useState<string[]>(defaultActiveIds);

  const toggleItem = (id: string) => {
    setActiveIds((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  return (
    <div className={`w-full ${className}`}>
      {items.map((item) => {
        const isActive = activeIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`border-b border-border mb-2 overflow-hidden ${itemClassName} ${
              isActive ? "border-gray-300" : ""
            }`}
          >
            <button
              type="button"
              className={`flex items-center justify-between w-full p-4 text-left focus:outline-none ${titleClassName} ${
                isActive ? activeTitleClassName : ""
              }`}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isActive}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="font-semibold">{item.title}</span>
              <span className="ml-2">{isActive ? activeIcon : icon}</span>
            </button>
            <div
              id={`accordion-content-${item.id}`}
              className={`transition-all duration-300 ease-in-out ${
                isActive ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className={`px-4 pb-4 ${contentClassName}`}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Simple icon components (you can replace these with your own icons)
const MinusIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12H4"
    />
  </svg>
);

export default Accordion;
