export function initializeTrade(req:any) {
    let { date, ticker, expiry, time, strike, strategy, quantity, entry, exit, premium, pnl, percent, status, notes } = req.body;

    if(!(exit.length > 0)){
        strike = parseFloat(strike);
        quantity = parseFloat(quantity);
        entry = parseFloat(entry);
        exit = null;
        premium = calcPremium(quantity, entry);
        pnl = null;
        percent = null;
        status = calcStatus(exit, pnl);
    }
    else {
        strike = parseFloat(strike);
        quantity = parseFloat(quantity);
        entry = parseFloat(entry);
        exit = parseFloat(exit);
        premium = calcPremium(quantity, entry);
        pnl = calcPnl(quantity, entry, exit);
        percent = calcPercent(entry, exit);
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
    }
    return initializedTrade;
  }

function calcPremium(quantity:number, entry:number) {
    return quantity * entry * 100
}

function calcPnl(quantity:number, entry:number, exit:number) {
    return (exit - entry) * quantity * 100
}

function calcPercent(entry:number, exit:number) {
    return (exit - entry)/entry*100
}

function calcStatus(exit:number, pnl:number) {
    if(exit) {
        if(pnl >= 0) {
            return "win"
        }
        else{
            return "lost"
        }
    }
    else{
        return "open"
    }
}