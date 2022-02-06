import { Trade } from "@prisma/client";
import { NextApiRequest } from "next";

export function initializeTrade(req: NextApiRequest) {
  let {
    date,
    ticker,
    expiry,
    time,
    strike,
    strategy,
    quantity,
    entry,
    exit,
    premium,
    pnl,
    percent,
    status,
    notes,
  } = req.body;
  if (exit) {
    strike = parseFloat(strike);
    quantity = parseFloat(quantity);
    entry = parseFloat(entry);
    exit = parseFloat(exit);
    premium = calcPremium(quantity, entry);
    pnl = calcPnl(quantity, entry, exit);
    percent = calcPercent(entry, exit);
    status = calcStatus(exit, pnl);
  } else {
    strike = parseFloat(strike);
    quantity = parseFloat(quantity);
    entry = parseFloat(entry);
    exit = null;
    premium = calcPremium(quantity, entry);
    pnl = null;
    percent = null;
    status = calcStatus(exit, pnl);
  }
  let initializedTrade = {
    date: date,
    ticker: ticker,
    expiry: expiry,
    time: time,
    strike: strike,
    strategy: strategy,
    quantity: quantity,
    entry: entry,
    exit: exit,
    premium: premium,
    pnl: pnl,
    percent: percent,
    status: status,
    notes: notes,
  };
  return initializedTrade;
}

function calcPremium(quantity: number, entry: number) {
  return quantity * entry * 100;
}

function calcPnl(quantity: number, entry: number, exit: number) {
  return (exit - entry) * quantity * 100;
}

function calcPercent(entry: number, exit: number) {
  return ((exit - entry) / entry) * 100;
}

function calcStatus(exit: number, pnl: number) {
  if (exit != null) {
    if (pnl > 0) {
      return "win";
    } else if (pnl < 0) {
      return "loss";
    } else {
      return "tie";
    }
  } else {
    return "open";
  }
}

export function calcTotalPnL(trades: Trade[]) {
  let totalPnl = 0;
  trades.map((trade) => {
    if (trade.pnl != null) {
      totalPnl += trade.pnl;
    }
  });
  return totalPnl;
}

export function calcTotalTrades(trades: Trade[]) {
  const totalTrades = trades.length;
  return totalTrades;
}

export function calcWinPercentage(trades: Trade[]) {
  const totalWins = calcWinTrades(trades);
  const winPercentage = (totalWins / calcCloseTrades(trades)) * 100;
  return winPercentage;
}

export function calcAverageProfit(trades: Trade[]) {
  const totalPnl = calcTotalPnL(trades);
  const avgProfit = totalPnl / calcCloseTrades(trades);
  return avgProfit;
}

export function calcAverageProfitPercentage(trades: Trade[]) {
  let totalProfitPercentage = calcTotalProfitPercentage(trades);
  const avgProfitPercentage = totalProfitPercentage / calcCloseTrades(trades);
  return avgProfitPercentage;
}

export function calcAveragePremium(trades: Trade[]) {
  const totalPremium = calcTotalPremium(trades);
  const avgPremium = totalPremium / calcTotalTrades(trades);
  return avgPremium;
}

export function calcOpenTrades(trades: Trade[]) {
  let openTrades = 0;
  trades.map((trade) => {
    if (trade.status === "open") {
      openTrades++;
    }
  });
  return openTrades;
}

export function calcCloseTrades(trades: Trade[]) {
  let closeTrades =
    calcTieTrades(trades) + calcWinTrades(trades) + calcLossTrades(trades);
  return closeTrades;
}

export function calcWinTrades(trades: Trade[]) {
  let winTrades = 0;
  trades.map((trade) => {
    if (trade.status === "win") {
      winTrades++;
    }
  });
  return winTrades;
}

export function calcLossTrades(trades: Trade[]) {
  let lossTrades = 0;
  trades.map((trade) => {
    if (trade.status === "loss") {
      lossTrades++;
    }
  });
  return lossTrades;
}

export function calcTieTrades(trades: Trade[]) {
  let tieTrades = 0;
  trades.map((trade) => {
    if (trade.status === "tie") {
      tieTrades++;
    }
  });
  return tieTrades;
}
export function calcTotalPremium(trades: Trade[]) {
  let totalPremium = 0;
  trades.map((trade) => {
    if (trade.premium != null) {
      totalPremium += trade.premium;
    }
  });
  return totalPremium;
}

export function calcTotalProfitPercentage(trades: Trade[]) {
  let totalProfitPercentage = 0;
  trades.map((trade) => {
    if (trade.percent != null) {
      totalProfitPercentage += trade.percent;
    }
  });
  return totalProfitPercentage;
}
