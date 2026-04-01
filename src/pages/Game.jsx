import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { ScrollText, Shield, Backpack, ChevronRight, Terminal, Sword, Activity, ShoppingBag, Zap, Droplet, PlusCircle, Box, Key } from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────
const VIEW_RADIUS = 5;
const HORIZONTAL_OFFSET = 2;
const HIDE_SCROLLBAR = "overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const SHOP_ITEMS = [
  { id: "potion",   label: "Health Potion",   desc: "Restores 10 HP in combat",          cost: 75,  icon: "flask"  },
  { id: "weapon",   label: "Upgraded Weapon", desc: "+2 Attack permanently",             cost: 150, icon: "sword"  },
  { id: "mega_pot", label: "Mega Potion",      desc: "Restores 25 HP in combat",          cost: 175, icon: "pill"   },
  { id: "armor",    label: "Armour",           desc: "+2 Defense (reduces damage taken)", cost: 200, icon: "shield" },
  { id: "key",      label: "Boss Room Key",    desc: "Unlocks the door to THE_FINAL_BOSS_HR", cost: 1000, icon: "key" },
];

function getRandomEmptyCell(grid, exclude = []) {
  const rows = grid.length;
  const cols = grid[0].length;
  let attempts = 0;
  while (attempts < 500) {
    const rx = Math.floor(Math.random() * cols);
    const ry = Math.floor(Math.random() * rows);
    const isExcluded = exclude.some(([ex, ey]) => ex === rx && ey === ry);
    if (grid[ry][rx] === "." && !isExcluded) return [rx, ry];
    attempts++;
  }
  return [5, 5];
}

function generateMap() {
  const rows = 40;
  const cols = 40;
  const grid = Array.from({ length: rows }, () => Array(cols).fill("."));

  // Terrain
  for (let i = 0; i < 150; i++) {
    const rx = Math.floor(Math.random() * cols);
    const ry = Math.floor(Math.random() * rows);
    if (rx !== 20 && ry !== 20) grid[ry][rx] = Math.random() > 0.5 ? "~" : "#";
  }

  // Chests
  for (let i = 0; i < 10; i++) {
    const [rx, ry] = getRandomEmptyCell(grid, [[20, 20]]);
    grid[ry][rx] = "$";
  }

  // Potions
  for (let i = 0; i < 5; i++) {
    const [rx, ry] = getRandomEmptyCell(grid, [[20, 20]]);
    grid[ry][rx] = "P";
  }

  // Shop
  const [sx, sy] = getRandomEmptyCell(grid, [[20, 20]]);
  grid[sy][sx] = "S";

  // Place boss room
  const bossRoom = placeBossRoom(grid);

  return {
    grid: bossRoom.grid,
    shopPos: [sx, sy],
    doorPos: bossRoom.doorPos,
    bossPos: bossRoom.bossPos,
  };
}

function placeBossRoom(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const roomSize = 3;
  const padding = 2;

  let attempts = 0;

  while (attempts < 200) {
    const startX = Math.floor(Math.random() * (cols - roomSize - padding));
    const startY = Math.floor(Math.random() * (rows - roomSize - padding));

    // Check if area is empty
    let valid = true;
    for (let y = 0; y < roomSize; y++) {
      for (let x = 0; x < roomSize; x++) {
        if (grid[startY + y][startX + x] !== ".") {
          valid = false;
          break;
        }
      }
      if (!valid) break;
    }

    if (!valid) {
      attempts++;
      continue;
    }

    // Build walls + floor
    for (let y = 0; y < roomSize; y++) {
      for (let x = 0; x < roomSize; x++) {
        const isEdge =
          y === 0 ||
          y === roomSize - 1 ||
          x === 0 ||
          x === roomSize - 1;

        grid[startY + y][startX + x] = isEdge ? "#" : ".";
      }
    }

    // Place door (center of a random wall)
    const doorSide = Math.floor(Math.random() * 4);

    let doorX, doorY;
    const mid = Math.floor(roomSize / 2);

    if (doorSide === 0) { // top
      doorX = startX + mid;
      doorY = startY;
    } else if (doorSide === 1) { // bottom
      doorX = startX + mid;
      doorY = startY + roomSize - 1;
    } else if (doorSide === 2) { // left
      doorX = startX;
      doorY = startY + mid;
    } else { // right
      doorX = startX + roomSize - 1;
      doorY = startY + mid;
    }

    grid[doorY][doorX] = "D";

    // Place boss in center
    const bossX = startX + mid;
    const bossY = startY + mid;
    grid[bossY][bossX] = "B";

    return {
      grid,
      doorPos: [doorX, doorY],
      bossPos: [bossX, bossY],
    };
  }

  // fallback (rare)
  return {
    grid,
    doorPos: [5, 5],
    bossPos: [6, 6],
  };
}

