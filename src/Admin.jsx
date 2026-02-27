import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const COLORS = {
  maroon: "#5D1A2A",
  maroonDark: "#3D0F1A",
  gold: "#C4A052",
  goldLight: "#D4B472",
  white: "#FFFFFF",
  offWhite: "#FAF8F6",
  gray100: "#F4F1EE",
  gray200: "#E8E2DC",
  gray400: "#B0A89E",
  gray600: "#6B6159",
  gray800: "#2C2420",
  green: "#2E7D32",
  greenLight: "#E8F5E9",
  red: "#C62828",
  redLight: "#FFEBEE",
};

const PLAYERS = [
  { id: 1,  name: "Jacob Parker",    number: 2,  pos: "OF" },
  { id: 2,  name: "Ace Reese",       number: 3,  pos: "INF" },
  { id: 3,  name: "Aidan Teel",      number: 5,  pos: "OF" },
  { id: 4,  name: "James Nunnallee", number: 6,  pos: "OF" },
  { id: 5,  name: "Reed Stallman",   number: 7,  pos: "1B/OF" },
  { id: 6,  name: "Ryder Woodson",   number: 9,  pos: "INF" },
  { id: 7,  name: "Drew Wyers",      number: 10, pos: "INF" },
  { id: 8,  name: "Chone James",     number: 12, pos: "INF/UTL" },
  { id: 9,  name: "Vytas Valincius", number: 14, pos: "OF" },
  { id: 10, name: "Noah Sullivan",   number: 18, pos: "UTL" },
  { id: 11, name: "Andrew Raymond",  number: 19, pos: "C" },
  { id: 12, name: "Kevin Milewski",  number: 21, pos: "C" },
  { id: 13, name: "Nick Frontino",   number: 22, pos: "INF" },
  { id: 14, name: "Jackson Owen",    number: 23, pos: "C" },
  { id: 15, name: "Peter Mershon",   number: 27, pos: "UTL" },
  { id: 16, name: "Blake Bevis",     number: 33, pos: "1B/OF" },
  { id: 17, name: "Gehrig Frei",     number: 34, pos: "INF/OF" },
  { id: 18, name: "Bryce Chance",    number: 38, pos: "OF" },
  { id: 19, name: "Charlie Wortham", number: 31, pos: "UTL" },
  { id: 20, name: "Gatlin Sanders",  number: 49, pos: "INF" },
];

const PITCHERS = [
  { id: 1,  name: "Tomas Valincius",       number: 4,  role: "SP" },
  { id: 2,  name: "Charlie Foster",        number: 8,  role: "SP" },
  { id: 3,  name: "Duke Stone",            number: 11, role: "SP" },
  { id: 4,  name: "William Kirk",          number: 13, role: "SP" },
  { id: 5,  name: "Tanner Beliveau",       number: 15, role: "RP" },
  { id: 6,  name: "Braden Booth",          number: 16, role: "RP" },
  { id: 7,  name: "Parker Rhodes",         number: 17, role: "RP" },
  { id: 8,  name: "Maddox Miller",         number: 20, role: "SP" },
  { id: 9,  name: "Jack Bauer",            number: 24, role: "SP" },
  { id: 10, name: "Chris Billingsley Jr.", number: 25, role: "SP" },
  { id: 11, name: "Ryan McPherson",        number: 28, role: "RP" },
  { id: 12, name: "Maddox Webb",           number: 29, role: "RP" },
  { id: 13, name: "Jackson Logar",         number: 30, role: "RP" },
  { id: 14, name: "Peyton Fowler",         number: 32, role: "SP" },
  { id: 15, name: "Ben Davis",             number: 35, role: "SP" },
  { id: 16, name: "Tyler Pitzer",          number: 36, role: "RP" },
  { id: 17, name: "Brendan Sweeney",       number: 37, role: "SP" },
  { id: 18, name: "Patrick Spencer Jr.",   number: 39, role: "RP" },
  { id: 19, name: "Jack Gleason",          number: 42, role: "RP" },
  { id: 20, name: "Dane Burns",            number: 45, role: "SP" },
  { id: 21, name: "JT Schnoor",            number: 47, role: "RP" },
];

