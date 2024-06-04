import { beforeEach, describe, expect, it, vi } from "vitest";
import { getInitialContext } from "@ionic/portals";
import {
  resolveInitialContext,
  initialContextDefaults,
} from "./initial-context";

vi.mock("@ionic/portals");

const mockInitialContext = {
  name: "mock-portal",
  value: { accessToken: "1c3ede909", refreshToken: "78dfb12" },
};

describe("resolveInitialContext", () => {
  beforeEach(() => {
    vi.mocked(getInitialContext).mockReturnValue({ name: "mock-portal" });
  });

  /**
   * Initial context is available when running within a Portal.
   * In this runtime scenario, you can mock scenarios where:
   *  - The native app supplies initial context.
   *  - The native app doesn't supply initial context.
   */

  describe("running within a Portal", () => {
    describe("when the native app supplies initial context", () => {
      beforeEach(() => {
        vi.mocked(getInitialContext).mockReturnValue(mockInitialContext);
      });

      it("should return the initial context values from the native app", () => {
        expect(resolveInitialContext()).toEqual(mockInitialContext.value);
      });
    });

    describe("when the native app doesn't supply initial context", () => {
      it("should have `undefined` returned from `getInitialContext`", () => {
        const context = getInitialContext();
        expect(context?.value).toBe(undefined);
      });

      it("should return default initial context values", () => {
        expect(resolveInitialContext()).toEqual(initialContextDefaults);
      });
    });
  });

  /**
   * Initial context is not available when running in a web browser.
   * In this runtime scenario, the function should return default values.
   */
  describe("running within a web browser", () => {
    it("should return default initial context values", () => {
      expect(resolveInitialContext()).toEqual(initialContextDefaults);
    });
  });
});