function ShopIcon({ icon }) {
  switch (icon) {
    case "flask":  return <Droplet    size={20} className="text-teal-400" />;
    case "sword":  return <Zap        size={20} className="text-red-400" />;
    case "shield": return <Shield     size={20} className="text-blue-400" />;
    case "pill":   return <PlusCircle size={20} className="text-purple-400" />;
    case "key":    return <Key        size={20} className="text-yellow-400" />;
    default:       return <Box        size={20} className="text-white/70" />;
  }
}

const INITIAL_STATE = () => {
  const { grid, shopPos, doorPos, bossPos } = generateMap();
  return {
    grid,
    shopPos,
    doorPos,
    bossPos,
    player: { x: 20, y: 20, hp: 20, maxHp: 20, attack: 5, defense: 0, credits: 0, xp: 0, level: 1, xpToNext: 100 },
    inventory: [],
    log: ["Neural link established...", "Goal: Find the Boss Room Key, then find the Boss."],
    combatEnemy: null,
    isCombatOpen: false,
    combatLog: [],
    gameVictory: false,
    gameOver: false,
    isShopOpen: false,
  };
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function GamePage() {
  const BG_IMAGE = "/images/star.jpg";
  const gameGridRef = useRef(null);

  const [state, setState] = useState(INITIAL_STATE);

  const { grid: mapGrid, player, inventory, log, combatEnemy, isCombatOpen,
          combatLog, gameVictory, gameOver, isShopOpen, doorPos, bossPos } = state;

  const resetGame = useCallback(() => setState(INITIAL_STATE()), []);

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const addLog = useCallback((msg) => {
    setState(prev => {
      if (prev.log[0] === msg) return prev;
      return { ...prev, log: [msg, ...prev.log].slice(0, 15) };
    });
  }, []);

  const setMapGrid = useCallback((updater) => {
    setState(prev => ({ ...prev, grid: typeof updater === "function" ? updater(prev.grid) : updater }));
  }, []);

  // ─── Shop ──────────────────────────────────────────────────────────────────
  const handleBuy = useCallback((item) => {
    setState(prev => {
      if (prev.player.credits < item.cost) {
        return { ...prev, log: [`Insufficient credits for ${item.label}.`, ...prev.log].slice(0, 15) };
      }
      let updatedPlayer = { ...prev.player, credits: prev.player.credits - item.cost };
      let updatedInventory = [...prev.inventory];
      let msg = "";

      if (item.id === "weapon")   { updatedPlayer.attack  += 2; msg = "Purchased Upgraded Weapon! Attack +2."; }
      else if (item.id === "armor")    { updatedPlayer.defense += 2; msg = "Purchased Armour! Defense +2."; }
      else if (item.id === "potion")   { updatedInventory.push("Potion");      msg = "Purchased Health Potion!"; }
      else if (item.id === "mega_pot") { updatedInventory.push("Mega Potion"); msg = "Purchased Mega Potion!"; }
      else if (item.id === "key")      { updatedInventory.push("Boss Key");    msg = "Boss Room Key acquired! Find the door marked [D]."; }

      return { ...prev, player: updatedPlayer, inventory: updatedInventory, log: [msg, ...prev.log].slice(0, 15) };
    });
  }, []);

  // ─── Combat ────────────────────────────────────────────────────────────────
  const triggerEncounter = useCallback((isBoss = false) => {
    const enemies = [
      { name: "Ghosted_Application", hp: 10, maxHp: 10, attack: 2 },
      { name: "Technical_Assessment", hp: 15, maxHp: 15, attack: 3 },
      { name: "Unpaid_Trial_Task",    hp: 8,  maxHp: 8,  attack: 4 },
    ];
    const enemy = isBoss
      ? { name: "THE_FINAL_BOSS_HR", hp: 50, maxHp: 50, attack: 8 }
      : enemies[Math.floor(Math.random() * enemies.length)];

    setState(prev => ({
      ...prev,
      combatEnemy: enemy,
      isCombatOpen: true,
      combatLog: [],
      log: [`CRITICAL: ${enemy.name} intercepted your connection!`, ...prev.log].slice(0, 15),
    }));
  }, []);

  const handleAttack = useCallback(() => {
    setState(prev => {
      if (!prev.combatEnemy) return prev;
      const { combatEnemy, player, combatLog, log } = prev;

      const dmgToEnemy = player.attack + Math.floor(Math.random() * 3);
      const newEnemyHp = Math.max(0, combatEnemy.hp - dmgToEnemy);
      const newCombatLog = [...combatLog, `You attack for ${dmgToEnemy} damage!`];

      if (newEnemyHp <= 0) {
        const isBoss = combatEnemy.name === "THE_FINAL_BOSS_HR";
        const creditReward = isBoss ? 500 : Math.floor(Math.random() * 90) + 10;
        const xpReward = isBoss ? 300 : Math.floor(combatEnemy.maxHp * 2) + 10;
        const levelUps = [];
        let nextXp = player.xp + xpReward;
        let nextLevel = player.level;
        let nextXpToNext = player.xpToNext;
        let nextMaxHp = player.maxHp;
        let nextAttack = player.attack;

        while (nextXp >= nextXpToNext) {
          nextXp -= nextXpToNext;
          nextLevel++;
          nextMaxHp += 5;
          nextAttack++;
          nextXpToNext = Math.floor(nextXpToNext * 1.25);
          levelUps.push(nextLevel);
        }

        const victoryLog = [
          ...newCombatLog,
          `Victory! ${combatEnemy.name} defeated!`,
          `Gained ${xpReward} XP!`,
          ...levelUps.map(l => `Level Up! Reached level ${l}.`),
        ];

        const newLog = [
          `Victory! ${combatEnemy.name} deleted. +${creditReward} credits!`,
          ...(levelUps.length ? [`LEVEL UP: Level ${nextLevel}! +5 HP, +1 ATK.`] : []),
          ...log,
        ].slice(0, 15);

        let newGrid = prev.grid;
        let victory = prev.gameVictory;
        if (isBoss) {
          newGrid = prev.grid.map(r => [...r]);
          newGrid[bossPos[1]][bossPos[0]] = ".";
          victory = true;
        }

        return {
          ...prev,
          grid: newGrid,
          gameVictory: victory,
          isCombatOpen: false,
          combatEnemy: null,
          combatLog: victoryLog,
          log: victory ? ["OBJECTIVE COMPLETE: Job secured!", ...newLog].slice(0, 15) : newLog,
          player: {
            ...player,
            credits:  player.credits + creditReward,
            xp:       nextXp,
            level:    nextLevel,
            xpToNext: nextXpToNext,
            maxHp:    nextMaxHp,
            attack:   nextAttack,
            hp:       Math.min(player.hp + levelUps.length * 5, nextMaxHp),
          },
        };
      }

      // Enemy attacks
      const rawDmg = combatEnemy.attack + Math.floor(Math.random() * 2);
      const dmgToPlayer = Math.max(1, rawDmg - player.defense);
      const blocked = rawDmg - dmgToPlayer;
      const newPlayerHp = Math.max(0, player.hp - dmgToPlayer);
      const afterCombatLog = [...newCombatLog, `${combatEnemy.name} attacks for ${dmgToPlayer} damage!${blocked > 0 ? ` (${blocked} blocked)` : ""}`];

      if (newPlayerHp <= 0) {
        return {
          ...prev,
          isCombatOpen: false,
          combatEnemy: null,
          combatLog: [...afterCombatLog, "System failure! You were defeated."],
          gameOver: true,
          player: { ...player, hp: 0 },
          log: ["SYSTEM FAILURE: You were ghosted by the industry.", ...log].slice(0, 15),
        };
      }

      return {
        ...prev,
        combatEnemy: { ...combatEnemy, hp: newEnemyHp },
        player: { ...player, hp: newPlayerHp },
        combatLog: afterCombatLog,
      };
    });
  }, [bossPos]);

  const handleUsePotion = useCallback((type = "Potion") => {
    const healAmt = type === "Mega Potion" ? 25 : 10;
    setState(prev => {
      const index = prev.inventory.indexOf(type);
      if (index === -1) return prev;
      const newInv = [...prev.inventory];
      newInv.splice(index, 1);
      return {
        ...prev,
        inventory: newInv,
        player: { ...prev.player, hp: Math.min(prev.player.hp + healAmt, prev.player.maxHp) },
        combatLog: [...prev.combatLog, `You use a ${type}! HP +${healAmt}.`],
        log: [`${type} used! HP +${healAmt}.`, ...prev.log].slice(0, 15),
      };
    });
  }, []);

  // ─── Movement ──────────────────────────────────────────────────────────────
  const itemCounts = useMemo(() => {
    const counts = {};
    inventory.forEach(item => { counts[item] = (counts[item] || 0) + 1; });
    return counts;
  }, [inventory]);

  const { visibleRows, startX, startY, vWidth, vHeight } = useMemo(() => {
    const height = VIEW_RADIUS * 2 + 1;
    const width  = VIEW_RADIUS * 2 + 1 + HORIZONTAL_OFFSET * 2;
    const sY = Math.max(0, Math.min(mapGrid.length    - height, player.y - VIEW_RADIUS));
    const sX = Math.max(0, Math.min(mapGrid[0].length - width,  player.x - (VIEW_RADIUS + HORIZONTAL_OFFSET)));
    return {
      visibleRows: mapGrid.slice(sY, sY + height).map(row => row.slice(sX, sX + width)),
      startX: sX, startY: sY, vWidth: width, vHeight: height,
    };
  }, [player.x, player.y, mapGrid]);

  const movePlayer = useCallback((dx, dy) => {
    setState(prev => {
      if (prev.isCombatOpen || prev.isShopOpen) return prev;
      const newX = prev.player.x + dx;
      const newY = prev.player.y + dy;
      if (newY < 0 || newY >= prev.grid.length || newX < 0 || newX >= prev.grid[0].length) return prev;
      const terrain = prev.grid[newY][newX];

      if (terrain === "~" || terrain === "#") {
        return { ...prev, log: [`Collision: ${terrain === "#" ? "Firewall" : "Network_Stream"} blocked.`, ...prev.log].slice(0, 15) };
      }

      if (terrain === "B") {
        // Boss — should only be reachable through door but just in case
        const enemies = [{ name: "THE_FINAL_BOSS_HR", hp: 50, maxHp: 50, attack: 8 }];
        return {
          ...prev,
          combatEnemy: enemies[0],
          isCombatOpen: true,
          combatLog: [],
          log: ["CRITICAL: THE_FINAL_BOSS_HR intercepted your connection!", ...prev.log].slice(0, 15),
        };
      }

      if (terrain === "D") {
        // Boss room door — requires key
        if (!prev.inventory.includes("Boss Key")) {
          return { ...prev, log: ["The door is locked. Find the Boss Room Key at the Shop.", ...prev.log].slice(0, 15) };
        }
        const newInv = [...prev.inventory];
        newInv.splice(newInv.indexOf("Boss Key"), 1);
        const newGrid = prev.grid.map(r => [...r]);
        newGrid[newY][newX] = ".";
        return {
          ...prev,
          grid: newGrid,
          inventory: newInv,
          player: { ...prev.player, x: newX, y: newY },
          log: ["Key used! The boss room door swings open...", ...prev.log].slice(0, 15),
        };
      }

      if (terrain === "S") {
        return { ...prev, isShopOpen: true, log: ["You found the Black Market Shop!", ...prev.log].slice(0, 15) };
      }

      // Random encounter — lowered to 5%
      let nextState = { ...prev, player: { ...prev.player, x: newX, y: newY } };

      if (terrain === "P") {
        const newGrid = prev.grid.map(r => [...r]);
        newGrid[newY][newX] = ".";
        return { ...nextState, grid: newGrid, inventory: [...prev.inventory, "Potion"], log: ["Found potion!", ...prev.log].slice(0, 15) };
      }

      if (terrain === "$") {
        const reward = Math.floor(Math.random() * 90) + 10;
        const newGrid = prev.grid.map(r => [...r]);
        newGrid[newY][newX] = ".";
        return {
          ...nextState,
          grid: newGrid,
          player: { ...nextState.player, credits: prev.player.credits + reward },
          log: [`Opened chest! +${reward} credits.`, ...prev.log].slice(0, 15),
        };
      }

      if (Math.random() < 0.05) {
        const enemies = [
          { name: "Ghosted_Application", hp: 10, maxHp: 10, attack: 2 },
          { name: "Technical_Assessment", hp: 15, maxHp: 15, attack: 3 },
          { name: "Unpaid_Trial_Task",    hp: 8,  maxHp: 8,  attack: 4 },
        ];
        const enemy = enemies[Math.floor(Math.random() * enemies.length)];
        return {
          ...nextState,
          combatEnemy: enemy,
          isCombatOpen: true,
          combatLog: [],
          log: [`CRITICAL: ${enemy.name} intercepted!`, ...prev.log].slice(0, 15),
        };
      }

      return nextState;
    });
  }, []);

  const handleGridClick = useCallback((e) => {
    if (!gameGridRef.current || isCombatOpen || isShopOpen) return;
    const gridDiv = gameGridRef.current.querySelector(".grid-container");
    const rect = gridDiv.getBoundingClientRect();
    const targetX = startX + Math.floor((e.clientX - rect.left) / (rect.width  / vWidth));
    const targetY = startY + Math.floor((e.clientY - rect.top)  / (rect.height / vHeight));
    const dx = targetX - player.x;
    const dy = targetY - player.y;
    if (Math.abs(dx) > Math.abs(dy)) movePlayer(dx > 0 ? 1 : -1, 0);
    else if (dy !== 0) movePlayer(0, dy > 0 ? 1 : -1);
  }, [isCombatOpen, isShopOpen, startX, startY, vWidth, vHeight, player.x, player.y, movePlayer]);

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase();
      if (key === "escape") { setState(prev => ({ ...prev, isShopOpen: false })); return; }
      if (key === "w") movePlayer(0, -1);
      if (key === "s") movePlayer(0,  1);
      if (key === "a") movePlayer(-1, 0);
      if (key === "d") movePlayer( 1, 0);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [movePlayer]);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative min-h-screen overflow-hidden pt-24 pb-16 text-white font-mono touch-manipulation"
      style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f1e]/95 via-[#0f2e2a]/90 to-teal-900/80" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      {/* ── VICTORY ── */}
      {gameVictory && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-2xl p-6">
          <div className="max-w-lg w-full bg-green-500/15 border border-emerald-300/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-black/40 text-center">
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-emerald-300 mb-4">Job Offer Accepted</h1>
            <p className="text-sm text-white/70 mb-6">You conquered THE_FINAL_BOSS_HR and secured the job. Congratulations!</p>
            <button onClick={resetGame} className="px-6 py-3 rounded-full bg-teal-400 text-[#0b1f1e] font-semibold text-sm hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20">
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* ── GAME OVER ── */}
      {gameOver && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-6">
          <div className="max-w-lg w-full bg-red-500/10 border border-red-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-black/40 text-center">
            <p className="text-red-400 text-xs tracking-[0.3em] uppercase font-mono mb-3">Connection Lost</p>
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-red-300 mb-4">Game Over</h1>
            <p className="text-white/50 text-sm mb-2">You were ghosted by the industry.</p>
            <p className="text-white/30 text-xs font-mono mb-8">
              Reached level <span className="text-teal-300">{player.level}</span> · Earned <span className="text-yellow-400">{player.credits}</span> credits
            </p>
            <button onClick={resetGame} className="px-6 py-3 rounded-full bg-red-400 text-[#1a0000] font-semibold text-sm hover:bg-red-300 transition-colors shadow-lg shadow-red-500/20">
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* ── SHOP ── */}
      {isShopOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-lg p-6">
          <div className="max-w-md w-full bg-white/5 border border-teal-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-black/40">
            <div className="text-center mb-6">
              <p className="text-yellow-400/80 text-xs tracking-[0.3em] uppercase mb-2 font-mono flex items-center justify-center gap-2">
                <ShoppingBag size={14} /> Black Market
              </p>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">Vendor_Node</h3>
              <p className="text-white/30 text-xs mt-1 font-mono">Balance: <span className="text-yellow-400">{player.credits} credits</span></p>
            </div>
            <div className="h-px bg-gradient-to-r from-teal-400/40 via-teal-400/10 to-transparent mb-6" />
            <div className="flex flex-col gap-3 mb-6">
              {SHOP_ITEMS.map((item) => (
                <div key={item.id} className={`flex items-center justify-between bg-black/30 border rounded-2xl px-4 py-3 transition-all ${item.id === "key" ? "border-yellow-500/30 hover:border-yellow-400/50" : "border-white/5 hover:border-teal-500/30"}`}>
                  <div className="flex items-center gap-3">
                    <ShopIcon icon={item.icon} />
                    <div>
                      <p className={`text-xs font-bold ${item.id === "key" ? "text-yellow-300" : "text-white/80"}`}>{item.label}</p>
                      <p className="text-white/30 text-[10px] font-mono">{item.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={player.credits < item.cost}
                    className={`ml-3 flex-shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                      item.id === "key"
                        ? "bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/30"
                        : "bg-teal-500/20 border border-teal-500/30 text-teal-300 hover:bg-teal-500/30"
                    }`}
                  >
                    {item.cost}¢
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setState(prev => ({ ...prev, isShopOpen: false }))} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 font-semibold text-sm hover:bg-white/10 transition-colors">
              Leave Shop
            </button>
            <p className="text-center text-[9px] text-white/20 mt-3 font-mono uppercase tracking-widest">Press ESC to close</p>
          </div>
        </div>
      )}

      {/* ── COMBAT ── */}
      {isCombatOpen && combatEnemy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-lg p-6">
          <div className="max-w-md w-full bg-white/5 border border-teal-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-black/40">
            <div className="text-center mb-6">
              <p className="text-red-400 text-xs tracking-[0.3em] uppercase mb-2 font-mono flex items-center justify-center gap-2">
                <Activity size={14} /> Threat Detected
              </p>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">{combatEnemy.name}</h3>
            </div>
            <div className="h-px bg-gradient-to-r from-teal-400/40 via-teal-400/10 to-transparent mb-6" />
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-2">Combat Log</p>
                <div className="h-32 bg-black/20 rounded-xl p-3 overflow-hidden text-[9px] text-white/70 space-y-1 border border-white/5">
                  {combatLog.slice(-8).reverse().map((msg, i) => <div key={i} className="leading-tight">{msg}</div>)}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] mb-1.5 uppercase text-white/40 font-mono">
                    <span>Target</span><span className="text-red-400">{combatEnemy.hp}/{combatEnemy.maxHp}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${(combatEnemy.hp / combatEnemy.maxHp) * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1.5 uppercase text-white/40 font-mono">
                    <span>You</span><span className="text-emerald-400">{player.hp}/{player.maxHp}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300" style={{ width: `${(player.hp / player.maxHp) * 100}%` }} />
                  </div>
                </div>
                {player.defense > 0 && <p className="text-[10px] text-teal-400/60 font-mono">🛡️ Defense: {player.defense}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={handleAttack} className="w-full py-3 rounded-xl bg-teal-400 text-[#0b1f1e] font-semibold text-sm hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2">
                <Sword size={15} /> Execute Strike
              </button>
              {inventory.includes("Mega Potion") && (
                <button onClick={() => handleUsePotion("Mega Potion")} className="w-full py-3 rounded-xl bg-white/5 border border-purple-500/30 text-purple-300 font-semibold text-sm hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2">
                  <Terminal size={15} /> Use Mega Potion (+25 HP)
                </button>
              )}
              {inventory.includes("Potion") && (
                <button onClick={() => handleUsePotion("Potion")} className="w-full py-3 rounded-xl bg-white/5 border border-red-500/30 text-red-300 font-semibold text-sm hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
                  <Terminal size={15} /> Use Potion (+10 HP)
                </button>
              )}
            </div>
            <p className="text-center text-[9px] text-white/20 mt-4 uppercase tracking-[0.2em] font-mono">Neural Link: Active</p>
          </div>
        </div>
      )}

      {/* ── MAIN ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-teal-300 tracking-[0.3em] uppercase text-xs mb-3 font-mono">Mini Game</p>
          <h1 className="font-['Playfair_Display'] text-5xl font-bold text-white mb-1">
            Job <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Hunt</span>
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-teal-400/60 to-transparent mt-4" />
        </div>

        <div className="rounded-3xl bg-white/5 border border-teal-500/20 backdrop-blur-xl shadow-2xl shadow-black/40 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LOG */}
            <section className="lg:col-span-3 flex flex-col rounded-2xl bg-black/40 border border-white/10 p-6 h-[460px]">
              <div className="flex items-center gap-2 text-teal-300 mb-4 border-b border-teal-500/10 pb-3 shrink-0">
                <ScrollText size={14} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Terminal_Log</span>
              </div>
              <div className={`flex-1 min-h-0 space-y-3 ${HIDE_SCROLLBAR}`}>
                {log.map((entry, i) => (
                  <p key={i} className={`text-xs leading-relaxed break-words ${i === 0 ? "text-emerald-300" : "text-white/20"}`}>
                    {i === 0 && <ChevronRight size={12} className="inline mr-1" />}{entry}
                  </p>
                ))}
              </div>
            </section>

            {/* VIEWPORT */}
            <section
              className="lg:col-span-6 rounded-2xl bg-black/60 border border-teal-500/30 flex items-center justify-center p-8 relative overflow-hidden h-[460px] cursor-crosshair"
              ref={gameGridRef}
              onClick={handleGridClick}
            >
              <div className="grid-container font-mono text-xl md:text-2xl lg:text-3xl leading-none tracking-[0.5em] text-emerald-500/60 select-none px-12">
                {visibleRows.map((row, y) => (
                  <div key={y} className="flex justify-center h-[1.2em]">
                    {row.map((char, x) => {
                      const isPlayer = (startX + x) === player.x && (startY + y) === player.y;
                      const isBoss   = char === "B";
                      const isShop   = char === "S";
                      const isDoor   = char === "D";
                      const isChest  = char === "$";
                      const isPotion = char === "P";
                      return (
                        <span key={x} className={
                          isPlayer ? "text-white scale-125 font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] z-10"
                          : isBoss  ? "text-red-500 animate-pulse font-black"
                          : isShop  ? "text-green-400 font-bold animate-pulse"
                          : isDoor  ? "text-green-400 font-bold animate-pulse"
                          : isChest ? "text-green-400 font-bold animate-pulse"
                          : isPotion? "text-green-400 font-bold animate-pulse"
                          : "opacity-60"
                        }>
                          {isPlayer ? "@" : isBoss ? "Ω" : isShop ? "⌂" : char}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </section>

            {/* STATS */}
            <section className="lg:col-span-3 flex flex-col gap-3 h-[460px]">
              <div className="rounded-2xl bg-black/40 border border-white/10 p-4 shrink-0">
                <div className="flex items-center gap-2 text-teal-300 mb-3 uppercase text-[10px] tracking-widest font-bold">
                  <Shield size={14} /> System_Health
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-white/30 uppercase">Integrity</span>
                    <span className={player.hp < 10 ? "text-red-400" : "text-emerald-400"}>{player.hp}/{player.maxHp}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-600 to-emerald-400 transition-all duration-500" style={{ width: `${(player.hp / player.maxHp) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-white/30 uppercase">Level</span>
                    <span className="text-teal-300 font-bold">{player.level}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-white/30">XP</span>
                    <span className="text-yellow-300">{player.xp} / {player.xpToNext}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 transition-all duration-500" style={{ width: `${(player.xp / player.xpToNext) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-white/30 uppercase">Attack</span>
                    <span className="text-red-400 font-bold">{player.attack}</span>
                  </div>
                  {player.defense > 0 && (
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-white/30 uppercase">Defense</span>
                      <span className="text-blue-400 font-bold">{player.defense}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-black/40 border border-white/10 p-4 shrink-0">
                <div className="flex items-center gap-2 text-teal-300 mb-2 uppercase text-[10px] tracking-widest font-bold">
                  <Terminal size={14} /> Credits
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/30 text-[10px] font-mono uppercase">Balance</span>
                  <span className="text-yellow-400 font-bold text-lg">{player.credits}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-black/40 border border-white/10 p-4 flex-1 min-h-0 flex flex-col overflow-hidden">
                <div className="flex items-center gap-2 text-teal-300 mb-3 uppercase text-[10px] tracking-widest font-bold shrink-0">
                  <Backpack size={14} /> Inventory
                </div>
                <ul className={`space-y-2 flex-1 ${HIDE_SCROLLBAR}`}>
                  {Object.entries(itemCounts).length === 0 && (
                    <li className="text-white/20 text-[10px] font-mono italic">Empty</li>
                  )}
                  {Object.entries(itemCounts).map(([item, count]) => (
                    <li key={item} className={`flex items-center gap-3 text-[11px] font-mono ${
                      item === "Boss Key"    ? "text-yellow-400 font-bold"
                      : item === "Potion"   ? "text-red-400 font-bold"
                      : item === "Mega Potion" ? "text-purple-400 font-bold"
                      : "text-white/40"
                    }`}>
                      {item === "Boss Key" ? <Key size={12} className="text-yellow-400" /> : <Terminal size={12} className={item === "Potion" ? "text-red-400" : item === "Mega Potion" ? "text-purple-400" : "text-teal-700"} />}
                      {item}{count > 1 ? ` x${count}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-6 pt-5 border-t border-teal-500/10 text-[10px] text-white/30 text-center uppercase tracking-[0.3em] font-mono">
            Move: WASD or Click · S = ⌂ · D = Boss Door (needs key) · Ω = Boss
          </div>
        </div>
      </div>
    </div>
  );
}