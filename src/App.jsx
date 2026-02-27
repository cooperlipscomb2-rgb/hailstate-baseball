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
  { id: 1,  name: "Jacob Parker",    number: 2  },
  { id: 2,  name: "Ace Reese",       number: 3  },
  { id: 3,  name: "Aidan Teel",      number: 5  },
  { id: 4,  name: "James Nunnalee",  number: 6  },
  { id: 5,  name: "Reed Stallman",   number: 7  },
  { id: 6,  name: "Ryder Woodson",   number: 9  },
  { id: 7,  name: "Drew Wyers",      number: 10 },
  { id: 8,  name: "Chone James",     number: 12 },
  { id: 9,  name: "Vytas Valincius", number: 14 },
  { id: 10, name: "Noah Sullivan",   number: 18 },
  { id: 11, name: "Andrew Raymond",  number: 19 },
  { id: 12, name: "Kevin Milewski",  number: 21 },
  { id: 13, name: "Nick Frontino",   number: 22 },
  { id: 14, name: "Jackson Owen",    number: 23 },
  { id: 15, name: "Peter Mershon",   number: 27 },
  { id: 16, name: "Blake Bevis",     number: 33 },
  { id: 17, name: "Gehrig Frei",     number: 34 },
  { id: 18, name: "Bryce Chance",    number: 38 },
  { id: 19, name: "Charlie Wortham", number: 31 },
  { id: 20, name: "Gatlin Sanders",  number: 49 },
];

