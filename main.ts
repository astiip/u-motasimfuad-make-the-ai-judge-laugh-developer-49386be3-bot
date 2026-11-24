// Make the AI Judge Laugh: Developer Excuses — make.fun entry.
// Writes one developer excuse for broken production code to /output/entry.txt.
// The joke: the hotfix is already live because it was edited directly on the
// server — so the repo still has the bug, and the next deploy will bring it
// back. A confession disguised as good news, with the real cause (repo drift
// after a server-side hotfix) revealed in the second half. One file, one
// deterministic output, no network.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY_PATH = "/output/entry.txt";

const ENTRY =
  "The hotfix is already live — I edited the file on the server directly, so the repo still has the bug and so will the next deploy.";

mkdirSync("/output", { recursive: true });
writeFileSync(ENTRY_PATH, ENTRY, "utf8");

// Read-back verification: confirm what landed on disk is exactly ENTRY
// (1-200 chars, single line, no newline), so a truncated or altered write
// fails loudly instead of shipping a broken entry.
const written = readFileSync(ENTRY_PATH, "utf8");
if (
  written !== ENTRY ||
  written.length < 1 ||
  written.length > 200 ||
  written.includes("\n")
) {
  throw new Error("entry.txt verification failed: content does not match ENTRY");
}
