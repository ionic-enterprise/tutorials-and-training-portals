import { WebPlugin, registerPlugin } from "@capacitor/core";
import { httpClient } from "@jobsync/api";

interface AnalyticsPlugin {
  logAction(opts: { action: string; params?: any }): Promise<void>;
  logScreen(opts: { screen: string; params?: any }): Promise<void>;
}

class AnalyticsWeb extends WebPlugin implements AnalyticsPlugin {
  async logAction(opts: { action: string; params?: any }): Promise<void> {
    const { action, params } = opts;
    await httpClient.post("/analytics", { action, params, platform: "web" });
  }

  async logScreen(opts: { screen: string; params?: any }): Promise<void> {
    const { screen, params } = opts;
    await httpClient.post("/analytics", { screen, params, platform: "web" });
  }
}

export const Analytics = registerPlugin<AnalyticsPlugin>("Analytics", {
  web: new AnalyticsWeb(),
});
