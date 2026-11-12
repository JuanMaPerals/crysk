import { describe, expect, test } from "bun:test";
import { claudePermissionArgs } from "../../src/execution/claude-permissions";

describe("claudePermissionArgs", () => {
  test("approves exactly the step's tools and never bypasses", () => {
    const args = claudePermissionArgs(["Read", "Grep"]);
    expect(args).toEqual([
      "--permission-mode",
      "dontAsk",
      "--permission-prompts",
      "none",
      "--allowedTools",
      "Read,Grep",
    ]);
    expect(args).not.toContain("bypassPermissions");
  });

  test("a step with no tools approves nothing at all", () => {
    const args = claudePermissionArgs([]);
    expect(args).toEqual([
      "--permission-mode",
      "dontAsk",
      "--permission-prompts",
      "none",
    ]);
    expect(args).not.toContain("--allowedTools");
  });
});
