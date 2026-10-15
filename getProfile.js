import { db, EndpointError } from 'sdk';
import { sql } from 'sdk/db';

const RANKS = [
  [0, 'Academy Student'], [500, 'Genin'], [1500, 'Chūnin'],
  [3500, 'Jōnin'], [6500, 'Anbu'], [10000, 'Kage'],
];
const SHINOBI_EMOJI = {
  Sasuke: '⚔️', Sakura: '🌸', Naruto: '🍥', Itachi: '👁️',
  Hinata: '👁️', Jiraiya: '🐸', 'Starter Shinobi': '🥷',
};
function rankFor(xp) {
  let current = RANKS[0];
  for (const rank of RANKS) if (xp >= rank[0]) current = rank;
  return current[1];
}
function nextRankText(xp) {
  for (const [need, name] of RANKS) {
    if (xp < need) return `${xp.toLocaleString('en-US')} / ${need.toLocaleString('en-US')} XP → ${name}`;
  }
  return `${xp.toLocaleString('en-US')} XP (Kage)`;
}

export default async function (_input, ctx) {
  // Telegram Serverless validates Mini App initData before this endpoint runs.
  const user = ctx?.initData?.user;
  if (!user?.id) throw new EndpointError('Open this Mini App from Telegram to load your profile.');
  const id = user.id;
  const row = await db.get(sql`SELECT balance, xp, kills, claim_streak, last_claim_date, naruto_patrols FROM users WHERE telegram_id = ${id}`);
  const xp = row?.xp ?? 0;
  const chakraRow = await db.get(sql`SELECT qty FROM inventory WHERE telegram_id = ${id} AND item_name = 'Chakra'`);
  const shinobi = await db.all(sql`SELECT item_name, qty FROM inventory WHERE telegram_id = ${id} AND item_type = 'shinobi' ORDER BY item_name`);
  const jutsu = await db.all(sql`SELECT item_name FROM inventory WHERE telegram_id = ${id} AND item_type = 'jutsu' ORDER BY item_name`);
  return {
    displayName: [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Shinobi',
    username: user.username || '', rank: rankFor(xp), xp,
    xpText: nextRankText(xp), balance: row?.balance ?? 0,
    chakra: chakraRow?.qty ?? 0, kills: row?.kills ?? 0,
    streak: row?.claim_streak ?? 0, lastClaim: row?.last_claim_date || '—',
    narutoPatrols: row?.naruto_patrols ?? 0,
    roster: shinobi.map(item => ({ name: item.item_name, emoji: SHINOBI_EMOJI[item.item_name] || '🥷', qty: item.qty })),
    jutsu: jutsu.map(item => item.item_name),
  };
}
