import { publish } from "@ionic/portals";

type Messages = { topic: "navigate:back" };

export const publishNavigateBackMessage = async () => {
  await publish<Messages>({ topic: "navigate:back" });
};
