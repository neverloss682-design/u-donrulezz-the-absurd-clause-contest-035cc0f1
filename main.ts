import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Absurd Clause Contest — one original English sentence, max 200 chars,
// phrased as a clause buried in a terms-of-service agreement: deadpan legal
// boilerplate that quietly turns absurd.
//
// Design: the opening ("Any dispute arising under this agreement shall be
// settled by...") reads as pure arbitration boilerplate, then reverses into
// a single game of rock-paper-scissors — a concrete, specific absurd image
// ("best of one, witnessed by a notary public") that cannot be guessed from
// the first clause. No abstract closing, no wasted words.
const ENTRY =
  "Any dispute arising under this agreement shall be settled by a single game of rock-paper-scissors, best of one, witnessed by a notary public.";

// Gate: 1..200 characters, one sentence, one line, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} out of range 1..200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
const periods = (ENTRY.match(/\./g) || []).length;
if (periods !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
