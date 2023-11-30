/**
 *  COMPLETE: See "Stubbing Initial Context for Development"
 */
import { resolveInitialContext } from "./initial-context";
export { resolveInitialContext };

import { publishNavigateBackMessage } from "./pub-sub";
export { publishNavigateBackMessage };

/**
 * TODO: See "Implementing a Capacitor Plugin"
 */
export const Analytics = {
  logAction: async (opts: any) => {},
  logScreen: async (opts: any) => {},
};
