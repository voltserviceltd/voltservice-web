import {
  chmodSync,
  existsSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const hookNames = ["pre-commit", "pre-push"];

function findRepoRoot(startDir) {
  let currentDir = path.resolve(startDir);

  while (true) {
    if (existsSync(path.join(currentDir, ".git"))) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
      return null;
    }

    currentDir = parentDir;
  }
}

function resolveGitDir(repoRoot) {
  const gitPath = path.join(repoRoot, ".git");
  const gitStat = statSync(gitPath);

  if (gitStat.isDirectory()) {
    return gitPath;
  }

  const gitFile = readFileSync(gitPath, "utf8").trim();
  const match = gitFile.match(/^gitdir:\s*(.+)$/i);

  if (!match) {
    throw new Error(`Unsupported .git file format at ${gitPath}`);
  }

  return path.resolve(repoRoot, match[1]);
}

function setCoreHooksPath(configPath) {
  const existingConfig = existsSync(configPath)
    ? readFileSync(configPath, "utf8")
    : "";
  const lines = existingConfig.length > 0 ? existingConfig.split(/\r?\n/) : [];
  const output = [];
  let inCore = false;
  let sawCore = false;
  let wroteHooksPath = false;

  for (const line of lines) {
    const sectionMatch = line.match(/^\s*\[([^\]]+)\]\s*$/);

    if (sectionMatch) {
      if (inCore && !wroteHooksPath) {
        output.push("\thooksPath = .githooks");
        wroteHooksPath = true;
      }

      inCore = sectionMatch[1].trim().toLowerCase() === "core";
      sawCore = sawCore || inCore;
      output.push(line);
      continue;
    }

    if (inCore && /^\s*hooksPath\s*=/i.test(line)) {
      output.push("\thooksPath = .githooks");
      wroteHooksPath = true;
      continue;
    }

    output.push(line);
  }

  if (inCore && !wroteHooksPath) {
    output.push("\thooksPath = .githooks");
    wroteHooksPath = true;
  }

  if (!sawCore) {
    if (output.length > 0 && output[output.length - 1] !== "") {
      output.push("");
    }

    output.push("[core]", "\thooksPath = .githooks");
  }

  while (output.length > 1 && output[output.length - 1] === "") {
    output.pop();
  }

  writeFileSync(configPath, `${output.join("\n")}\n`);
}

const repoRoot = findRepoRoot(process.cwd());

if (!repoRoot) {
  console.error("Could not find a Git worktree. Run this from inside the repo.");
  process.exit(1);
}

const hooksDir = path.join(repoRoot, ".githooks");
const missingHooks = hookNames.filter((name) => {
  return !existsSync(path.join(hooksDir, name));
});

if (missingHooks.length > 0) {
  console.error(`Missing Git hook file(s): ${missingHooks.join(", ")}`);
  process.exit(1);
}

const gitDir = resolveGitDir(repoRoot);
setCoreHooksPath(path.join(gitDir, "config"));

if (process.platform !== "win32") {
  for (const hookName of hookNames) {
    chmodSync(path.join(hooksDir, hookName), 0o755);
  }
}

console.log("Git hooks installed: core.hooksPath=.githooks");
