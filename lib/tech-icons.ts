import {
  siBnbchain, siCapacitor, siClaude, siCursor, siDocker, siEthereum, siExpress, siGithubactions, siGo,
  siGooglegemini, siJavascript, siJest, siJsonwebtokens, siMdx, siMocha, siMongodb, siMysql, siNestjs,
  siNextdotjs, siNodedotjs, siPostgresql, siPostman, siPython, siReact, siReactquery, siRedux, siResend,
  siRevenuecat, siRailway, siSocketdotio, siSolana, siSolidity, siStripe, siSupabase, siTailwindcss,
  siTypescript, siVercel, siVite,
} from "simple-icons";

/** Brand logos from Simple Icons (CC0). Matched against the start of a pill's label, case-insensitive. */
type Icon = { path: string; hex: string; title: string };
const table: [RegExp, Icon][] = [
  [/^nestjs/i, siNestjs], [/^node/i, siNodedotjs], [/^typescript/i, siTypescript], [/^javascript/i, siJavascript],
  [/^solidity|^smart contract/i, siSolidity], [/^go\b/i, siGo], [/^express/i, siExpress],
  [/^socket\.?io|^websocket/i, siSocketdotio], [/^react(?! ?query)/i, siReact], [/^next\.?js/i, siNextdotjs],
  [/^redux/i, siRedux], [/^capacitor/i, siCapacitor], [/^tailwind/i, siTailwindcss], [/^postgres/i, siPostgresql],
  [/^mongo/i, siMongodb], [/^mysql/i, siMysql], [/^supabase/i, siSupabase], [/^ethereum|^erc-721/i, siEthereum],
  [/^docker/i, siDocker], [/^github actions/i, siGithubactions], [/^vercel/i, siVercel], [/^railway/i, siRailway],
  [/^stripe/i, siStripe], [/^revenuecat/i, siRevenuecat], [/^jest/i, siJest], [/^mocha/i, siMocha],
  [/^postman/i, siPostman], [/^claude/i, siClaude], [/^cursor/i, siCursor], [/^vite/i, siVite],
  [/^tanstack|^react ?query/i, siReactquery], [/^resend/i, siResend], [/^gemini|^ai apis/i, siGooglegemini],
  [/^python/i, siPython], [/^solana/i, siSolana], [/^bsc|^bnb/i, siBnbchain], [/^mdx/i, siMdx], [/^jwt/i, siJsonwebtokens],
];

export function techIcon(label: string): Icon | null {
  return table.find(([re]) => re.test(label.trim()))?.[1] ?? null;
}

/** Near-black brand colours vanish on a dark page; those stay in the text colour. */
export function brandColor(hex: string) {
  const n = parseInt(hex, 16);
  const lum = 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return lum < 60 ? "currentColor" : `#${hex}`;
}