const PITCHERS = [
  { id: 1,  name: "Tomas Valincius",       number: 4  },
  { id: 2,  name: "Charlie Foster",        number: 8  },
  { id: 3,  name: "Duke Stone",            number: 11 },
  { id: 4,  name: "William Kirk",          number: 13 },
  { id: 5,  name: "Tanner Beliveau",       number: 15 },
  { id: 6,  name: "Braden Booth",          number: 16 },
  { id: 7,  name: "Parker Rhodes",         number: 17 },
  { id: 8,  name: "Maddox Miller",         number: 20 },
  { id: 9,  name: "Jack Bauer",            number: 24 },
  { id: 10, name: "Chris Billingsley Jr.", number: 25 },
  { id: 11, name: "Ryan McPherson",        number: 28 },
  { id: 12, name: "Maddox Webb",           number: 29 },
  { id: 13, name: "Jackson Logar",         number: 30 },
  { id: 14, name: "Peyton Fowler",         number: 32 },
  { id: 15, name: "Ben Davis",             number: 35 },
  { id: 16, name: "Tyler Pitzer",          number: 36 },
  { id: 17, name: "Brendan Sweeney",       number: 37 },
  { id: 18, name: "Patrick Spencer Jr.",   number: 39 },
  { id: 19, name: "Jack Gleason",          number: 42 },
  { id: 20, name: "Dane Burns",            number: 45 },
  { id: 21, name: "JT Schnoor",            number: 47 },
];


  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Source Sans 3', sans-serif; background: #FAF8F6; color: #2C2420; max-width: 430px; margin: 0 auto; min-height: 100vh; }
  .app { padding-bottom: 80px; }

  .header { background: #5D1A2A; padding: 20px 20px 16px; position: sticky; top: 0; z-index: 100; }
  .header-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
  .header-logo { display: flex; align-items: center; gap: 10px; }
  .diamond-icon { width: 32px; height: 32px; background: #C4A052; transform: rotate(45deg); border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .diamond-inner { transform: rotate(-45deg); font-size: 13px; font-weight: 900; color: #5D1A2A; font-family: 'Playfair Display', serif; }
  .site-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 900; color: white; letter-spacing: 0.02em; line-height: 1; }
  .site-sub { font-size: 10px; font-weight: 300; color: #D4B472; letter-spacing: 0.15em; text-transform: uppercase; }
  .season-badge { background: rgba(255,255,255,0.12); color: #D4B472; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }

  .nav { display: flex; background: white; border-bottom: 1px solid #E8E2DC; position: sticky; top: 72px; z-index: 99; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .nav-btn { flex: 1; padding: 12px 4px; background: none; border: none; font-family: 'Source Sans 3', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #B0A89E; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
  .nav-btn.active { color: #5D1A2A; border-bottom-color: #5D1A2A; }

  .page { padding: 20px 16px; }

  .record-hero { background: #5D1A2A; border-radius: 16px; padding: 24px; margin-bottom: 16px; position: relative; overflow: hidden; }
  .record-hero::before { content: ''; position: absolute; top: -30px; right: -30px; width: 140px; height: 140px; background: rgba(196,160,82,0.12); border-radius: 50%; }
  .record-label { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #D4B472; margin-bottom: 8px; }
  .record-numbers { font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 900; color: white; line-height: 1; margin-bottom: 4px; }
  .record-sub { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 300; }
  .record-bar { display: flex; gap: 3px; margin-top: 16px; }
  .record-pip { flex: 1; height: 6px; border-radius: 3px; }

  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .stat-card { background: white; border-radius: 12px; padding: 16px; border: 1px solid #E8E2DC; }
  .stat-card-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #B0A89E; margin-bottom: 6px; }
  .stat-card-value { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: #5D1A2A; line-height: 1; }
  .stat-card-desc { font-size: 11px; color: #B0A89E; margin-top: 4px; font-weight: 300; }

  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; margin-top: 8px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #3D0F1A; }

  .last-game { background: white; border-radius: 12px; padding: 16px; border: 1px solid #E8E2DC; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
  .last-game-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #B0A89E; margin-bottom: 4px; }
  .last-game-opp { font-weight: 600; font-size: 15px; color: #2C2420; }
  .last-game-date { font-size: 12px; color: #B0A89E; font-weight: 300; }
  .result-pill { padding: 8px 16px; border-radius: 24px; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 14px; text-align: center; white-space: nowrap; }
  .result-w { background: #E8F5E9; color: #2E7D32; }
  .result-l { background: #FFEBEE; color: #C62828; }

  .player-card { background: white; border-radius: 14px; padding: 16px; margin-bottom: 10px; border: 1px solid #E8E2DC; }
  .player-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .player-info { display: flex; align-items: center; gap: 12px; }
  .player-number { width: 40px; height: 40px; background: #5D1A2A; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 16px; color: white; flex-shrink: 0; }
  .player-name { font-weight: 700; font-size: 15px; color: #2C2420; }
  .player-meta { font-size: 11px; color: #B0A89E; margin-top: 2px; }
  .slash-line { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 700; color: #5D1A2A; }
  .player-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
  .pstat { text-align: center; background: #F4F1EE; border-radius: 8px; padding: 8px 4px; }
  .pstat-val { font-weight: 700; font-size: 16px; color: #2C2420; }
  .pstat-label { font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #B0A89E; margin-top: 2px; }

  .pitcher-card { background: white; border-radius: 14px; padding: 16px; margin-bottom: 10px; border: 1px solid #E8E2DC; }
  .pitcher-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .role-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 3px 8px; border-radius: 6px; text-transform: uppercase; }
  .role-SP { background: #EBF0FF; color: #3B5BDB; }
  .role-RP { background: #F4F1EE; color: #6B6159; }
  .era-display { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: #5D1A2A; line-height: 1; }
  .era-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #B0A89E; margin-top: 2px; }

  .game-row { display: flex; align-items: center; padding: 14px 16px; background: white; border-radius: 12px; margin-bottom: 8px; border: 1px solid #E8E2DC; gap: 12px; }
  .game-date { font-size: 11px; font-weight: 600; color: #B0A89E; width: 42px; flex-shrink: 0; }
  .game-opp { flex: 1; font-size: 14px; font-weight: 600; color: #2C2420; }
  .game-loc { font-size: 11px; color: #B0A89E; font-weight: 300; }
  .game-score { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 15px; text-align: right; min-width: 52px; }
  .result-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .dot-w { background: #4CAF50; }
  .dot-l { background: #EF5350; }

  .subtabs { display: flex; gap: 8px; margin-bottom: 16px; }
  .subtab { padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1.5px solid #E8E2DC; background: white; color: #6B6159; transition: all 0.2s; }
  .subtab.active { background: #5D1A2A; border-color: #5D1A2A; color: white; }

  .loading { text-align: center; padding: 40px 20px; color: #B0A89E; font-size: 14px; }
  .empty { text-align: center; padding: 40px 20px; color: #B0A89E; }
  .empty-icon { font-size: 32px; margin-bottom: 12px; }
  .empty-title { font-family: 'Playfair Display', serif; font-size: 18px; color: #5D1A2A; margin-bottom: 8px; }
`;

function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function RecordBar({ wins, losses }) {
  const total = wins + losses;
  if (total === 0) return null;
  return (
    <div className="record-bar">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="record-pip" style={{ background: i < wins ? "#C4A052" : "rgba(255,255,255,0.2)" }} />
      ))}
    </div>
  );
}

function HomePage({ games, batting, pitching }) {
  const wins = games.filter(g => g.result === "W").length;
  const losses = games.filter(g => g.result === "L").length;
  const lastGame = games[0];

  // Team batting avg
  const totalH = batting.reduce((s, b) => s + b.h, 0);
  const totalAB = batting.reduce((s, b) => s + b.ab, 0);
  const teamAvg = totalAB > 0 ? (totalH / totalAB).toFixed(3) : ".000";

  // Team ERA
  const totalER = pitching.reduce((s, p) => s + p.er, 0);
  const totalIP = pitching.reduce((s, p) => s + p.ip, 0);
  const teamERA = totalIP > 0 ? ((totalER * 9) / totalIP).toFixed(2) : "0.00";

  const totalRBI = batting.reduce((s, b) => s + b.rbi, 0);
  const totalSO = pitching.reduce((s, p) => s + p.so, 0);

  // Leaders
  const playerTotals = {};
  batting.forEach(b => {
    if (!playerTotals[b.player_name]) playerTotals[b.player_name] = { name: b.player_name, h: 0, ab: 0, rbi: 0 };
    playerTotals[b.player_name].h += b.h;
    playerTotals[b.player_name].ab += b.ab;
    playerTotals[b.player_name].rbi += b.rbi;
  });
  const players = Object.values(playerTotals).filter(p => p.ab >= 5);
  const avgLeader = players.sort((a, b) => (b.h / b.ab) - (a.h / a.ab))[0];
  const rbiLeader = Object.values(playerTotals).sort((a, b) => b.rbi - a.rbi)[0];

  const pitcherTotals = {};
  pitching.forEach(p => {
    if (!pitcherTotals[p.pitcher_name]) pitcherTotals[p.pitcher_name] = { name: p.pitcher_name, er: 0, ip: 0, so: 0 };
    pitcherTotals[p.pitcher_name].er += p.er;
    pitcherTotals[p.pitcher_name].ip += p.ip;
    pitcherTotals[p.pitcher_name].so += p.so;
  });
  const pitchers = Object.values(pitcherTotals).filter(p => p.ip >= 3);
  const eraLeader = pitchers.sort((a, b) => (a.er * 9 / a.ip) - (b.er * 9 / b.ip))[0];
  const kLeader = Object.values(pitcherTotals).sort((a, b) => b.so - a.so)[0];

  return (
    <div className="page">
      <div className="record-hero">
        <div className="record-label">2026 Season Record</div>
        <div className="record-numbers">{wins}-{losses}</div>
        <div className="record-sub">{wins + losses} games played</div>
        <RecordBar wins={wins} losses={losses} />
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-label">Team AVG</div>
          <div className="stat-card-value">{teamAvg}</div>
          <div className="stat-card-desc">Batting average</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Team ERA</div>
          <div className="stat-card-value">{teamERA}</div>
          <div className="stat-card-desc">Earned run avg</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Team RBI</div>
          <div className="stat-card-value">{totalRBI}</div>
          <div className="stat-card-desc">Runs batted in</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Strikeouts</div>
          <div className="stat-card-value">{totalSO}</div>
          <div className="stat-card-desc">Pitching K's</div>
        </div>
      </div>

      <div className="section-header">
        <div className="section-title">Last Game</div>
      </div>
      {!lastGame ? (
        <div className="last-game" style={{ justifyContent: "center" }}>
          <div style={{ color: "#B0A89E", fontSize: 13 }}>No games played yet</div>
        </div>
      ) : (
        <div className="last-game">
          <div>
            <div className="last-game-label">Most Recent · {formatDate(lastGame.date)}</div>
            <div className="last-game-opp">{lastGame.opponent}</div>
            <div className="last-game-date">{lastGame.location === "home" ? "Dudy Noble Field" : lastGame.location === "neutral" ? "Neutral Site" : "Away"}</div>
          </div>
          <div className={`result-pill result-${lastGame.result.toLowerCase()}`}>
            {lastGame.result} {lastGame.msu_score}-{lastGame.opp_score}
          </div>
        </div>
      )}

      {(avgLeader || eraLeader) && (
        <>
          <div className="section-header">
            <div className="section-title">Team Leaders</div>
          </div>
          {avgLeader && (
            <div className="last-game" style={{ marginBottom: 8 }}>
              <div>
                <div className="last-game-label">Batting AVG</div>
                <div className="last-game-opp">{avgLeader.name}</div>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#5D1A2A" }}>
                {(avgLeader.h / avgLeader.ab).toFixed(3)}
              </div>
            </div>
          )}
          {rbiLeader && (
            <div className="last-game" style={{ marginBottom: 8 }}>
              <div>
                <div className="last-game-label">RBI</div>
                <div className="last-game-opp">{rbiLeader.name}</div>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#5D1A2A" }}>
                {rbiLeader.rbi}
              </div>
            </div>
          )}
          {eraLeader && (
            <div className="last-game" style={{ marginBottom: 8 }}>
              <div>
                <div className="last-game-label">ERA</div>
                <div className="last-game-opp">{eraLeader.name}</div>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#5D1A2A" }}>
                {(eraLeader.er * 9 / eraLeader.ip).toFixed(2)}
              </div>
            </div>
          )}
          {kLeader && (
            <div className="last-game" style={{ marginBottom: 8 }}>
              <div>
                <div className="last-game-label">Strikeouts</div>
                <div className="last-game-opp">{kLeader.name}</div>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#5D1A2A" }}>
                {kLeader.so}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function RosterPage({ batting, pitching }) {
  const [tab, setTab] = useState("hitting");

  // Aggregate batting by player
  const playerMap = {};
  batting.forEach(b => {
    if (!playerMap[b.player_id]) {
      playerMap[b.player_id] = { id: b.player_id, name: b.player_name, ab: 0, r: 0, h: 0, rbi: 0, bb: 0, so: 0, games: 0 };
    }
    const p = playerMap[b.player_id];
    p.ab += b.ab; p.r += b.r; p.h += b.h; p.rbi += b.rbi; p.bb += b.bb; p.so += b.so; p.games += 1;
  });
  const players = Object.values(playerMap).sort((a, b) => {
    const avgA = a.ab > 0 ? a.h / a.ab : 0;
    const avgB = b.ab > 0 ? b.h / b.ab : 0;
    return avgB - avgA;
  });

  // Aggregate pitching by pitcher
  const pitcherMap = {};
  pitching.forEach(p => {
    if (!pitcherMap[p.pitcher_id]) {
      pitcherMap[p.pitcher_id] = { id: p.pitcher_id, name: p.pitcher_name, ip: 0, h: 0, r: 0, er: 0, bb: 0, so: 0, sv: 0, app: 0 };
    }
    const pi = pitcherMap[p.pitcher_id];
    pi.ip += p.ip; pi.h += p.h; pi.r += p.r; pi.er += p.er; pi.bb += p.bb; pi.so += p.so;
    if (p.sv) pi.sv += 1;
    pi.app += 1;
  });
  const pitchers = Object.values(pitcherMap).sort((a, b) => {
    const eraA = a.ip > 0 ? (a.er * 9) / a.ip : 99;
    const eraB = b.ip > 0 ? (b.er * 9) / b.ip : 99;
    return eraA - eraB;
  });

  return (
    <div className="page">
      <div className="subtabs">
        <button className={`subtab ${tab === "hitting" ? "active" : ""}`} onClick={() => setTab("hitting")}>Hitters</button>
        <button className={`subtab ${tab === "pitching" ? "active" : ""}`} onClick={() => setTab("pitching")}>Pitchers</button>
      </div>

      {tab === "hitting" && (
        players.length === 0 ? (
          <div className="empty"><div className="empty-icon">⚾</div><div className="empty-title">No stats yet</div></div>
        ) : players.map(p => {
          const avg = p.ab > 0 ? (p.h / p.ab).toFixed(3) : ".000";
          const obp = (p.ab + p.bb) > 0 ? ((p.h + p.bb) / (p.ab + p.bb)).toFixed(3) : ".000";
          return (
            <div key={p.id} className="player-card">
              <div className="player-card-top">
                <div className="player-info">
                  <div className="player-number">{PLAYERS.find(pl => pl.id === p.id)?.number || p.games}</div>
                  <div>
                    <div className="player-name">{p.name}</div>
                    <div className="player-meta">{p.games} game{p.games !== 1 ? "s" : ""} · {p.ab} AB</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="slash-line">{avg} / {obp}</div>
                  <div style={{ fontSize: 10, color: "#B0A89E", marginTop: 2 }}>AVG / OBP</div>
                </div>
              </div>
              <div className="player-stats">
                <div className="pstat"><div className="pstat-val">{p.r}</div><div className="pstat-label">R</div></div>
                <div className="pstat"><div className="pstat-val">{p.h}</div><div className="pstat-label">H</div></div>
                <div className="pstat"><div className="pstat-val">{p.rbi}</div><div className="pstat-label">RBI</div></div>
                <div className="pstat"><div className="pstat-val">{p.so}</div><div className="pstat-label">SO</div></div>
              </div>
            </div>
          );
        })
      )}

      {tab === "pitching" && (
        pitchers.length === 0 ? (
          <div className="empty"><div className="empty-icon">⚾</div><div className="empty-title">No stats yet</div></div>
        ) : pitchers.map(p => {
          const era = p.ip > 0 ? ((p.er * 9) / p.ip).toFixed(2) : "0.00";
          const whip = p.ip > 0 ? ((p.h + p.bb) / p.ip).toFixed(2) : "0.00";
          return (
            <div key={p.id} className="pitcher-card">
              <div className="pitcher-top">
                <div className="player-info">
                  <div className="player-number" style={{ fontSize: 12 }}>{PITCHERS.find(pi => pi.id === p.id)?.number || p.app}</div>
                  <div>
                    <div className="player-name">{p.name}</div>
                    <div className="player-meta" style={{ display: "flex", gap: 6 }}>
                      <span>{p.app} app · {p.ip} IP</span>
                      {p.sv > 0 && <span style={{ color: "#E65100", fontWeight: 700 }}>{p.sv} SV</span>}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="era-display">{era}</div>
                  <div className="era-label">ERA</div>
                </div>
              </div>
              <div className="player-stats">
                <div className="pstat"><div className="pstat-val">{p.so}</div><div className="pstat-label">K</div></div>
                <div className="pstat"><div className="pstat-val">{p.bb}</div><div className="pstat-label">BB</div></div>
                <div className="pstat"><div className="pstat-val">{p.h}</div><div className="pstat-label">H</div></div>
                <div className="pstat"><div className="pstat-val">{whip}</div><div className="pstat-label">WHIP</div></div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function GamesPage({ games }) {
  const wins = games.filter(g => g.result === "W").length;
  const losses = games.filter(g => g.result === "L").length;
  return (
    <div className="page">
      <div className="section-header">
        <div className="section-title">2026 Game Log</div>
        <div style={{ fontSize: 12, color: "#B0A89E" }}>{wins}W · {losses}L</div>
      </div>
      {games.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">⚾</div>
          <div className="empty-title">Season hasn't started yet</div>
          <div style={{ fontSize: 13, color: "#B0A89E" }}>Check back after opening day!</div>
        </div>
      ) : games.map(g => (
        <div key={g.id} className="game-row">
          <div className={`result-dot dot-${g.result.toLowerCase()}`} />
          <div className="game-date">{formatDate(g.date)}</div>
          <div>
            <div className="game-opp">{g.opponent}</div>
            <div className="game-loc">{g.location === "home" ? "Dudy Noble Field" : g.location === "neutral" ? "Neutral Site" : "Away"}</div>
          </div>
          <div className="game-score" style={{ color: g.result === "W" ? "#2E7D32" : "#C62828" }}>
            {g.result} {g.msu_score}-{g.opp_score}
          </div>
        </div>
      ))}
    </div>
  );
}

const NAV = [
  { id: "home", label: "Dashboard" },
  { id: "roster", label: "Roster" },
  { id: "games", label: "Games" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [games, setGames] = useState([]);
  const [batting, setBatting] = useState([]);
  const [pitching, setPitching] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [{ data: g }, { data: b }, { data: p }] = await Promise.all([
        supabase.from("games").select("*").order("date", { ascending: false }),
        supabase.from("batting_stats").select("*"),
        supabase.from("pitching_stats").select("*"),
      ]);
      setGames(g || []);
      setBatting(b || []);
      setPitching(p || []);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="loading">Loading Bulldogs stats...</div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="header">
          <div className="header-top">
            <div className="header-logo">
              <div className="diamond-icon"><div className="diamond-inner">HS</div></div>
              <div>
                <div className="site-name">Hail State Baseball</div>
                <div className="site-sub">MSU · 2026 Season</div>
              </div>
            </div>
            <div className="season-badge">2026</div>
          </div>
        </header>

        <nav className="nav">
          {NAV.map(n => (
            <button key={n.id} className={`nav-btn ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>

        {page === "home"   && <HomePage   games={games} batting={batting} pitching={pitching} />}
        {page === "roster" && <RosterPage batting={batting} pitching={pitching} />}
        {page === "games"  && <GamesPage  games={games} />}
      </div>
    </>
  );
}
