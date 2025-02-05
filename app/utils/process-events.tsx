import { User } from "../types";

const process = (
  startMoney: number,
  userKey: string,
  events: string[],
  modifiers: any[]
): number => {
  let money = parseInt(startMoney as unknown as string);

  events.forEach((e) => {
    const event = JSON.parse(e);
    if (event.subject == userKey) {

      modifiers.forEach((mod) => {
        // Something in here but for now...
      });
  
      money +=1;
    }
  });

  return money;
};

export default process;