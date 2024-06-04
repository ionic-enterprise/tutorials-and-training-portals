import { Mock, vi } from "vitest";
import { editExpenseLoader, expensesLoader, newExpenseLoader } from "./router";
import { Analytics, resolveInitialContext } from "@jobsync/portals";
import { getExpenses } from "./api";

vi.mock("react-router-dom");
vi.mock("@jobsync/portals");
vi.mock("./api");

const mockTokens = { accessToken: "abc", refreshToken: "def" };

/**
 * The router uses Portals to communicate with the native app:
 *
 * - `Analytics.logScreen` calls a Capacitor plugin to log the screen being loaded.
 * - `resolveInitialContext` retrieves the initial context from the native app.
 *
 * We need to mock these communication mechanisms to unit-test the router.
 */

describe("Router", () => {
  beforeEach(() => {
    vi.mocked(resolveInitialContext).mockReturnValue(mockTokens);
    (getExpenses as Mock) = vi.fn().mockResolvedValue([]);
    Analytics.logScreen = vi.fn();
  });

  describe("Expenses List Loader", () => {
    it("should refresh the session if needed", async () => {
      await expensesLoader();
      expect(resolveInitialContext).toHaveBeenCalledTimes(1);
    });

    it("should log the screen to analytics", async () => {
      await expensesLoader();
      expect(Analytics.logScreen).toHaveBeenCalledTimes(1);
      expect(Analytics.logScreen).toHaveBeenCalledWith({
        screen: "Expenses List",
      });
    });

    it("should return the expenses for the current user", async () => {
      await expensesLoader();
      expect(getExpenses).toHaveBeenCalledTimes(1);
    });
  });

  describe("New Expense Loader", () => {
    it("should refresh the session if needed", async () => {
      await newExpenseLoader();
      expect(resolveInitialContext).toHaveBeenCalledTimes(1);
    });

    it("should log the screen to analytics", async () => {
      await newExpenseLoader();
      expect(Analytics.logScreen).toHaveBeenCalledTimes(1);
      expect(Analytics.logScreen).toHaveBeenCalledWith({
        screen: "New Expense",
      });
    });
  });
});
