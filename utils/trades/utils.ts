import { Trade } from "@prisma/client";
import { NextApiRequest } from "next";
import subDays from "date-fns/subDays";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isToday from "date-fns/isToday";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";
import { format, utcToZonedTime } from "date-fns-tz";

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

export function calcProfitAmount(trades: Trade[]) {
  let profitAmount = 0;
  trades.map((trade) => {
    if (trade.status === "win" && trade.pnl != null) {
      profitAmount += trade.pnl;
    }
  });
  return profitAmount;
}

export function calcLossAmount(trades: Trade[]) {
  let lossAmount = 0;
  trades.map((trade) => {
    if (trade.status === "loss" && trade.pnl != null) {
      lossAmount += trade.pnl;
    }
  });
  return lossAmount;
}

export function calcPastDayTradesMade(trades: Trade[]) {
  const pastDayTradesMade: Trade[] = [];
  trades.map((trade) => {
    const tradeDate = new Date(trade.date);
    if (isToday(tradeDate)) {
      pastDayTradesMade.push(trade);
    }
  });
  return pastDayTradesMade;
}

export function calcPastWeekTradesMade(trades: Trade[]) {
  const pastWeekTradesMade: Trade[] = [];
  let startDay: Date = subDays(new Date(), 7);
  trades.map((trade) => {
    const tradeDate = new Date(trade.date);
    if (isAfter(tradeDate, startDay) && isBefore(tradeDate, new Date())) {
      pastWeekTradesMade.push(trade);
    }
  });
  return pastWeekTradesMade;
}

export function calcPastMonthTradesMade(trades: Trade[]) {
  const pastMonthTradesMade: Trade[] = [];
  let startDay: Date = subDays(new Date(), 30);
  trades.map((trade) => {
    const tradeDate = new Date(trade.date);
    if (isAfter(tradeDate, startDay) && isBefore(tradeDate, new Date())) {
      pastMonthTradesMade.push(trade);
    }
  });
  return pastMonthTradesMade;
}

export function calcPastQuarterTradesMade(trades: Trade[]) {
  const pastQuarterTradesMade: Trade[] = [];
  let startDay: Date = subDays(new Date(), 90);
  trades.map((trade) => {
    const tradeDate = new Date(trade.date);
    if (isAfter(tradeDate, startDay) && isBefore(tradeDate, new Date())) {
      pastQuarterTradesMade.push(trade);
    }
  });
  return pastQuarterTradesMade;
}

export function calcPastYearTradesMade(trades: Trade[]) {
  const pastYearTradesMade: Trade[] = [];
  let startDay: Date = subDays(new Date(), 365);
  trades.map((trade) => {
    const tradeDate = new Date(trade.date);
    if (isAfter(tradeDate, startDay) && isBefore(tradeDate, new Date())) {
      pastYearTradesMade.push(trade);
    }
  });
  return pastYearTradesMade;
}

export function formatDates(dates: Date[]) {
  const result: string[] = [];
  dates.map((date) => {
    result.push(format(utcToZonedTime(new Date(date), "UTC"), "LLL dd, yyyy"));
  });
  return result;
}

export function formatWeeks(dates: Date[]) {
  const result: string[] = [];
  dates.map((date) => {
    result.push(
      "Week of " + format(utcToZonedTime(new Date(date), "UTC"), "LLL dd, yyyy")
    );
  });
  return result;
}

export function formatMonths(dates: Date[]) {
  const result: string[] = [];
  dates.map((date) => {
    result.push(format(utcToZonedTime(new Date(date), "UTC"), "LLL yyyy"));
  });
  return result;
}

export function calcPastDaysInterval(date: Date, days: number) {
  let startDate: Date = subDays(date, days);
  const result = eachDayOfInterval({
    start: startDate,
    end: date,
  });
  return result;
}

export function calcPastWeeksInterval(date: Date, days: number) {
  let startDate: Date = subDays(date, days);
  const result = eachWeekOfInterval({
    start: startDate,
    end: date,
  });
  return result;
}

export function calcPastMonthsInterval(date: Date, days: number) {
  let startDate: Date = subDays(date, days);
  const result = eachMonthOfInterval({
    start: startDate,
    end: date,
  });
  return result;
}

export function calcAllTimeMonthsInterval(date: Date, firstTradeDate: Date) {
  const result = eachMonthOfInterval({
    start: new Date(firstTradeDate),
    end: date,
  });
  return result;
}

export function mapTradeMadeToDay(
  dates: Date[],
  trades: Trade[],
  status: string
) {
  const wins: number[] = [];
  dates.map((date) => {
    let winTrades = 0;
    const dateString = format(
      utcToZonedTime(new Date(date), "UTC"),
      "LLL dd, yyyy"
    );
    trades.map((trade) => {
      const tradeDateString = format(
        utcToZonedTime(new Date(trade.date), "UTC"),
        "LLL dd, yyyy"
      );
      if (dateString == tradeDateString && trade.status == status) {
        winTrades += 1;
      }
    });
    wins.push(winTrades);
  });
  return wins;
}

export function mapTradeMadeToWeek(
  dates: Date[],
  trades: Trade[],
  status: string
) {
  const wins: number[] = [];
  dates.map((date) => {
    let winTrades = 0;
    trades.map((trade) => {
      if (
        isSameWeek(date, new Date(trade.date)) &&
        trade.status == status
      ) {
        winTrades += 1;
      }
    });
    wins.push(winTrades);
  });
  return wins;
}

export function mapTradeMadeToMonth(
  dates: Date[],
  trades: Trade[],
  status: string
) {
  const wins: number[] = [];
  dates.map((date) => {
    let winTrades = 0;
    trades.map((trade) => {
      if (
        isSameMonth(date, new Date(trade.date)) &&
        trade.status == status
      ) {
        winTrades += 1;
      }
    });
    wins.push(winTrades);
  });
  return wins;
}

export function mapTradePnLToDay(dates: Date[], trades: Trade[]) {
  const pnl: number[] = [];
  let totalPnl = 0;
  dates.map((date) => {
    let tradePnl = 0;
    const dateString = format(
      utcToZonedTime(new Date(date), "UTC"),
      "LLL dd, yyyy"
    );
    trades.map((trade) => {
      const tradeDateString = format(
        utcToZonedTime(new Date(trade.date), "UTC"),
        "LLL dd, yyyy"
      );
      if (dateString == tradeDateString && trade.pnl != null) {
        tradePnl += trade.pnl;
      }
    });
    totalPnl += tradePnl;
    pnl.push(totalPnl);
  });
  return pnl;
}

export function mapTradePnLToWeek(dates: Date[], trades: Trade[]) {
  const pnl: number[] = [];
  let totalPnl = 0;
  dates.map((date) => {
    let tradePnl = 0;
    trades.map((trade) => {
      if (
        isSameWeek(date, new Date(trade.date)) &&
        trade.pnl != null
      ) {
        tradePnl += trade.pnl;
      }
    });
    totalPnl += tradePnl;
    pnl.push(totalPnl);
  });
  return pnl;
}

export function mapTradePnLToMonth(dates: Date[], trades: Trade[]) {
  const pnl: number[] = [];
  let totalPnl = 0;
  dates.map((date) => {
    let tradePnl = 0;
    trades.map((trade) => {
      if (
        isSameMonth(date, new Date(trade.date)) &&
        trade.pnl != null
      ) {
        tradePnl += trade.pnl;
      }
    });
    totalPnl += tradePnl;
    pnl.push(totalPnl);
  });
  return pnl;
}
