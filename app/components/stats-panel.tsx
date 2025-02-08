import { useEffect, useState } from "react";
import TextCounters from "~/components/text-counters";
import UserInfo from "~/components/user-info";
import MoneyCount from "~/components/money-count";
import { User, Event } from "~/types";
import { data } from "@remix-run/node";

export interface StatsPanelProps {
  user: User;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ user }) => {
  const [money, setMoney] = useState(user.money);
  const [events, setEvents] = useState([] as Event[]);

  useEffect(() => {
    const fetchMoney = async () => {
      try {
        const response = await fetch("/money");
        if (!response.ok) throw new Error("Failed to fetch money");
        const data = await response.json();
        setMoney(data.money);
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching money:", error);
      }
    };

    // Polling every 10 seconds
    const intervalId = setInterval(fetchMoney, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col w-2/5 h-full bg-gray-800 text-white">
      <div className="flex-1 p-4">
        <UserInfo user={user} />
        <MoneyCount money={money} events={events} />
      </div>

      <div className="flex-1 p-4">
        <h1 className="text-xl">0/5</h1>
      </div>

      <div className="flex-1 p-4">
        <TextCounters />
      </div>
    </div>
  );
};

export default StatsPanel;