import { fetchBoards } from "./board-api";
import { apiClient } from "@/shared/api/base-api";
import { vi, Mock } from "vitest";

vi.mock("@/shared/api/base-api");

describe("boardApi", () => {
  beforeEach(() => {
    (apiClient as jest.Mock).mockClear();
  });

  it("should fetch boards", async () => {
    (apiClient as Mock).mockResolvedValue({
      data: [{ id: 1, name: "Test Board" }],
    });

    const result = await fetchBoards();
    expect(apiClient).toHaveBeenCalledWith("/boards");
    expect(result).toHaveLength(1);
  });
});
