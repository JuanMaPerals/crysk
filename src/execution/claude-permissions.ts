// The permission flags every Claude spawn carries. `dontAsk` denies anything
// that is not pre-approved, `--permission-prompts none` makes sure nothing
// can answer a prompt on the step's behalf, and the allow-list is exactly the
// step's own tool list. The step can therefore use the tools it was given and
// nothing else, WITHOUT `bypassPermissions`: managed policy (including an
// operator's `disableBypassPermissionsMode`) stays in force, and a tool that
// is not on the list is denied instead of running unchecked.
export function claudePermissionArgs(tools: readonly string[]): string[] {
  const args = ["--permission-mode", "dontAsk", "--permission-prompts", "none"];
  if (tools.length > 0) {
    args.push("--allowedTools", tools.join(","));
  }
  return args;
}
