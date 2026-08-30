import { Check } from "lucide-react";
import { getAvailableDates, formatDateTile } from "./dateSlots";

interface Props {
  selectedDate: string;
  onSelect: (iso: string) => void;
  accent: "cyan" | "pink";
}

const DateStrip = ({ selectedDate, onSelect, accent }: Props) => {
  const dates = getAvailableDates();

  return (
    <div className="mb-6">
      <p className="font-display text-xs tracking-widest text-foreground/50 mb-3 flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-neon-pink text-white flex items-center justify-center text-[11px] font-extrabold">1</span>
        PICK A DATE
      </p>
      <div className="overflow-x-auto -mx-1 px-1 pb-2 scrollbar-hide">
        <div className="flex gap-3 min-w-min">
          {dates.map(({ iso, date }) => {
            const t = formatDateTile(date);
            const isSelected = selectedDate === iso;
            return (
              <button
                key={iso}
                onClick={() => onSelect(iso)}
                className={`relative shrink-0 w-[64px] h-[76px] rounded-2xl flex flex-col items-center justify-center transition-transform active:translate-y-1 ${
                  isSelected
                    ? "bg-neon-pink text-white"
                    : "bg-muted text-foreground"
                }`}
                style={{
                  boxShadow: isSelected
                    ? "0 6px 0 0 #C7106F"
                    : "0 6px 0 0 #D9D9DE",
                }}
              >
                <span className="font-display text-[10px] tracking-widest mb-0.5 opacity-70">
                  {t.weekday}
                </span>
                <span className="font-display text-2xl leading-none font-extrabold">
                  {t.day}
                </span>
                <span className="font-display text-[10px] tracking-widest mt-0.5 opacity-70">
                  {t.month}
                </span>
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-neon-cyan rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-foreground" />
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
