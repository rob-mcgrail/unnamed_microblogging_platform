import { User } from "../types";

const process = (
  user: User,
  events: string[],
  modifiers: any[]
): number => {
  let money = parseInt(user.money as unknown as string);

  events.forEach((e) => {
    const event = JSON.parse(e);
    if (event.subject == user.id) {
      console.log(event);
      modifiers.forEach((mod) => {
        // Something in here but for now...
      });
  
      money +=1;
    }
  });

  return money;
};

export default process;