import { getInitialContext } from "@ionic/portals";

export interface InitialContextValues {
  accessToken: string;
  refreshToken: string;
}

export const initialContextDefaults: InitialContextValues = {
  accessToken: "0b12e808-4621-4e66-8dc7-2202390e97df",
  refreshToken: "6eccb693-6216-4991-bf17-4b4e7164d38f",
};

export const resolveInitialContext = (): InitialContextValues => {
  const initialContext = getInitialContext<InitialContextValues>();
  return initialContext?.value || initialContextDefaults;
};
