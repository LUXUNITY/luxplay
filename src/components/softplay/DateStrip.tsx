import { Check } from "lucide-react";
import { getAvailableDates, formatDateTile } from "./dateSlots";

interface Props {
  selectedDate: string;
  onSelect: (iso: string) => void;
  accent: "cyan" | "pink";
}

const accentMap = {
  cyan: {
    border: "border-neon-cyan",
    bg: "bg-neon-cyan/10",
    text: "text-neon-cyan",
    shadow: "shadow-[0_0_20px_rgba(0,238,255,0.25)]",
    hover: "hover:border-neon-cyan/40",
    dot: "bg-neon-cyan",
  },
  pink: {
    border: "border-neon-pink",
    bg: "bg-neon-pink/10",
    text: "text-neon-pink",
    shadow: "shadow-[0_0_20px_rgba(255,0,204,0.25)]",
    hover: "hover:border-neon-pink/40",
    dot: "bg-neon-pink",
  },
};

const DateStrip = ({ selectedDate, onSelect, accent }: Props) => {
  const dates = getAvailableDates();
  const c = accentMap[accent];

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <p className={`font-display text-xs tracking-[0.3em] text-white/40 text-center mb-4`}>
        CHOOSE YOUR DATE
      </p>
      <div className="overflow-x-auto -mx-6 px-6 pb-2 scrollbar-hide">
        <div className="flex gap-3 min-w-min justify-start md:justify-center">
          {dates.map(({ iso, date }) => {
            const t = formatDateTile(date);
            const isSelected = selectedDate === iso;
            return (
              <button
                key={iso}
                onClick={() => onSelect(iso)}
                className={`relative shrink-0 w-[72px] h-[88px] flex flex-col items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? `border-2 ${c.border} ${c.bg} ${c.shadow}`
                    : `border border-white/10 bg-[#0a0a16] ${c.hover}`
                }`}
              >
                <span
                  className={`font-display text-[10px] tracking-[0.2em] mb-1 ${
                    isSelected ? c.text : "text-white/40"
                  }`}
                >
                  {t.weekday}
                </span>
                <span
                  className={`font-display text-3xl leading-none ${
                    isSelected ? c.text : "text-white/90"
                  }`}
                >
                  {t.day}
                </span>
                <span
                  className={`font-display text-[10px] tracking-[0.2em] mt-1 ${
                    isSelected ? c.text : "text-white/40"
                  }`}
                >
                  {t.month}
                </span>
                {isSelected && (
                  <div
                    className={`absolute -top-2 -right-2 w-5 h-5 ${c.dot} rounded-full flex items-center justify-center`}
                  >
                    <Check className="w-3 h-3 text-[#070710]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DateStrip;
