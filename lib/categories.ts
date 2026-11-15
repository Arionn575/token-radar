// Radar-3: the category factor. One more input to implied value, and the last one the
// snapshot hands us for free: the protocol's own category.
//
// The idea is simple and checkable: a token is worth more where the token itself is the
// product's coordination and value-capture mechanism, and less where the token would be a
// bolt-on to infrastructure whose value lives elsewhere. A decentralised exchange earns a
// fee on every trade, so a token that takes a cut of that flow is the product; a bridge
// moves other people's assets, so its token rarely captures the value it moves. The band
// is deliberately narrow — 0.90 to 1.25 — so no category can carry a protocol to the top
// or sink it on its own: TVL, growth, age and reach still do the ranking.
//
// The families below are matched by substring on the lowercased category, first match
// wins, so a category the snapshot has never shown still lands in a family instead of
// falling through. A key only matches at the start of a word, so 'dex' does not match
// 'indexes'. No protocol name appears anywhere here; the same function scores every
// row, and the dashboard prints the multiplier and its reason for each protocol.

/** One family of categories: the substrings that select it, its multiplier, its reason. */
export interface CategoryFamily {
  keys: string[];
  multiplier: number;
  note: string;
}

/** The families, most specific first: the first key that matches decides. */
export const CATEGORY_FAMILIES: CategoryFamily[] = [
  {
    keys: ['dex', 'leveraged farm', 'liquidity manager', 'prediction'],
    multiplier: 1.25,
    note: 'A fee venue: the token takes a cut of every trade or position, so it is the product.',
  },
  {
    keys: ['lending', 'collateral', 'cdp', 'yield aggregator', 'yield', 'farm'],
    multiplier: 1.2,
    note: 'A credit or yield venue: interest and yield are recurring revenue the token can claim.',
  },
  {
    keys: ['risk curator', 'capital allocator', 'rwa', 'basis', 'cedefi', 'anchor btc', 'decentralized btc', 'token locker'],
    multiplier: 1.15,
    note: 'Capital coordination: the token aligns curators and depositors, but the assets are external.',
  },
  {
    keys: ['derivative', 'options', 'synthetic', 'indexes', 'dual-token', 'algo-stable', 'stablecoin wrapper'],
    multiplier: 1.1,
    note: 'A structured product: the token governs and margins it, but value tracks the underlying.',
  },
  {
    keys: ['bridge', 'chain', 'oracle'],
    multiplier: 0.9,
    note: 'Infrastructure: it moves or reports other assets, so its token rarely captures the value.',
  },
];

/** The multiplier for an unclassified category: neutral, so the other factors decide. */
export const CATEGORY_DEFAULT = 1;

/** The band every multiplier lives in. */
export const CATEGORY_BAND = { min: 0.9, max: 1.25 };

/** Whether `ch` is a lowercase letter: a word boundary for key matching. */
function isLetter(ch: string | undefined): boolean {
  return ch !== undefined && ch >= 'a' && ch <= 'z';
}

/**
 * Whether `key` appears in the lowercased category at the start of a word. The character
 * after the key may be anything — 'leveraged farm' still matches 'leveraged farming' —
 * but the character before it must not be a letter, so 'dex' never matches 'indexes'.
 */
function keyMatches(c: string, key: string): boolean {
  let at = c.indexOf(key);
  while (at >= 0) {
    if (at === 0 || !isLetter(c[at - 1])) return true;
    at = c.indexOf(key, at + 1);
  }
  return false;
}

/** The family a category falls in, or null when no key matches. */
export function categoryFamily(category: string | null): CategoryFamily | null {
  if (category === null) return null;
  const c = category.toLowerCase();
  for (const family of CATEGORY_FAMILIES) {
    for (const key of family.keys) {
      if (keyMatches(c, key)) return family;
    }
  }
  return null;
}

/** The category multiplier for one protocol: its family's, or the neutral default. */
export function categoryMultiplier(category: string | null): number {
  const family = categoryFamily(category);
  return family === null ? CATEGORY_DEFAULT : family.multiplier;
}

/** One sentence saying why this category scores the multiplier it does. */
export function categoryNote(category: string | null): string {
  const family = categoryFamily(category);
  if (family !== null) return family.note;
  return 'No category story: the other factors decide this protocol.';
}
