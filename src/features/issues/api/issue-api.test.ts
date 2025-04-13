import {
  fetchIssues,
  fetchIssue,
  createIssue,
  updateIssue,
  updateIssueStatus,
  searchIssues
} from "@/features/issues/api/issue-api.ts";
import { apiClient } from "@/shared/api/base-api";
import { mapApiIssueToIssue } from "@/features/issues/model/lib/mappers";
import { IssueFormValues } from "../types";

jest.mock("@/shared/api/base-api", () => ({
  apiClient: jest.fn(),
}));

jest.mock("@/features/issues/model/lib/mappers", () => ({
  mapApiIssueToIssue: jest.fn((x) => x),
}));

describe("issue-api", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchIssues()", () => {
    it("should fetch and transform issues", async () => {
      const issuesMock = [{ id: 1 }, { id: 2 }];
      (apiClient as jest.Mock).mockResolvedValue({ data: issuesMock });

      const issues = await fetchIssues();

      expect(apiClient).toHaveBeenCalledWith("/tasks");
      expect(mapApiIssueToIssue).toHaveBeenCalledTimes(issuesMock.length);
      expect(issues).toHaveLength(2);
    });
  });

  describe("fetchIssue()", () => {
    it("should fetch one issue by id and transform it", async () => {
      const apiIssueMock = { id: 1, title: "Test issue" };
      (apiClient as jest.Mock).mockResolvedValue({ data: apiIssueMock });

      const issue = await fetchIssue(1, 10);

      expect(apiClient).toHaveBeenCalledWith("/tasks/1");
      expect(mapApiIssueToIssue).toHaveBeenCalledWith({
        ...apiIssueMock,
        boardId: 10,
      });
      expect(issue).toEqual({
        ...apiIssueMock,
        boardId: 10,
      });
    });
  });

  describe("createIssue()", () => {
    it("should call apiClient with correct params for creating new issue", async () => {
      const newIssueData: IssueFormValues = {
        title: "New issue",
        description: "Description",
        status: "Backlog",
        boardId: 3,
        priority: "Low",
        assigneeId: 3
      };

      (apiClient as jest.Mock).mockResolvedValue({ data: { id: 555 } });

      const issueId = await createIssue(newIssueData);

      expect(apiClient).toHaveBeenCalledWith("/tasks/create", {
        method: "POST",
        body: JSON.stringify(newIssueData),
      });

      expect(issueId).toEqual(555);
    });
  });

  describe("updateIssue()", () => {
    it("should update an existing issue with new values", async () => {
      const issueUpdateData: IssueFormValues = {
        title: "Updated issue",
        description: "Updated description",
        status: "Backlog",
        boardId: 3,
        priority: "Low",
        assigneeId: 3
      };

      await updateIssue(30, issueUpdateData);

      expect(apiClient).toHaveBeenCalledWith("/tasks/update/30", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueUpdateData),
      });
    });
  });

  describe("updateIssueStatus()", () => {
    it("should update only the status of issue", async () => {
      await updateIssueStatus(2, "in-progress");

      expect(apiClient).toHaveBeenCalledWith("/tasks/updateStatus/2", {
        method: "PUT",
        body: JSON.stringify({ newStatus: "in-progress" }),
      });
    });
  });

  describe("searchIssues()", () => {
    it("should search issues correctly", async () => {
      const issuesMock = [{ id: 5, title: "search me" }];
      (apiClient as jest.Mock).mockResolvedValue({ data: issuesMock });

      const result = await searchIssues("search me");

      expect(apiClient).toHaveBeenCalledWith("/tasks/search?q=search%20me");

      expect(mapApiIssueToIssue).toHaveBeenCalledWith(
        issuesMock[0],
        expect.any(Number),
        expect.any(Array),
      );

      expect(result).toEqual(issuesMock);
    });

    it("should return empty array on apiClient error", async () => {
      (apiClient as jest.Mock).mockRejectedValue(
        new Error("Something went wrong"),
      );

      const result = await searchIssues("error");

      expect(apiClient).toHaveBeenCalledWith("/tasks/search?q=error");
      expect(result).toHaveLength(0);
    });
  });
});
