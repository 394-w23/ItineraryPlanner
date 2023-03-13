import { act } from "react-dom/test-utils";
import { describe, expect, test, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import TimeLeftGoPage from "../src/components/TimeLeftGoPage/TimeLeftGoPage";

const getSeconds = (duration) => {
  const tmp = duration.split(":");
  return +tmp[0] * 60 * 60 + +tmp[1] * 60 + +tmp[2];
};

describe("src/components/TimeLeftGopage", () => {
  let container;

  const getTimerDuration = async () => {
    const collection = await screen.findAllByTestId("time-duration");
    expect(collection).toHaveLength(1);
    return collection[0].textContent;
  };

  beforeEach(() => {
    vi.useFakeTimers();
    render(<TimeLeftGoPage />, container);
  });

  it("displays time in HH:MM:SS format", async () => {
    const collection = await screen.findAllByTestId("time-duration");
    expect(collection).toHaveLength(1);
    expect(collection[0].textContent).toMatch(/^\d{1,2}:\d{1,2}:\d{1,2}$/);
  });

  test("timer counts down", async () => {
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    const firstValue = getSeconds(await getTimerDuration());

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    const secondValue = getSeconds(await getTimerDuration());

    expect(secondValue).toBeLessThan(firstValue);
  });

  test("timer does not go negative", async () => {
    act(() => {
      vi.advanceTimersByTime((5 * 3600 + 30 * 60) * 1000 + 1000);
    });
    expect(await getTimerDuration()).toBe("00:00:00");
    expect(getSeconds(await getTimerDuration())).toBe(0);
  });
});
