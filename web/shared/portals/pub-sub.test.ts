import { describe, expect, it, vi } from "vitest";
import { publish } from "@ionic/portals";
import { publishNavigateBackMessage } from "./pub-sub";

vi.mock("@ionic/portals");

/**
 * The web app can only test whether the message was published,
 * it cannot test that the native app will respond properly.
 *
 */
describe("publishNavigateBackMessage", () => {
  it("should publish a message to navigate back", async () => {
    await publishNavigateBackMessage();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish).toHaveBeenCalledWith({ topic: "navigate:back" });
  });
});
