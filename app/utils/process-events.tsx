import { User, Event } from "../types";

const process = (
  startMoney: number,
  userKey: string,
  events: Event[],
  modifiers: any[]
): { money: number, events: Event[] } => {
  let money = parseInt(startMoney as unknown as string);
  let processedEvents: Event[] = [];

  events.forEach((e) => {
    if (e.subject == userKey) {

      modifiers.forEach((mod) => {
        // Something in here but for now...
      });

      e.money = 1;
      processedEvents.push(e);
      money +=1;
    }
  });

  return { events: processedEvents, money };
};

export default process;