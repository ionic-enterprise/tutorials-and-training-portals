import { beforeEach, describe, expect, it, vi } from "vitest";
import { httpClient } from "@jobsync/api";
import { AnalyticsWeb } from "./analytics-plugin";

vi.mock("@jobsync/api");

/**
 * You can only unit-test the web implementation of the plugin.
 *
 * If you want to assert that the plugin has been called, mock the plugin
 * in the unit tests that call the plugin.
 *
 * See `web/apps/expenses/src/router.test.ts` for an example.
 * See https://capacitorjs.com/docs/guides/mocking-plugins for additional information.
 */

const plugin = new AnalyticsWeb();

describe("Analytics Plugin", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.mocked(httpClient.post).mockResolvedValue(undefined);
  });

  describe("running within a web browser", () => {
    describe("logAction", () => {
      it("should POST to the analytics endpoint", async () => {
        await plugin.logAction({ action: "Update Expense" });
        expect(httpClient.post).toHaveBeenCalledTimes(1);
        expect(httpClient.post).toHaveBeenCalledWith(
          "/analytics",
          expect.any(Object)
        );
      });

      it("should send the action and any parameters", async () => {
        await plugin.logAction({
          action: "Update Expense",
          params: { id: 123 },
        });
        expect(httpClient.post).toHaveBeenCalledWith("/analytics", {
          action: "Update Expense",
          params: { id: 123 },
          platform: "web",
        });
      });

      it("should send the platform as 'web'", async () => {
        await plugin.logAction({ action: "Update Expense" });
        expect(httpClient.post).toHaveBeenCalledWith("/analytics", {
          action: "Update Expense",
          platform: "web",
        });
      });
    });

    describe("logScreen", () => {
      it("should POST to the analytics endpoint", async () => {
        await plugin.logScreen({ screen: "Expenses" });
        expect(httpClient.post).toHaveBeenCalledTimes(1);
        expect(httpClient.post).toHaveBeenCalledWith(
          "/analytics",
          expect.any(Object)
        );
      });

      it("should send the screen and any parameters", async () => {
        await plugin.logScreen({ screen: "Expenses", params: { id: 123 } });
        expect(httpClient.post).toHaveBeenCalledWith("/analytics", {
          screen: "Expenses",
          params: { id: 123 },
          platform: "web",
        });
      });

      it('should send the platform as "web"', async () => {
        await plugin.logScreen({ screen: "Expenses" });
        expect(httpClient.post).toHaveBeenCalledWith("/analytics", {
          screen: "Expenses",
          platform: "web",
        });
      });
    });
  });
});