const emptyBatting = () => ({ played: false, ab: "", r: "", h: "", rbi: "", bb: "", so: "", lob: "" });
const emptyPitching = () => ({ pitched: false, ip: "", h: "", r: "", er: "", bb: "", so: "", sv: false });

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Source Sans 3', sans-serif; background: #FAF8F6; color: #2C2420; max-width: 480px; margin: 0 auto; min-height: 100vh; }

  .header {
    background: #5D1A2A;
    padding: 18px 20px;
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
  }
  .header-left { display: flex; align-items: center; gap: 10px; }
  .diamond { width: 30px; height: 30px; background: #C4A052; transform: rotate(45deg); border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .diamond span { transform: rotate(-45deg); font-size: 12px; font-weight: 900; color: #5D1A2A; font-family: 'Playfair Display', serif; }
  .header-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 900; color: white; }
  .header-sub { font-size: 10px; color: #D4B472; letter-spacing: 0.12em; text-transform: uppercase; }
  .admin-badge { background: rgba(196,160,82,0.25); color: #D4B472; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 12px; letter-spacing: 0.08em; text-transform: uppercase; }

  .page { padding: 16px; padding-bottom: 100px; }

  .section { background: white; border-radius: 14px; border: 1px solid #E8E2DC; margin-bottom: 16px; overflow: hidden; }
  .section-head { background: #5D1A2A; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; }
  .section-head-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: white; }
  .section-head-sub { font-size: 11px; color: rgba(255,255,255,0.6); }
  .section-body { padding: 16px; }

  .field-row { margin-bottom: 14px; }
  .field-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #6B6159; margin-bottom: 6px; }
  .field-input { width: 100%; padding: 10px 12px; border: 1.5px solid #E8E2DC; border-radius: 8px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: #2C2420; background: #FAF8F6; outline: none; transition: border-color 0.2s; }
  .field-input:focus { border-color: #5D1A2A; background: white; }
  .field-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }

  .result-toggle { display: flex; gap: 8px; margin-bottom: 14px; }
  .result-btn { flex: 1; padding: 10px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; border: 1.5px solid #E8E2DC; background: #FAF8F6; color: #B0A89E; transition: all 0.15s; }
  .result-btn.active-w { background: #E8F5E9; border-color: #2E7D32; color: #2E7D32; }
  .result-btn.active-l { background: #FFEBEE; border-color: #C62828; color: #C62828; }

  .player-table { width: 100%; border-collapse: collapse; }
  .player-table th { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #B0A89E; padding: 6px 4px; text-align: center; border-bottom: 1px solid #E8E2DC; }
  .player-table th.left { text-align: left; padding-left: 8px; }
  .player-table td { padding: 4px 3px; text-align: center; border-bottom: 1px solid #F4F1EE; }
  .player-table tr.inactive td { opacity: 0.35; }
  .player-table tr.inactive td:first-child { opacity: 1; }

  .player-name-cell { text-align: left; padding-left: 4px; }
  .p-name { font-size: 13px; font-weight: 600; color: #2C2420; }
  .p-num { font-size: 11px; color: #B0A89E; }

  .stat-input { width: 100%; padding: 5px 2px; border: 1.5px solid #E8E2DC; border-radius: 6px; font-family: 'Source Sans 3', sans-serif; font-size: 13px; text-align: center; color: #2C2420; background: #FAF8F6; outline: none; }
  .stat-input:focus { border-color: #5D1A2A; background: white; }
  .stat-input:disabled { background: #F4F1EE; border-color: transparent; color: #B0A89E; }

  .toggle-played { width: 22px; height: 22px; border-radius: 6px; border: 1.5px solid #E8E2DC; background: #FAF8F6; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px; transition: all 0.15s; margin: 0 auto; }
  .toggle-played.on { background: #5D1A2A; border-color: #5D1A2A; color: white; }

  .sv-toggle { width: 22px; height: 22px; border-radius: 6px; border: 1.5px solid #E8E2DC; background: #FAF8F6; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; transition: all 0.15s; margin: 0 auto; }
  .sv-toggle.on { background: #E65100; border-color: #E65100; color: white; }

  .save-bar { position: fixed; bottom: 0; left: 0; right: 0; max-width: 480px; margin: 0 auto; background: white; border-top: 1px solid #E8E2DC; padding: 12px 16px; display: flex; gap: 10px; }
  .save-btn { flex: 1; padding: 14px; background: #5D1A2A; color: white; border: none; border-radius: 10px; font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; cursor: pointer; }
  .save-btn:disabled { opacity: 0.6; }
  .clear-btn { padding: 14px 20px; background: #F4F1EE; color: #6B6159; border: none; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; }

  .toast { position: fixed; top: 80px; left: 50%; transform: translateX(-50%); color: white; padding: 10px 24px; border-radius: 24px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 20px rgba(0,0,0,0.15); z-index: 999; animation: fadeInOut 3s ease forwards; white-space: nowrap; }
  @keyframes fadeInOut { 0% { opacity: 0; transform: translateX(-50%) translateY(-8px); } 15% { opacity: 1; transform: translateX(-50%) translateY(0); } 75% { opacity: 1; } 100% { opacity: 0; } }

  .tabs { display: flex; gap: 8px; margin-bottom: 16px; }
  .tab { padding: 7px 18px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1.5px solid #E8E2DC; background: white; color: #6B6159; transition: all 0.15s; }
  .tab.active { background: #5D1A2A; border-color: #5D1A2A; color: white; }

  .saved-game-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: white; border-radius: 10px; border: 1px solid #E8E2DC; margin-bottom: 8px; }
  .sg-opp { font-weight: 600; font-size: 14px; }
  .sg-date { font-size: 12px; color: #B0A89E; }
  .sg-result { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 15px; }
  .sg-w { color: #2E7D32; }
  .sg-l { color: #C62828; }
`;

function StatInput({ value, onChange, disabled }) {
  return (
    <input
      className="stat-input"
      style={{ width: 38 }}
      type="number"
      min="0"
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      placeholder="0"
    />
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState("entry");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastError, setToastError] = useState(false);
  const [savedGames, setSavedGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingGames, setLoadingGames] = useState(false);

  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("home");
  const [result, setResult] = useState("");
  const [msScore, setMsScore] = useState("");
  const [oppScore, setOppScore] = useState("");
  const [notes, setNotes] = useState("");

  const [batting, setBatting] = useState(() => {
    const init = {};
    PLAYERS.forEach(p => { init[p.id] = emptyBatting(); });
    return init;
  });

  const [pitching, setPitching] = useState(() => {
    const init = {};
    PITCHERS.forEach(p => { init[p.id] = emptyPitching(); });
    return init;
  });

  useEffect(() => { fetchGames(); }, []);

  const fetchGames = async () => {
    setLoadingGames(true);
    const { data, error } = await supabase.from("games").select("*").order("date", { ascending: false });
    if (!error) setSavedGames(data);
    setLoadingGames(false);
  };

  const showMsg = (msg, error = false) => {
    setToastMsg(msg); setToastError(error);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const updateBat = (id, field, val) => setBatting(prev => ({ ...prev, [id]: { ...prev[id], [field]: val } }));
  const updatePitch = (id, field, val) => setPitching(prev => ({ ...prev, [id]: { ...prev[id], [field]: val } }));
  const togglePlayed = (id) => setBatting(prev => ({ ...prev, [id]: { ...prev[id], played: !prev[id].played } }));
  const togglePitched = (id) => setPitching(prev => ({ ...prev, [id]: { ...prev[id], pitched: !prev[id].pitched } }));
  const toggleSv = (id) => setPitching(prev => ({ ...prev, [id]: { ...prev[id], sv: !prev[id].sv } }));

  const resetForm = () => {
    setOpponent(""); setDate(""); setLocation("home"); setResult(""); setMsScore(""); setOppScore(""); setNotes("");
    const b = {}; PLAYERS.forEach(p => { b[p.id] = emptyBatting(); }); setBatting(b);
    const pi = {}; PITCHERS.forEach(p => { pi[p.id] = emptyPitching(); }); setPitching(pi);
  };

  const handleSave = async () => {
    if (!opponent || !date || !result) {
      alert("Please fill in opponent, date, and result.");
      return;
    }
    setLoading(true);
    try {
      // Insert game
      const { data: gameData, error: gameError } = await supabase.from("games").insert({
        opponent, date, location, result,
        msu_score: parseInt(msScore) || 0,
        opp_score: parseInt(oppScore) || 0,
        notes,
      }).select().single();

      if (gameError) throw gameError;

      // Insert batting
      const battingRows = Object.entries(batting)
        .filter(([, v]) => v.played)
        .map(([id, v]) => {
          const player = PLAYERS.find(p => p.id === Number(id));
          return {
            game_id: gameData.id,
            player_id: Number(id),
            player_name: player.name,
            ab: parseInt(v.ab) || 0,
            r: parseInt(v.r) || 0,
            h: parseInt(v.h) || 0,
            rbi: parseInt(v.rbi) || 0,
            bb: parseInt(v.bb) || 0,
            so: parseInt(v.so) || 0,
            lob: parseInt(v.lob) || 0,
          };
        });

      if (battingRows.length > 0) {
        const { error: batError } = await supabase.from("batting_stats").insert(battingRows);
        if (batError) throw batError;
      }

      // Insert pitching
      const pitchingRows = Object.entries(pitching)
        .filter(([, v]) => v.pitched)
        .map(([id, v]) => {
          const pitcher = PITCHERS.find(p => p.id === Number(id));
          return {
            game_id: gameData.id,
            pitcher_id: Number(id),
            pitcher_name: pitcher.name,
            ip: parseFloat(v.ip) || 0,
            h: parseInt(v.h) || 0,
            r: parseInt(v.r) || 0,
            er: parseInt(v.er) || 0,
            bb: parseInt(v.bb) || 0,
            so: parseInt(v.so) || 0,
            sv: v.sv || false,
          };
        });

      if (pitchingRows.length > 0) {
        const { error: pitchError } = await supabase.from("pitching_stats").insert(pitchingRows);
        if (pitchError) throw pitchError;
      }

      showMsg("✓ Game saved to database!");
      resetForm();
      fetchGames();
      setTab("log");
    } catch (e) {
      console.error(e);
      showMsg("✗ Error: " + e.message, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      {showToast && (
        <div className="toast" style={{ background: toastError ? "#C62828" : "#2E7D32" }}>
          {toastMsg}
        </div>
      )}

      <header className="header">
        <div className="header-left">
          <div className="diamond"><span>HS</span></div>
          <div>
            <div className="header-title">Hail State Baseball</div>
            <div className="header-sub">Admin · Data Entry</div>
          </div>
        </div>
        <div className="admin-badge">Admin</div>
      </header>

      <div className="page">
        <div className="tabs">
          <button className={`tab ${tab === "entry" ? "active" : ""}`} onClick={() => setTab("entry")}>Enter Game</button>
          <button className={`tab ${tab === "log" ? "active" : ""}`} onClick={() => setTab("log")}>
            Saved ({savedGames.length})
          </button>
        </div>

        {tab === "log" && (
          <div>
            {loadingGames ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#B0A89E" }}>Loading games...</div>
            ) : savedGames.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#B0A89E" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⚾</div>
                <div style={{ fontSize: 14 }}>No games saved yet</div>
              </div>
            ) : savedGames.map(g => (
              <div key={g.id} className="saved-game-row">
                <div>
                  <div className="sg-opp">{g.opponent}</div>
                  <div className="sg-date">{g.date} · {g.location === "home" ? "Home" : g.location === "neutral" ? "Neutral" : "Away"}</div>
                </div>
                <div className={`sg-result sg-${g.result.toLowerCase()}`}>
                  {g.result} {g.msu_score}-{g.opp_score}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "entry" && (
          <>
            {/* GAME INFO */}
            <div className="section">
              <div className="section-head">
                <div className="section-head-title">Game Info</div>
                <div className="section-head-sub">Fill in before stats</div>
              </div>
              <div className="section-body">
                <div className="field-row">
                  <div className="field-label">Opponent</div>
                  <input className="field-input" placeholder="e.g. vs Hofstra" value={opponent} onChange={e => setOpponent(e.target.value)} />
                </div>
                <div className="field-row-2">
                  <div>
                    <div className="field-label">Date</div>
                    <input className="field-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                  <div>
                    <div className="field-label">Location</div>
                    <select className="field-input" value={location} onChange={e => setLocation(e.target.value)}>
                      <option value="home">Home</option>
                      <option value="away">Away</option>
                      <option value="neutral">Neutral</option>
                    </select>
                  </div>
                </div>
                <div className="field-label">Result</div>
                <div className="result-toggle">
                  <button className={`result-btn ${result === "W" ? "active-w" : ""}`} onClick={() => setResult("W")}>W — Win</button>
                  <button className={`result-btn ${result === "L" ? "active-l" : ""}`} onClick={() => setResult("L")}>L — Loss</button>
                </div>
                <div className="field-row-2">
                  <div>
                    <div className="field-label">MSU Score</div>
                    <input className="field-input" type="number" min="0" placeholder="0" value={msScore} onChange={e => setMsScore(e.target.value)} />
                  </div>
                  <div>
                    <div className="field-label">Opp Score</div>
                    <input className="field-input" type="number" min="0" placeholder="0" value={oppScore} onChange={e => setOppScore(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* BATTING */}
            <div className="section">
              <div className="section-head">
                <div className="section-head-title">Batting</div>
                <div className="section-head-sub">Tap ✓ to activate a player</div>
              </div>
              <div className="section-body" style={{ padding: "12px 8px" }}>
                <div style={{ overflowX: "auto" }}>
                  <table className="player-table" style={{ minWidth: 420 }}>
                    <thead>
                      <tr>
                        <th style={{ width: 28 }}></th>
                        <th className="left" style={{ minWidth: 120 }}>Player</th>
                        <th>AB</th>
                        <th>R</th>
                        <th>H</th>
                        <th>RBI</th>
                        <th>BB</th>
                        <th>SO</th>
                        <th>LOB</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PLAYERS.map(p => {
                        const b = batting[p.id];
                        return (
                          <tr key={p.id} className={b.played ? "" : "inactive"}>
                            <td>
                              <div className={`toggle-played ${b.played ? "on" : ""}`} onClick={() => togglePlayed(p.id)}>
                                {b.played ? "✓" : ""}
                              </div>
                            </td>
                            <td className="player-name-cell">
                              <div className="p-name">{p.name}</div>
                              <div className="p-num">#{p.number} · {p.pos}</div>
                            </td>
                            <td><StatInput value={b.ab}  onChange={v => updateBat(p.id, "ab",  v)} disabled={!b.played} /></td>
                            <td><StatInput value={b.r}   onChange={v => updateBat(p.id, "r",   v)} disabled={!b.played} /></td>
                            <td><StatInput value={b.h}   onChange={v => updateBat(p.id, "h",   v)} disabled={!b.played} /></td>
                            <td><StatInput value={b.rbi} onChange={v => updateBat(p.id, "rbi", v)} disabled={!b.played} /></td>
                            <td><StatInput value={b.bb}  onChange={v => updateBat(p.id, "bb",  v)} disabled={!b.played} /></td>
                            <td><StatInput value={b.so}  onChange={v => updateBat(p.id, "so",  v)} disabled={!b.played} /></td>
                            <td><StatInput value={b.lob} onChange={v => updateBat(p.id, "lob", v)} disabled={!b.played} /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* PITCHING */}
            <div className="section">
              <div className="section-head">
                <div className="section-head-title">Pitching</div>
                <div className="section-head-sub">Tap ✓ to activate · SV = Save (top of box score)</div>
              </div>
              <div className="section-body" style={{ padding: "12px 8px" }}>
                <div style={{ overflowX: "auto" }}>
                  <table className="player-table" style={{ minWidth: 400 }}>
                    <thead>
                      <tr>
                        <th style={{ width: 28 }}></th>
                        <th className="left" style={{ minWidth: 120 }}>Pitcher</th>
                        <th>IP</th>
                        <th>H</th>
                        <th>R</th>
                        <th>ER</th>
                        <th>BB</th>
                        <th>SO</th>
                        <th>SV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PITCHERS.map(p => {
                        const pi = pitching[p.id];
                        return (
                          <tr key={p.id} className={pi.pitched ? "" : "inactive"}>
                            <td>
                              <div className={`toggle-played ${pi.pitched ? "on" : ""}`} onClick={() => togglePitched(p.id)}>
                                {pi.pitched ? "✓" : ""}
                              </div>
                            </td>
                            <td className="player-name-cell">
                              <div className="p-name">{p.name}</div>
                              <div className="p-num">#{p.number} · {p.role}</div>
                            </td>
                            <td><StatInput value={pi.ip} onChange={v => updatePitch(p.id, "ip", v)} disabled={!pi.pitched} /></td>
                            <td><StatInput value={pi.h}  onChange={v => updatePitch(p.id, "h",  v)} disabled={!pi.pitched} /></td>
                            <td><StatInput value={pi.r}  onChange={v => updatePitch(p.id, "r",  v)} disabled={!pi.pitched} /></td>
                            <td><StatInput value={pi.er} onChange={v => updatePitch(p.id, "er", v)} disabled={!pi.pitched} /></td>
                            <td><StatInput value={pi.bb} onChange={v => updatePitch(p.id, "bb", v)} disabled={!pi.pitched} /></td>
                            <td><StatInput value={pi.so} onChange={v => updatePitch(p.id, "so", v)} disabled={!pi.pitched} /></td>
                            <td>
                              <div
                                className={`sv-toggle ${pi.sv ? "on" : ""}`}
                                onClick={() => pi.pitched && toggleSv(p.id)}
                                style={{ opacity: pi.pitched ? 1 : 0.3 }}
                              >
                                {pi.sv ? "S" : ""}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* NOTES */}
            <div className="section">
              <div className="section-head">
                <div className="section-head-title">Game Notes</div>
                <div className="section-head-sub">2B, HR, SB, HBP from bottom of box score</div>
              </div>
              <div className="section-body">
                <textarea
                  className="field-input"
                  rows={4}
                  placeholder="e.g. 2B: Stallman (1). SB: Frei (2). HBP: Nunnalee, Reese."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{ resize: "vertical", lineHeight: 1.5 }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {tab === "entry" && (
        <div className="save-bar">
          <button className="clear-btn" onClick={resetForm}>Clear</button>
          <button className="save-btn" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Game →"}
          </button>
        </div>
      )}
    </>
  );
}
