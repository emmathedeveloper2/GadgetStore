// src/components/DigitalClock.jsx
import { useEffect, useState } from "react";

/**
 * DigitalClock props:
 *  - timezone: string (IANA timezone, default "Africa/Lagos")
 *  - twelveHour: boolean (true => 12-hour with AM/PM, false => 24-hour)
 *  - showDate: boolean (true => show date line below time)
 */
export default function DigitalClock({
  timezone = "Africa/Lagos",
  twelveHour = true,
  showDate = true,
}) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Format time using Intl for timezone correctness
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !!twelveHour,
    timeZone: timezone,
  };

  const dateOptions = {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: timezone,
  };

  const timeString = new Intl.DateTimeFormat(undefined, timeOptions).format(
    now
  ); // e.g. "10:23:45 PM" or "22:23:45"
  const dateString = new Intl.DateTimeFormat(undefined, dateOptions).format(
    now
  ); // e.g. "Fri, September 5, 2025"

  // Split out hour/minute/second & AM/PM for finer control if needed
  let [hhmmss, ampm] = [timeString, ""];
  if (twelveHour) {
    // some locales place AM/PM at end or start, try to extract
    const m = timeString.match(/(AM|PM|am|pm)$/);
    if (m) {
      ampm = m[0];
      hhmmss = timeString.replace(m[0], "").trim();
    } else {
      // fallback: try Intl parts
      const parts = new Intl.DateTimeFormat(undefined, {
        ...timeOptions,
        hour12: true,
      }).formatToParts(now);
      const timeParts = parts.filter((p) => p.type !== "dayPeriod");
      hhmmss = timeParts.map((p) => p.value).join("");
      const dp = parts.find((p) => p.type === "dayPeriod");
      ampm = dp ? dp.value : "";
    }
  }

  return (
    <div className="inline-flex items-center justify-center">
      <div className="flex flex-col items-center p-4  w-56">
        {/* <div className="text-xs opacity-90 mb-1">Live — {timezone}</div> */}

        <div
          aria-live="polite"
          className="flex items-baseline gap-2"
          style={{ lineHeight: 1 }}
        >
          <div className="text-4xl font-extrabold tracking-tight tabular-nums">
            {hhmmss}
          </div>
          {twelveHour && (
            <div className="text-sm font-semibold ml-1 self-start opacity-90">
              {ampm}
            </div>
          )}
        </div>

        {showDate && (
          <div className="mt-2 text-sm opacity-95 text-green-500 text-center">
            {dateString}
          </div>
        )}
      </div>
    </div>
  );
}
