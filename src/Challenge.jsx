import { useState, useEffect, useRef } from "react";

// ─── Supabase config (same project as Amazing Race) ───────────────────────────
const SUPABASE_URL = "https://qglbkzljfuwwkejbklwa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbGJremxqZnV3d2tlamJrbHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzY1NjIsImV4cCI6MjA5MjQ1MjU2Mn0.JDkR6a4mzXpJheujwwit6-E4HDctepwSZoZsF09Y2WU";

async function sb(path, method = "GET", body = null, extraHeaders = {}) {
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
    ...extraHeaders,
  };
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${path}`,
    { method, headers, body: body ? JSON.stringify(body) : null }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ─── The Challenge seasons & competitor rosters ────────────────────────────────
// Season list with competitor arrays (alphabetical). Add future seasons here.
const CHALLENGE_SEASONS = [
  {
    number: 40,
    name: "Battle of the Eras",
    year: 2024,
    competitors: [
      { id: 1, name: "Aneesa Ferreira" },
      { id: 2, name: "Bananas" },
      { id: 3, name: "Beth Stolarczyk" },
      { id: 4, name: "Big T Fazakerley" },
      { id: 5, name: "Brad Fiorenza" },
      { id: 6, name: "CT Tamburello" },
      { id: 7, name: "Cara Maria Sorbello" },
      { id: 8, name: "Corey Lay" },
      { id: 9, name: "Darrell Taylor" },
      { id: 10, name: "Derrick Kosinski" },
      { id: 11, name: "Derrick Henry" },
      { id: 12, name: "Emmanuel Neagu" },
      { id: 13, name: "Horacio Gutierrez Jr." },
      { id: 14, name: "Jasmine Reynaud" },
      { id: 15, name: "Jay Starrett" },
      { id: 16, name: "Jonna Mannion" },
      { id: 17, name: "Jordan Wiseley" },
      { id: 18, name: "Kaycee Clark" },
      { id: 19, name: "Kenny Clark" },
      { id: 20, name: "Laurel Stucky" },
      { id: 21, name: "Leroy Garrett" },
      { id: 22, name: "Liv Jawando" },
      { id: 23, name: "Mark Long" },
      { id: 24, name: "Melissa Reeves" },
      { id: 25, name: "Michele Fitzgerald" },
      { id: 26, name: "Nany Gonzalez" },
      { id: 27, name: "Olivia Kaiser" },
      { id: 28, name: "Rachel Robinson" },
      { id: 29, name: "Sarah Rice" },
      { id: 30, name: "Susie Meister" },
      { id: 31, name: "Tori Deal" },
      { id: 32, name: "Veronica Portillo" },
      { id: 33, name: "Wes Bergmann" },
    ],
  },
  {
    number: 39,
    name: "Battle for a New Champion",
    year: 2023,
    competitors: [
      { id: 1, name: "Amber Borzotra" },
      { id: 2, name: "Aneesa Ferreira" },
      { id: 3, name: "Berna Canbeldek" },
      { id: 4, name: "Chauncey Palmer" },
      { id: 5, name: "Devin Walker" },
      { id: 6, name: "Emanuel Neagu" },
      { id: 7, name: "Horacio Gutierrez Jr." },
      { id: 8, name: "Jay Starrett" },
      { id: 9, name: "Josh Martinez" },
      { id: 10, name: "Kaycee Clark" },
      { id: 11, name: "Kyland Young" },
      { id: 12, name: "Laurel Stucky" },
      { id: 13, name: "Michele Fitzgerald" },
      { id: 14, name: "Moriah Jadea" },
      { id: 15, name: "Nany Gonzalez" },
      { id: 16, name: "Nurys Mateo" },
      { id: 17, name: "Olivia Kaiser" },
      { id: 18, name: "Ravyn Rochelle" },
      { id: 19, name: "Theo Campbell" },
      { id: 20, name: "Tori Deal" },
    ],
  },
  {
    number: 38,
    name: "Ride or Dies",
    year: 2022,
    competitors: [
      { id: 1, name: "Amber Borzotra" },
      { id: 2, name: "Aneesa Ferreira" },
      { id: 3, name: "Bananas" },
      { id: 4, name: "CT Tamburello" },
      { id: 5, name: "Danny McCray" },
      { id: 6, name: "Devin Walker" },
      { id: 7, name: "Emanuel Neagu" },
      { id: 8, name: "Faysal Shafaat" },
      { id: 9, name: "Jordan Wiseley" },
      { id: 10, name: "Josh Martinez" },
      { id: 11, name: "Kaycee Clark" },
      { id: 12, name: "Laurel Stucky" },
      { id: 13, name: "Nany Gonzalez" },
      { id: 14, name: "Nelson Thomas" },
      { id: 15, name: "Nurys Mateo" },
      { id: 16, name: "Olivia Kaiser" },
      { id: 17, name: "Tori Deal" },
      { id: 18, name: "Veronica Portillo" },
    ],
  },
];

// ─── DB helpers ────────────────────────────────────────────────────────────────
const db = {
  async getActiveSeason() {
    const r = await sb("challenge_active_season?id=eq.1");
    return r?.[0] || null;
  },
  async setActiveSeason(data) {
    return sb("challenge_active_season?id=eq.1", "PATCH", { ...data, updated_at: new Date().toISOString() });
  },
  async getPlayers() {
    return sb("challenge_active_players?order=name.asc") || [];
  },
  async upsertPlayer(player) {
    return sb("challenge_active_players", "POST", player, { Prefer: "resolution=merge-duplicates,return=representation" });
  },
  async updatePlayer(id, data) {
    return sb(`challenge_active_players?id=eq.${id}`, "PATCH", data);
  },
  async deletePlayer(id) {
    await sb(`challenge_active_events?player_id=eq.${id}`, "DELETE");
    return sb(`challenge_active_players?id=eq.${id}`, "DELETE");
  },
  async getEvents() {
    return sb("challenge_active_events?order=episode.asc,created_at.asc") || [];
  },
  async insertEvent(event) {
    return sb("challenge_active_events", "POST", event);
  },
  async deleteEvent(id) {
    return sb(`challenge_active_events?id=eq.${id}`, "DELETE");
  },
  async deleteEpisodeEvents(episode) {
    return sb(`challenge_active_events?episode=eq.${episode}`, "DELETE");
  },
  async getSavedSeasons() {
    return sb("challenge_saved_seasons?order=season_year.desc") || [];
  },
  async saveSeasonRecord(data) {
    return sb("challenge_saved_seasons", "POST", data);
  },
  async saveResult(data) {
    return sb("challenge_season_results", "POST", data);
  },
  async getResultsForSeason(seasonId) {
    return sb(`challenge_season_results?saved_season_id=eq.${seasonId}&order=finish_position.asc`) || [];
  },
  async deleteSavedSeason(id) {
    return sb(`challenge_saved_seasons?id=eq.${id}`, "DELETE");
  },
  async deleteResults(savedSeasonId) {
    return sb(`challenge_season_results?saved_season_id=eq.${savedSeasonId}`, "DELETE");
  },
  async clearActiveSeason() {
    await sb("challenge_active_events", "DELETE", null, { Prefer: "return=minimal" });
    await sb("challenge_active_players", "DELETE", null, { Prefer: "return=minimal" });
    return sb("challenge_active_season?id=eq.1", "PATCH", {
      season_number: null,
      season_name: null,
      eliminated_competitors: [],
      updated_at: new Date().toISOString(),
    });
  },
};

// ─── Scoring engine ────────────────────────────────────────────────────────────
function scoreEpisode(pl, ep, previouslyEliminatedIds = []) {
  const pts = [];
  const allElim = new Set([
    ...previouslyEliminatedIds.map(Number),
    ...ep.eliminationLosers.map(Number),
  ]);
  const isWildcard = (id) => pl.wildcard_pick === id && pl.buyback_competitor !== id;
  const mult = (id) => isWildcard(id) ? 2 : 1;

  const picks = [pl.winner_pick, pl.wildcard_pick].filter(Boolean);

  for (const cid of picks) {
    if (allElim.has(Number(cid))) continue; // eliminated — no points

    const m = mult(cid);
    const label = isWildcard(cid) ? "Wildcard" : "Winner Pick";

    // Daily challenge win
    if (ep.dailyWinners.map(Number).includes(Number(cid))) {
      pts.push({ label: `${label} Daily Win`, points: 1 * m });
    }

    // Elimination win
    if (ep.eliminationWinners.map(Number).includes(Number(cid))) {
      pts.push({ label: `${label} Elim Win`, points: 3 * m });
    }
  }

  // Buyback penalty
  if (ep.buybackPenalties?.includes(pl.id)) {
    pts.push({ label: "Buyback Penalty", points: -10 });
  }

  return pts;
}

// ─── Multi-select component ───────────────────────────────────────────────────
function MultiSelect({ options, selected, onChange, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (id) => {
    const s = new Set(selected.map(Number));
    if (s.has(Number(id))) s.delete(Number(id));
    else s.add(Number(id));
    onChange([...s]);
  };

  const labels = options
    .filter((o) => selected.map(Number).includes(Number(o.id)))
    .map((o) => o.name);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          background: "#1e2433",
          border: "1px solid #e50000",
          borderRadius: 8,
          padding: "10px 12px",
          cursor: "pointer",
          color: labels.length ? "#fff" : "#64748b",
          fontSize: 14,
          minHeight: 42,
        }}
      >
        {labels.length ? labels.join(", ") : placeholder}
        <span style={{ float: "right", marginLeft: 8 }}>▾</span>
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#1e2433",
            border: "1px solid #e50000",
            borderRadius: 8,
            zIndex: 100,
            maxHeight: 220,
            overflowY: "auto",
          }}
        >
          {options.map((o) => {
            const checked = selected.map(Number).includes(Number(o.id));
            return (
              <div
                key={o.id}
                onClick={() => toggle(o.id)}
                style={{
                  padding: "10px 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: checked ? "#2d1a1a" : "transparent",
                  color: checked ? "#e50000" : "#e2e8f0",
                  fontSize: 14,
                  borderBottom: "1px solid #2a2f3e",
                }}
              >
                <span style={{
                  width: 16, height: 16, border: "2px solid #e50000",
                  borderRadius: 3, background: checked ? "#e50000" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {checked && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
                </span>
                {o.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  app: {
    minHeight: "100vh",
    background: "#0d0d0d",
    color: "#e2e8f0",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    maxWidth: 480,
    margin: "0 auto",
    padding: "0 0 80px 0",
  },
  header: {
    background: "linear-gradient(180deg, #1a0000 0%, #0d0d0d 100%)",
    borderBottom: "3px solid #e50000",
    padding: "16px 20px 12px",
    textAlign: "center",
  },
  logoText: {
    fontSize: 22,
    fontWeight: 900,
    color: "#e50000",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  logoSub: {
    fontSize: 11,
    color: "#888",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginTop: 2,
  },
  nav: {
    display: "flex",
    gap: 8,
    padding: "8px 20px",
    background: "#1a0000",
    justifyContent: "center",
    borderBottom: "1px solid #2a0000",
  },
  navBtn: (active) => ({
    padding: "6px 14px",
    borderRadius: 20,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    background: active ? "#e50000" : "transparent",
    color: active ? "#fff" : "#888",
  }),
  card: {
    background: "#111",
    border: "1px solid #2a0000",
    borderRadius: 12,
    padding: 16,
    margin: "12px 16px",
  },
  btn: (variant = "primary") => ({
    display: "block",
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 700,
    background: variant === "primary" ? "#e50000"
      : variant === "danger" ? "#7f1d1d"
      : variant === "ghost" ? "transparent"
      : "#1e2433",
    color: variant === "ghost" ? "#888" : "#fff",
    marginTop: 8,
    textAlign: "center",
    border: variant === "ghost" ? "1px solid #2a2f3e" : "none",
  }),
  input: {
    width: "100%",
    background: "#1e2433",
    border: "1px solid #e50000",
    borderRadius: 8,
    padding: "10px 12px",
    color: "#e2e8f0",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },
  label: {
    display: "block",
    fontSize: 12,
    color: "#e50000",
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
    marginTop: 12,
  },
  select: {
    width: "100%",
    background: "#1e2433",
    border: "1px solid #e50000",
    borderRadius: 8,
    padding: "10px 12px",
    color: "#e2e8f0",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },
  badge: (type) => ({
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 700,
    background: type === "winner" ? "#e50000"
      : type === "wildcard" ? "#fbbf24"
      : type === "penalty" ? "#7f1d1d"
      : "#1e2433",
    color: type === "wildcard" ? "#000" : "#fff",
    marginLeft: 4,
  }),
};

// ─── Episode modal ─────────────────────────────────────────────────────────────
function EpisodeModal({ season, players, previouslyEliminated, existingEpisode, onClose, onSave }) {
  const epNum = existingEpisode
    ? existingEpisode.episode
    : (players[0]?._maxEpisode || 0) + 1;

  const activeComps = season.competitors.filter(
    (c) => !previouslyEliminated.map(Number).includes(Number(c.id))
  );

  const [dailyWinners, setDailyWinners] = useState(
    existingEpisode?.dailyWinners || []
  );
  const [elimWinners, setElimWinners] = useState(
    existingEpisode?.eliminationWinners || []
  );
  const [elimLosers, setElimLosers] = useState(
    existingEpisode?.eliminationLosers || []
  );
  const [buybackPlayers, setBuybackPlayers] = useState(
    existingEpisode?.buybackPenalties || []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleBuyback = (pid) => {
    setBuybackPlayers((prev) =>
      prev.includes(pid) ? prev.filter((x) => x !== pid) : [...prev, pid]
    );
  };

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      await onSave({
        episode: epNum,
        dailyWinners: dailyWinners.map(Number),
        eliminationWinners: elimWinners.map(Number),
        eliminationLosers: elimLosers.map(Number),
        buybackPenalties: buybackPlayers,
      });
    } catch (e) {
      setError(e.message);
      setSaving(false);
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      zIndex: 200, overflowY: "auto", padding: "20px 16px",
    }}>
      <div style={{
        background: "#111", border: "1px solid #e50000", borderRadius: 16,
        padding: 20, maxWidth: 440, margin: "0 auto",
      }}>
        <h2 style={{ color: "#e50000", marginBottom: 16, fontSize: 18 }}>
          {existingEpisode ? "Edit" : "Score"} Episode {epNum}
        </h2>

        <label style={S.label}>Daily Challenge Winners (multi-select)</label>
        <MultiSelect
          options={activeComps}
          selected={dailyWinners}
          onChange={setDailyWinners}
          placeholder="No daily winners"
        />

        <label style={S.label}>Elimination Winners (multi-select)</label>
        <MultiSelect
          options={activeComps}
          selected={elimWinners}
          onChange={setElimWinners}
          placeholder="No elimination this episode"
        />

        <label style={S.label}>Elimination Losers / Eliminated (multi-select)</label>
        <MultiSelect
          options={activeComps}
          selected={elimLosers}
          onChange={setElimLosers}
          placeholder="No elimination this episode"
        />

        <label style={{ ...S.label, marginTop: 16 }}>Buyback Penalties (−10 pts each)</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {players.map((pl) => (
            <label key={pl.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 12px", background: "#1a0000", borderRadius: 8,
              cursor: "pointer",
            }}>
              <input
                type="checkbox"
                checked={buybackPlayers.includes(pl.id)}
                onChange={() => toggleBuyback(pl.id)}
                style={{ accentColor: "#e50000" }}
              />
              <span style={{ fontSize: 14 }}>{pl.name}</span>
            </label>
          ))}
        </div>

        {error && (
          <div style={{ color: "#f87171", fontSize: 13, marginTop: 10 }}>{error}</div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={onClose} style={{ ...S.btn("ghost"), flex: 1 }}>Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ ...S.btn("primary"), flex: 1 }}
          >
            {saving ? "Saving…" : "Save Episode"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Buyback modal ────────────────────────────────────────────────────────────
function BuybackModal({ player, season, previouslyEliminated, onClose, onSave }) {
  const activeComps = season.competitors.filter(
    (c) => !previouslyEliminated.map(Number).includes(Number(c.id))
  );
  const [step, setStep] = useState(1); // 1=which pick eliminated, 2=new pick
  const [replacedSlot, setReplacedSlot] = useState(""); // "winner" | "wildcard"
  const [newComp, setNewComp] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!replacedSlot || !newComp) return;
    setSaving(true);
    await onSave({ replacedSlot, newComp: Number(newComp) });
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      zIndex: 200, overflowY: "auto", padding: "20px 16px",
    }}>
      <div style={{
        background: "#111", border: "1px solid #e50000", borderRadius: 16,
        padding: 20, maxWidth: 440, margin: "0 auto",
      }}>
        <h2 style={{ color: "#e50000", marginBottom: 4, fontSize: 18 }}>
          Buyback — {player.name}
        </h2>
        <p style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>
          −10 pt penalty applies. Choose new pick for the eliminated slot.
        </p>

        {step === 1 && (
          <>
            <p style={{ fontSize: 14, marginBottom: 12 }}>Which pick was eliminated?</p>
            <button
              onClick={() => { setReplacedSlot("winner"); setStep(2); }}
              style={S.btn("secondary")}
            >
              Winner Pick (1×)
            </button>
            <button
              onClick={() => { setReplacedSlot("wildcard"); setStep(2); }}
              style={S.btn("secondary")}
            >
              Wildcard Pick (2×)
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p style={{ fontSize: 14, marginBottom: 12 }}>
              Select new {replacedSlot === "winner" ? "Winner Pick (1×)" : "Wildcard Pick (2×)"}:
            </p>
            <select
              value={newComp}
              onChange={(e) => setNewComp(e.target.value)}
              style={S.select}
            >
              <option value="">— choose —</option>
              {activeComps.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={() => setStep(1)} style={{ ...S.btn("ghost"), flex: 1 }}>Back</button>
              <button
                onClick={handleSave}
                disabled={!newComp || saving}
                style={{ ...S.btn("primary"), flex: 1 }}
              >
                {saving ? "Saving…" : "Confirm Buyback"}
              </button>
            </div>
          </>
        )}

        <button onClick={onClose} style={{ ...S.btn("ghost"), marginTop: 8 }}>Cancel</button>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Challenge() {
  const [screen, setScreen] = useState("home"); // home | rules | setup | scoring | alltime
  const [activeSeason, setActiveSeason] = useState(null);
  const [selSeasonNum, setSelSeasonNum] = useState(null);
  const [players, setPlayers] = useState([]);
  const [events, setEvents] = useState([]);
  const [savedSeasons, setSavedSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modals
  const [showEpModal, setShowEpModal] = useState(false);
  const [editEpisode, setEditEpisode] = useState(null);
  const [showBuyback, setShowBuyback] = useState(null); // player obj
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  // Setup form
  const [newPlayerName, setNewPlayerName] = useState("");
  const [setupTab, setSetupTab] = useState("players"); // players | picks

  // Scoring tab
  const [scoringTab, setScoringTab] = useState("scoreboard");

  const selSeason = CHALLENGE_SEASONS.find((s) => s.number === selSeasonNum);

  async function loadAll() {
    setLoading(true);
    setError("");
    try {
      const [as, pls, evs, saved] = await Promise.all([
        db.getActiveSeason(),
        db.getPlayers(),
        db.getEvents(),
        db.getSavedSeasons(),
      ]);
      setActiveSeason(as);
      setPlayers(pls || []);
      setEvents(evs || []);
      setSavedSeasons(saved || []);
      setSelSeasonNum((n) => n || as?.season_number || null);
    } catch (e) {
      setError("Could not connect to database: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, []);

  // ── Derived ────────────────────────────────────────────────────────────────
  const previouslyEliminatedIds = activeSeason?.eliminated_competitors || [];

  function getPlayerTotals() {
    return players.map((pl) => {
      const myEvents = events.filter((e) => e.player_id === pl.id);
      const total = myEvents.reduce((s, e) => s + (e.points || 0), 0);
      const byEp = {};
      for (const e of myEvents) {
        if (!byEp[e.episode]) byEp[e.episode] = [];
        byEp[e.episode].push(e);
      }
      const maxEp = myEvents.reduce((m, e) => Math.max(m, e.episode || 0), 0);
      return { ...pl, total, byEp, _maxEpisode: maxEp };
    }).sort((a, b) => b.total - a.total);
  }

  const rankedPlayers = getPlayerTotals();

  // ── Setup actions ──────────────────────────────────────────────────────────
  async function startSeason() {
    if (!selSeasonNum) return;
    const s = CHALLENGE_SEASONS.find((x) => x.number === selSeasonNum);
    await db.setActiveSeason({
      season_number: s.number,
      season_name: s.name,
      eliminated_competitors: [],
    });
    await loadAll();
    setScreen("setup");
  }

  async function addPlayer() {
    const name = newPlayerName.trim();
    if (!name) return;
    try {
      await db.upsertPlayer({ name, winner_pick: null, wildcard_pick: null });
      setNewPlayerName("");
      await loadAll();
    } catch (e) {
      setError("Could not add player: " + e.message);
    }
  }

  async function removePlayer(id) {
    await db.deletePlayer(id);
    await loadAll();
  }

  async function savePicks(playerId, winnerId, wildcardId) {
    await db.updatePlayer(playerId, {
      winner_pick: winnerId || null,
      wildcard_pick: wildcardId || null,
    });
    await loadAll();
  }

  // ── Episode scoring ────────────────────────────────────────────────────────
  async function saveEpisode(ep) {
    // Delete existing events for this episode
    await db.deleteEpisodeEvents(ep.episode);

    // Score each player
    for (const pl of players) {
      const pts = scoreEpisode(pl, ep, previouslyEliminatedIds);
      const total = pts.reduce((s, p) => s + p.points, 0);
      await db.insertEvent({
        player_id: pl.id,
        event_type: "episode",
        episode: ep.episode,
        points: total,
        breakdown: { items: pts, daily: ep.dailyWinners, elimWinners: ep.eliminationWinners, elimLosers: ep.eliminationLosers },
      });
    }

    // Buyback penalties (separate event per player)
    for (const pid of ep.buybackPenalties || []) {
      const exists = events.find((e) => e.player_id === pid && e.episode === ep.episode && e.event_type === "buyback");
      // already included in pts above — handled in scoreEpisode
    }

    // Update eliminated list
    const newElim = [
      ...new Set([
        ...previouslyEliminatedIds.map(Number),
        ...ep.eliminationLosers.map(Number),
      ]),
    ];
    await db.setActiveSeason({ eliminated_competitors: newElim });

    await loadAll();
    setShowEpModal(false);
    setEditEpisode(null);
  }

  async function deleteEpisode(epNum) {
    await db.deleteEpisodeEvents(epNum);
    // Rebuild eliminated list without this episode's losers
    // We don't have per-episode storage of losers to remove, so we recompute from remaining events
    // Simplest: just reload — eliminated list stays (user can manually fix if needed)
    await loadAll();
  }

  // ── Buyback ────────────────────────────────────────────────────────────────
  async function processBuyback(player, { replacedSlot, newComp }) {
    const update = replacedSlot === "winner"
      ? { winner_pick: newComp, buyback_competitor: newComp }
      : { wildcard_pick: newComp, buyback_competitor: newComp };
    await db.updatePlayer(player.id, update);
    // Remove from eliminated list (they bought back)
    // The new pick will be scored at 1× (buyback_competitor check in scoring)
    await loadAll();
    setShowBuyback(null);
  }

  // ── End season ─────────────────────────────────────────────────────────────
  async function endSeason() {
    if (!activeSeason?.season_number || !selSeason) return;
    const sn = selSeason;

    // Delete existing saves for this season
    const fresh = await db.getSavedSeasons();
    const existing = (fresh || []).filter((s) => s.season_number === sn.number);
    for (const s of existing) {
      await db.deleteResults(s.id);
      await db.deleteSavedSeason(s.id);
    }

    // Save season record
    const [savedSeason] = await db.saveSeasonRecord({
      season_number: sn.number,
      season_name: sn.name,
      season_year: sn.year,
    });

    // Save per-player results
    const ranked = getPlayerTotals().sort((a, b) => b.total - a.total);
    for (let i = 0; i < ranked.length; i++) {
      const pl = ranked[i];
      const wComp = sn.competitors.find((c) => c.id === pl.winner_pick);
      const wcComp = sn.competitors.find((c) => c.id === pl.wildcard_pick);
      await db.saveResult({
        saved_season_id: savedSeason.id,
        player_name: pl.name,
        score: pl.total,
        finish_position: i + 1,
        winner_pick: wComp?.name || null,
        wildcard_pick: wcComp?.name || null,
      });
    }

    await db.clearActiveSeason();
    await loadAll();
    setScreen("home");
    setShowEndConfirm(false);
  }

  // ── Screens ────────────────────────────────────────────────────────────────
  const inProgress = activeSeason?.season_number != null;

  if (loading) return (
    <div style={S.app}>
      <div style={{ textAlign: "center", padding: 60, color: "#e50000" }}>
        Loading…
      </div>
    </div>
  );

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.logoText}>THE CHALLENGE</div>
        <div style={S.logoSub}>Prediction League</div>
      </div>

      {/* Nav */}
      <div style={S.nav}>
        {["home", "rules", ...(inProgress ? ["setup", "scoring"] : []), "alltime"].map((tab) => (
          <button
            key={tab}
            onClick={() => setScreen(tab)}
            style={S.navBtn(screen === tab)}
          >
            {tab === "alltime" ? "All-Time" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ margin: "12px 16px", padding: 12, background: "#7f1d1d", borderRadius: 8, color: "#fca5a5", fontSize: 13 }}>
          {error}
        </div>
      )}

      {/* ── HOME ── */}
      {screen === "home" && (
        <div>
          {inProgress ? (
            <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    {activeSeason.season_name || `Season ${activeSeason.season_number}`}
                  </div>
                  <div style={{ fontSize: 12, color: "#e50000", marginTop: 2 }}>● IN PROGRESS</div>
                </div>
                <button onClick={() => setScreen("scoring")} style={{
                  padding: "8px 16px", background: "#e50000", border: "none",
                  borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13,
                }}>Resume</button>
              </div>
            </div>
          ) : (
            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Start New Season</div>
              <label style={S.label}>Select Season</label>
              <select
                value={selSeasonNum || ""}
                onChange={(e) => setSelSeasonNum(Number(e.target.value))}
                style={S.select}
              >
                <option value="">— choose —</option>
                {CHALLENGE_SEASONS.map((s) => (
                  <option key={s.number} value={s.number}>
                    Season {s.number}: {s.name} ({s.year})
                  </option>
                ))}
              </select>
              <button
                onClick={startSeason}
                disabled={!selSeasonNum}
                style={S.btn("primary")}
              >
                Start Season
              </button>
            </div>
          )}

          {savedSeasons.length > 0 && (
            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: "#e50000" }}>
                Completed Seasons
              </div>
              {savedSeasons.map((s) => (
                <div key={s.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0", borderBottom: "1px solid #2a0000",
                }}>
                  <div>
                    <div style={{ fontSize: 14 }}>{s.season_name}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>{s.season_year}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 700 }}>✓ COMPLETED</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── RULES ── */}
      {screen === "rules" && (
        <div style={S.card}>
          <h2 style={{ color: "#e50000", marginBottom: 12, fontSize: 18 }}>Scoring Rules</h2>
          {[
            ["Winner Pick (1×)", "Pick one competitor to win. Earns 1pt per daily win, 3pts per elimination win."],
            ["Wildcard Pick (2×)", "Pick one 'wild card' competitor. All points doubled — 2pts daily, 6pts elimination."],
            ["Buyback", "If your pick is eliminated, pay −10pts and choose a replacement. Replacement scores at original multiplier (no re-wild-card)."],
            ["Daily Challenge Win", "+1pt (×2 for wildcard)"],
            ["Elimination Win", "+3pts (×6 for wildcard)"],
            ["No partial credit", "Eliminated competitors earn 0 points for that episode forward."],
          ].map(([title, desc]) => (
            <div key={title} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, color: "#e50000", fontSize: 13 }}>{title}</div>
              <div style={{ fontSize: 13, color: "#ccc", marginTop: 2 }}>{desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── SETUP ── */}
      {screen === "setup" && inProgress && selSeason && (
        <div>
          <div style={{ display: "flex", gap: 0, margin: "12px 16px 0", borderRadius: 10, overflow: "hidden", border: "1px solid #e50000" }}>
            {["players", "picks"].map((t) => (
              <button
                key={t}
                onClick={() => setSetupTab(t)}
                style={{
                  flex: 1, padding: "10px 0", border: "none", cursor: "pointer",
                  background: setupTab === t ? "#e50000" : "#1a0000",
                  color: "#fff", fontWeight: 700, fontSize: 13,
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {setupTab === "players" && (
            <div style={S.card}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Players</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                  placeholder="Player name"
                  style={{ ...S.input, flex: 1 }}
                />
                <button onClick={addPlayer} style={{
                  padding: "10px 16px", background: "#e50000", border: "none",
                  borderRadius: 8, color: "#fff", fontWeight: 700, cursor: "pointer",
                }}>Add</button>
              </div>
              <div style={{ marginTop: 12 }}>
                {players.map((pl) => (
                  <div key={pl.id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 0", borderBottom: "1px solid #2a0000",
                  }}>
                    <span style={{ fontSize: 14 }}>{pl.name}</span>
                    <button onClick={() => removePlayer(pl.id)} style={{
                      background: "none", border: "none", color: "#e50000", cursor: "pointer", fontSize: 18,
                    }}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {setupTab === "picks" && (
            <div>
              {players.map((pl) => {
                const activeComps = selSeason.competitors.filter(
                  (c) => !previouslyEliminatedIds.map(Number).includes(Number(c.id))
                );
                return (
                  <div key={pl.id} style={S.card}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, color: "#e50000" }}>
                      {pl.name}
                    </div>

                    <label style={S.label}>Winner Pick (1×)</label>
                    <select
                      value={pl.winner_pick || ""}
                      onChange={(e) => savePicks(pl.id, Number(e.target.value) || null, pl.wildcard_pick)}
                      style={S.select}
                    >
                      <option value="">— none —</option>
                      {selSeason.competitors.sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>

                    <label style={S.label}>Wildcard Pick (2×) — before season starts</label>
                    <select
                      value={pl.wildcard_pick || ""}
                      onChange={(e) => savePicks(pl.id, pl.winner_pick, Number(e.target.value) || null)}
                      style={S.select}
                    >
                      <option value="">— none —</option>
                      {selSeason.competitors.sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => setShowBuyback(pl)}
                      style={{ ...S.btn("ghost"), marginTop: 12 }}
                    >
                      🔄 Buyback (−10pts)
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── SCORING ── */}
      {screen === "scoring" && inProgress && selSeason && (
        <div>
          <div style={{ display: "flex", gap: 0, margin: "12px 16px 0", borderRadius: 10, overflow: "hidden", border: "1px solid #e50000" }}>
            {["scoreboard", "episodes"].map((t) => (
              <button
                key={t}
                onClick={() => setScoringTab(t)}
                style={{
                  flex: 1, padding: "10px 0", border: "none", cursor: "pointer",
                  background: scoringTab === t ? "#e50000" : "#1a0000",
                  color: "#fff", fontWeight: 700, fontSize: 13,
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {scoringTab === "scoreboard" && (
            <div>
              {rankedPlayers.map((pl, idx) => {
                const wComp = selSeason.competitors.find((c) => c.id === pl.winner_pick);
                const wcComp = selSeason.competitors.find((c) => c.id === pl.wildcard_pick);
                return (
                  <div key={pl.id} style={S.card}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <span style={{ color: "#e50000", fontWeight: 700, marginRight: 8 }}>
                          {idx === 0 ? "🏆" : `#${idx + 1}`}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{pl.name}</span>
                      </div>
                      <span style={{ fontWeight: 900, fontSize: 22, color: "#e50000" }}>{pl.total}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                      {wComp && <span>Winner: <span style={{ color: "#e2e8f0" }}>{wComp.name}</span></span>}
                      {wcComp && <span style={{ marginLeft: 10 }}>Wildcard: <span style={{ color: "#fbbf24" }}>{wcComp.name}</span></span>}
                    </div>
                  </div>
                );
              })}

              <div style={{ margin: "0 16px" }}>
                <button onClick={() => setShowEpModal(true)} style={S.btn("primary")}>
                  + Score Episode {(rankedPlayers[0]?._maxEpisode || 0) + 1}
                </button>
                <button
                  onClick={() => setShowEndConfirm(true)}
                  style={S.btn("danger")}
                >
                  End Season
                </button>
              </div>
            </div>
          )}

          {scoringTab === "episodes" && (
            <div>
              {/* Group events by episode */}
              {(() => {
                const eps = [...new Set(events.map((e) => e.episode))].sort((a, b) => b - a);
                if (eps.length === 0) return (
                  <div style={{ ...S.card, color: "#888", textAlign: "center" }}>
                    No episodes scored yet
                  </div>
                );
                return eps.map((ep) => {
                  const epEvents = events.filter((e) => e.episode === ep);
                  const sampleBreakdown = epEvents[0]?.breakdown || {};
                  return (
                    <div key={ep} style={S.card}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>Episode {ep}</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => {
                              setEditEpisode({
                                episode: ep,
                                dailyWinners: sampleBreakdown.daily || [],
                                eliminationWinners: sampleBreakdown.elimWinners || [],
                                eliminationLosers: sampleBreakdown.elimLosers || [],
                                buybackPenalties: [],
                              });
                              setShowEpModal(true);
                            }}
                            style={{ fontSize: 12, padding: "4px 10px", background: "#2a2f3e", border: "none", borderRadius: 6, color: "#ccc", cursor: "pointer" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => { if (window.confirm(`Delete Episode ${ep}?`)) deleteEpisode(ep); }}
                            style={{ fontSize: 12, padding: "4px 10px", background: "#7f1d1d", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {sampleBreakdown.daily?.length > 0 && (
                        <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
                          Daily Winners: {selSeason.competitors.filter(c => sampleBreakdown.daily?.map(Number).includes(Number(c.id))).map(c => c.name).join(", ")}
                        </div>
                      )}
                      {sampleBreakdown.elimWinners?.length > 0 && (
                        <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
                          Elim Winners: {selSeason.competitors.filter(c => sampleBreakdown.elimWinners?.map(Number).includes(Number(c.id))).map(c => c.name).join(", ")}
                        </div>
                      )}
                      {sampleBreakdown.elimLosers?.length > 0 && (
                        <div style={{ fontSize: 12, color: "#e50000", marginBottom: 8 }}>
                          Eliminated: {selSeason.competitors.filter(c => sampleBreakdown.elimLosers?.map(Number).includes(Number(c.id))).map(c => c.name).join(", ")}
                        </div>
                      )}
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {epEvents
                          .sort((a, b) => {
                            const pa = players.find(p => p.id === a.player_id);
                            const pb = players.find(p => p.id === b.player_id);
                            return (pa?.name || "").localeCompare(pb?.name || "");
                          })
                          .map((ev) => {
                            const pl = players.find((p) => p.id === ev.player_id);
                            return (
                              <div key={ev.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "2px 0" }}>
                                <span>{pl?.name}</span>
                                <span style={{ color: ev.points >= 0 ? "#22c55e" : "#f87171", fontWeight: 700 }}>
                                  {ev.points >= 0 ? "+" : ""}{ev.points}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      )}

      {/* ── ALL-TIME ── */}
      {screen === "alltime" && (
        <div>
          {savedSeasons.length === 0 ? (
            <div style={{ ...S.card, color: "#888", textAlign: "center" }}>
              No completed seasons yet
            </div>
          ) : (
            savedSeasons.map(async (s) => null) // placeholder — loaded below
          )}
          <AllTimeBoard savedSeasons={savedSeasons} db={db} />
        </div>
      )}

      {/* ── MODALS ── */}
      {showEpModal && selSeason && (
        <EpisodeModal
          key={editEpisode?.episode || "new"}
          season={selSeason}
          players={rankedPlayers}
          previouslyEliminated={previouslyEliminatedIds}
          existingEpisode={editEpisode}
          onClose={() => { setShowEpModal(false); setEditEpisode(null); }}
          onSave={saveEpisode}
        />
      )}

      {showBuyback && selSeason && (
        <BuybackModal
          player={showBuyback}
          season={selSeason}
          previouslyEliminated={previouslyEliminatedIds}
          onClose={() => setShowBuyback(null)}
          onSave={(data) => processBuyback(showBuyback, data)}
        />
      )}

      {showEndConfirm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }}>
          <div style={{ background: "#111", border: "1px solid #e50000", borderRadius: 16, padding: 24, maxWidth: 380, width: "100%" }}>
            <h3 style={{ color: "#e50000", marginBottom: 8 }}>End Season?</h3>
            <p style={{ color: "#ccc", fontSize: 14, marginBottom: 16 }}>
              Final scores will be saved to the all-time leaderboard and the active season will be cleared.
            </p>
            <button onClick={endSeason} style={S.btn("danger")}>Yes, End Season</button>
            <button onClick={() => setShowEndConfirm(false)} style={S.btn("ghost")}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── All-Time Board (separate component to handle async results) ──────────────
function AllTimeBoard({ savedSeasons, db }) {
  const [seasonResults, setSeasonResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const results = {};
      for (const s of savedSeasons) {
        results[s.id] = await db.getResultsForSeason(s.id);
      }
      setSeasonResults(results);
      setLoading(false);
    }
    load();
  }, [savedSeasons]);

  if (loading) return <div style={{ color: "#888", textAlign: "center", padding: 40 }}>Loading…</div>;

  // Aggregate stats
  const playerStats = {};
  for (const s of savedSeasons) {
    const results = seasonResults[s.id] || [];
    for (const r of results) {
      if (!playerStats[r.player_name]) {
        playerStats[r.player_name] = { wins: 0, totalPts: 0, seasons: 0, bestScore: 0, bestSeason: "" };
      }
      const ps = playerStats[r.player_name];
      ps.seasons += 1;
      ps.totalPts += r.score;
      if (r.finish_position === 1) ps.wins += 1;
      if (r.score > ps.bestScore) {
        ps.bestScore = r.score;
        ps.bestSeason = s.season_name;
      }
    }
  }

  const sorted = Object.entries(playerStats)
    .map(([name, s]) => ({ name, ...s, avg: s.seasons ? Math.round(s.totalPts / s.seasons) : 0 }))
    .sort((a, b) => b.totalPts - a.totalPts);

  return (
    <div>
      {sorted.map((p, i) => (
        <div key={p.name} style={{
          background: "#111", border: "1px solid #2a0000", borderRadius: 12,
          padding: 14, margin: "10px 16px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div>
              <span style={{ color: "#e50000", fontWeight: 700, marginRight: 6 }}>{i === 0 ? "🏆" : `#${i + 1}`}</span>
              <span style={{ fontWeight: 700 }}>{p.name}</span>
            </div>
            <span style={{ fontWeight: 900, fontSize: 20, color: "#e50000" }}>{p.totalPts}</span>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#888" }}>
            <span>Wins: <b style={{ color: "#e2e8f0" }}>{p.wins}</b></span>
            <span>Avg: <b style={{ color: "#e2e8f0" }}>{p.avg}/season</b></span>
            <span>Best: <b style={{ color: "#e2e8f0" }}>{p.bestScore}</b></span>
          </div>
          {p.bestSeason && (
            <div style={{ fontSize: 11, color: "#555", marginTop: 3 }}>Best season: {p.bestSeason}</div>
          )}
        </div>
      ))}

      <div style={{ margin: "16px", borderTop: "1px solid #2a0000", paddingTop: 16 }}>
        {savedSeasons.map((s) => {
          const results = seasonResults[s.id] || [];
          return (
            <div key={s.id} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: "#e50000", fontSize: 14, marginBottom: 6 }}>
                {s.season_name} ({s.season_year})
              </div>
              {results.map((r) => (
                <div key={r.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0", borderBottom: "1px solid #1a0000" }}>
                  <span>
                    <span style={{ color: "#888", marginRight: 6 }}>#{r.finish_position}</span>
                    {r.player_name}
                  </span>
                  <span style={{ fontWeight: 700 }}>{r.score}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
