import { getInitialContext } from "@ionic/portals";

interface InitialContext {
  accessToken: string;
  refreshToken: string;
}

const initialContextDefaults: InitialContext = {
  accessToken: "0b12e808-4621-4e66-8dc7-2202390e97df",
  refreshToken: "6eccb693-6216-4991-bf17-4b4e7164d38f",
};

export const resolveInitialContext = (): InitialContext => {
  const initialContext = getInitialContext<InitialContext>();
  return initialContext?.value || initialContextDefaults;
};
