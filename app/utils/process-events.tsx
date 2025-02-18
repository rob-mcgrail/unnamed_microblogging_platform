import { User, Event, Modifier } from "../types";

const process = (
  startMoney: number,
  userKey: string,
  events: Event[],
  modifiers: Modifier[]
): { money: number, events: Event[] } => {
  let money = parseInt(startMoney as unknown as string);
  let processedEvents: Event[] = [];

  events.forEach((e) => {
    if (e.subject == userKey) {

      if (e.event == 'post') {
        e.money = 1;
        e.emoji = '💩';
        e.modifiers = ['spambot'];
        processedEvents.push(e);
        money += 1;
      }

      if (e.event == 'repost') {
        e.money = 5;
        e.emoji = '👩🏻‍💻';
        e.modifiers = ['boosted-1'];
        processedEvents.push(e);
        money += 5;
      }

      if (e.actor == userKey){
        if (e.event == 'fav') {
          e.money = 3;
          e.emoji = '👯🐣';
          e.modifiers = ['favorites-1', 'sociable-1'];
          processedEvents.push(e);
          money += 3;
        }
      }
      else {
        if (e.event == 'fav') {
          e.money = 2;
          e.emoji = '🐣';
          e.modifiers = ['favorites-1'];
          processedEvents.push(e);
          money += 2;
        }
      }

    }
    else {
      if (['fav', 'repost'].includes(e.event)) {
        e.money = 1;
        e.emoji = '👯';
        e.modifiers = ['sociable-1'];
        processedEvents.push(e);
        money += 1;
      }
    }
  });

  return { events: processedEvents, money };
};

export default process;