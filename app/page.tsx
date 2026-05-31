'use client';

import React, { useState } from 'react';

interface PropBet {
  id: number;
  date: string;
  player: string;
  prop: string;
  stake: number;
  odds: number;
  result: 'Win' | 'Loss';
  profit: number;
}

export default function PlayerPropsValueTool() {
  const [bets, setBets] = useState<PropBet[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [winCount, setWinCount] = useState(0);

  const [player, setPlayer] = useState('');
  const [prop, setProp] = useState('');
  const [stake, setStake] = useState(2000);
  const [odds, setOdds] = useState(2.0);
  const [result, setResult] = useState<'Win' | 'Loss'>('Win');

  const logBet = () => {
    if (!player || !prop) return;

    const profit = result === 'Win' 
      ? Math.round(stake * (odds - 1)) 
      : -stake;

    const newBet: PropBet = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      player,
      prop,
      stake,
      odds,
      result,
      profit
    };

    const newBets = [newBet, ...bets];
    setBets(newBets);

    const newTotal = newBets.reduce((sum, bet) => sum + bet.profit, 0);
    setTotalProfit(newTotal);

    const newWins = newBets.filter(b => b.result === 'Win').length;
    setWinCount(newWins);

    setPlayer('');
    setProp('');
  };

  const deleteBet = (id: number) => {
    const updatedBets = bets.filter(b => b.id !== id);
    setBets(updatedBets);

    const newTotal = updatedBets.reduce((sum, bet) => sum + bet.profit, 0);
    setTotalProfit(newTotal);

    const newWins = updatedBets.filter(b => b.result === 'Win').length;
    setWinCount(newWins);
  };

  const winRate = bets.length > 0 ? ((winCount / bets.length) * 100).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="py-8">
          <h1 className="text-4xl font-bold text-emerald-400">Player Props Value Tool</h1>
          <p className="text-zinc-400 mt-2">Private • Personal Use Only</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="text-emerald-400 text-sm">TOTAL PROFIT</div>
            <div className="text-4xl font-semibold mt-2 text-white">₦{totalProfit}</div>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="text-emerald-400 text-sm">WIN RATE</div>
            <div className="text-4xl font-semibold mt-2">{winRate}%</div>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="text-emerald-400 text-sm">TOTAL BETS</div>
            <div className="text-4xl font-semibold mt-2">{bets.length}</div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 mb-8">
          <h2 className="text-xl font-semibold mb-5">Log New Bet</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">PLAYER NAME</label>
              <input 
                type="text" 
                value={player} 
                onChange={(e) => setPlayer(e.target.value)}
                placeholder="e.g. Victor Osimhen"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">PROP TYPE</label>
              <input 
                type="text" 
                value={prop} 
                onChange={(e) => setProp(e.target.value)}
                placeholder="e.g. Over 0.5 Goals"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">STAKE (₦)</label>
              <input 
                type="number" 
                value={stake} 
                onChange={(e) => setStake(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">ODDS</label>
              <input 
                type="number" 
                step="0.01" 
                value={odds} 
                onChange={(e) => setOdds(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">RESULT</label>
              <select 
                value={result} 
                onChange={(e) => setResult(e.target.value as 'Win' | 'Loss')}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3"
              >
                <option value="Win">Win</option>
                <option value="Loss">Loss</option>
              </select>
            </div>
          </div>

          <button 
            onClick={logBet}
            className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold text-lg"
          >
            LOG BET
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Bet History</h2>
          {bets.length === 0 ? (
            <div className="bg-zinc-900 rounded-3xl p-8 text-center text-zinc-400 border border-zinc-800">
              No bets logged yet.
            </div>
          ) : (
            <div className="space-y-3">
              {bets.map((bet) => (
                <div key={bet.id} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{bet.player} — {bet.prop}</div>
                    <div className="text-xs text-zinc-500">{bet.date} • ₦{bet.stake} @ {bet.odds}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={bet.result === 'Win' ? 'text-emerald-400' : 'text-red-400'}>
                      {bet.result} • ₦{bet.profit}
                    </div>
                    <button 
                      onClick={() => deleteBet(bet.id)}
                      className="text-xs px-3 py-1 bg-zinc-800 hover:bg-red-500/20 rounded-xl text-zinc-400 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center text-xs text-zinc-500 mt-12 pb-8">
          Private tool • For personal use only
        </div>
      </div>
    </div>
  );
}
