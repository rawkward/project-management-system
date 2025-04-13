import { renderHook, act } from "@testing-library/react";
import { useDraftIssue, DRAFT_KEY } from "./useDraftIssue";

describe("useDraftIssue", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should save draft to localStorage", async () => {
    const { result } = renderHook(() => useDraftIssue());

    act(() => {
      result.current.setValue("title", "Test title");
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const draft = localStorage.getItem(DRAFT_KEY);
    expect(draft).toContain("Test title");
  });
});
