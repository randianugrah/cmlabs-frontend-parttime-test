"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableTextProps {
  text: string;
  className?: string;
  maxLines?: number;
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({ text, className, maxLines = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        // Only show if content is taller than its visible container
        setShouldShowReadMore(textRef.current.scrollHeight > textRef.current.clientHeight + 4);
      }
    };

    // Check after initial render and when text changes
    checkTruncation();
    // Re-check on resize for responsiveness
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [text, isExpanded]);

  if (!text) return null;

  return (
    <div className={className}>
      <div 
        ref={textRef}
        className={`transition-all duration-500 overflow-hidden text-left leading-relaxed ${
          !isExpanded ? "line-clamp-3 md:line-clamp-none" : ""
        }`}
      >
        {text}
      </div>
      
      {shouldShowReadMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center gap-1 text-orange-500 font-bold text-xs md:hidden"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp size={14} />
            </>
          ) : (
            <>
              <span>Read More</span>
              <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </div>
  );
};
