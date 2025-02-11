import React, { useEffect, useState } from "react";
import { Event } from "~/types";
import { useUser } from "~/contexts/user-context";

interface MoneyCountProps {
  initialMoney: number;
  events: Event[];
  onComplete?: () => void; // Optional callback when animation finishes
}

const MoneyTicker: React.FC<MoneyCountProps> = ({ initialMoney, events, onComplete }) => {
  const [displayedMoney, setDisplayedMoney] = useState(parseInt(initialMoney as unknown as string));
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [eventIndex, setEventIndex] = useState(0);
  const [localEvents, setLocalEvents] = useState<Event[]>([]); // Store the incoming events locally
  const { user } = useUser();

  // Reset when new events arrive
  useEffect(() => {
    if (events.length > 0) {
      setLocalEvents(events); // Store new events
      setEventIndex(0); // Restart processing
    }
  }, [events]); // Reset effect when parent updates `events`

  useEffect(() => {
    if (eventIndex >= localEvents.length) return; // Stop when all events are processed

    const event = localEvents[eventIndex]; // Get the current event
    if (!event || event.money === undefined) return;

    let start = displayedMoney;
    let end = displayedMoney + event.money;
    let duration = 100;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayedMoney(Math.floor(start + (end - start) * progress));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayedMoney(end);
        setAllEvents((prev) => [...prev, event]); // Store all events (none are lost)
        setEventIndex((prev) => prev + 1); // Move to next event
        if (eventIndex + 1 >= localEvents.length && onComplete) {
          onComplete();
        }
      }
    };

    requestAnimationFrame(step);
  }, [eventIndex, localEvents]); // Now listens to `localEvents` to detect changes

  const formatEvent = (e: Event) => {
    let actorName = (e.actor === user.id) ? 'You' : e.actorName;
    let subjectName = (e.subject === user.id) ? 'you' : e.subjectName;
    if (e.subject === e.actor) {
      subjectName = 'yourself';
    }
    if (e.event == 'post') {
      subjectName = '';
    }
    let action = `${e.event}ed`;
    let description = `${actorName} ${action} ${subjectName}`;

    if (e.money) {
      description += ` ($${e.money})`;
    }
    return description;
  }

  return (
    <div className="py-4">
      <p className="text-2xl text-yellow-500 font-bold mb-4">💵 ${displayedMoney}</p>
      <div className="overflow-hidden max-h-40">
        <ul className="space-y-1">
          {allEvents.slice(-5).reverse().map((e, idx) => ( // Only show last 5 events, most recent first
            <li key={idx} className="text-sm text-yellow-600">
              {formatEvent(e)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoneyTicker;
