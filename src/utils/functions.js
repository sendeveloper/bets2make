import React from 'react';
import { TreeNode } from 'rc-tree';
import { BET_STYLE, SIZING_METHOD } from './constants';

export const loopTreeData = data => {
  const str = data.split('|');
  return str.map(item => {
    const itemArray = item.split(';');
    return (
      <TreeNode key={itemArray[0]} title={itemArray[0]}>
        {itemArray.map((each, index) => {
          return index === 0 ? null : <TreeNode key={each} title={each} />;
        })}
      </TreeNode>
    );
  });
};

export const convertFloatToFraction = fraction => {
  const gcd = function(a, b) {
    if (b < 0.0000001) return a;
    return gcd(b, Math.floor(a % b));
  };

  const len = fraction.toString().length - 2;

  let denominator = 10 ** len;
  let numerator = fraction * denominator;

  const divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;
  return `${Math.floor(numerator)}/${Math.floor(denominator)}`;
};

export const toDecimal = fraction => {
  try {
    const vals = fraction.split('/');
    const n1 = Number.parseFloat(vals[0]);
    const n2 = Number.parseFloat(vals[1]);
    return n1 / n2;
  } catch (e) {
    console.log('e', e);
    return 0;
  }
};

export const getEV = (style, valLine, valWin, valJuice, valPush) => {
  if (style === 'moneyline') {
    if (valLine === 0) {
      return 0;
    }

    if (valLine > 0) {
      return valWin * (100 * (valLine / 100)) - (1 - (valWin + valPush)) * 100;
    } else {
      return (
        valWin * (100 / (Math.abs(valLine) / 100)) -
        (1 - (valWin + valPush)) * 100
      );
    }
  } else {
    if (valJuice === 0) {
      return 0;
    }

    if (valJuice > 0) {
      return valWin * (100 * (valJuice / 100)) - (1 - (valWin + valPush)) * 100;
    } else {
      return (
        valWin * (100 / (Math.abs(valJuice) / 100)) -
        (1 - (valWin + valPush)) * 100
      );
    }
  }
};

export const initialStrategyParameters = () => {
  const obj = {};
  obj.startDate = null;
  obj.endDate = null;
  obj.betStyle = 0;
  obj.gameType = 0;
  obj.sizingMethod = 0;
  obj.sizingMethodParameter = 100;
  obj.portfolioAmount = 100000;
  return obj;
};

export const calcMaxMin = array => {
  if (array) {
    let max = array[0];
    let min = array[0];
    // eslint-disable-next-line
    array.map(each => {
      if (max < each) {
        max = each;
      }
      if (min > each) {
        min = each;
      }
    });
    return { max, min };
  } else {
    return { max: 0, min: 0 };
  }
};

export const monteDrawdown = (values, stepNum, num, accountSize) => {
  const drawdowns = [];
  const cumulativePoints = [];
  const distributionPoints = [];

  for (let i = 0; i < num; i += 1) {
    let sum = 0;
    let maxx = 0;
    let dd = 0;
    let mdd = 0;
    for (let j = 0; j < values.length; j += 1) {
      sum += values[Math.floor(Math.random() * values.length)];
      if (sum > maxx) {
        maxx = sum;
      }
      dd = maxx - sum;
      if (dd > mdd) {
        mdd = dd;
      }
    }
    const thisdd = (mdd * 100.0) / accountSize;
    drawdowns.push(thisdd);
  }

  let max = 0;
  let min = 10000000;

  for (let i = 0; i < drawdowns.length; i += 1) {
    if (drawdowns[i] > max) {
      max = drawdowns[i];
    }
    if (drawdowns[i] < min) {
      min = drawdowns[i];
    }
  }

  let step = (max - min) / stepNum;
  if (step === 0) {
    step = 0.1;
  }
  const Bins = [];
  for (let j = min; j <= max; j += step) {
    // bin bObj = new bin();
    const bObj = {
      count: 0,
      value: j
    };
    Bins.push(bObj);
  }

  for (let k = 0; k < drawdowns.length; k += 1) {
    for (let l = 1; l < Bins.length; l += 1) {
      if (
        (drawdowns[k] <= Bins[l].value && drawdowns[k] > Bins[l - 1].value) ||
        (l === 1 && drawdowns[k] <= Bins[l - 1].value) ||
        (l === Bins.length - 1 && drawdowns[k] > Bins[l].value)
      ) {
        Bins[l - 1].count += 1;
      }
    }
  }

  let counter = 0;
  for (let i = 0; i < Bins.length; i += 1) {
    counter += Bins[i].count;
    Bins[i].cdf = (counter * 100.0) / num;
  }
  for (let i = 0; i < Bins.length; i += 1) {
    distributionPoints.push({ X: Bins[i].value, Y: Bins[i].count });
    cumulativePoints.push({ X: Bins[i].value, Y: Bins[i].cdf });
  }
  return {
    distributionPoints,
    cumulativePoints
  };
};

export const getMatchingBets = (selectedRulesNames, cfg, matches) => {
  const bets = [];
  const selectedRules = selectedRulesNames.split(',');
  const ruleIndexes = [];
  // eslint-disable-next-line
  selectedRules.map(each => {
    const pos = cfg.rulesTitles.indexOf(each);
    if (pos !== -1) {
      ruleIndexes.push(pos);
    }
  });
  if (matches) {
    // eslint-disable-next-line
    matches.map(match => {
      let rulesMatch = true;
      // eslint-disable-next-line
      ruleIndexes.map(index => {
        if (match.signal[index] === 0) {
          rulesMatch = false;
        }
      });
      if (rulesMatch) {
        bets.push(match);
      }
    });
  }
  return bets;
};

export const addBet = (evCalculator, bet) => {
  const tempEV = JSON.parse(JSON.stringify(evCalculator));
  tempEV.totalGames += 1;
  if (tempEV.bet.MATCH_WON) {
    tempEV.wonGamesML += 1;
  }
  if (bet.PT === bet.PTA) {
    tempEV.pushML += 1;
  }
  tempEV.bets.push(bet);
  if (!Object.keys(tempEV.spreadTotalGames).includes(bet.SPREAD)) {
    tempEV.spreadTotalGames[bet.SPREAD] = 0;
  }
  tempEV.spreadTotalGames[bet.SPREAD] += 1;
  if (bet.SPREAD + bet.PT > bet.PTA) {
    if (!Object.keys(tempEV.spreadWon).includes(bet.SPREAD)) {
      tempEV.spreadWon[bet.SPREAD] = 0;
    }
    tempEV.spreadWon[bet.SPREAD] += 1;
  }
  if (bet.PTA === bet.SPREAD + bet.PT) {
    if (!Object.keys(tempEV.spreadPush).includes(bet.SPREAD)) {
      tempEV.spreadPush[bet.SPREAD] = 0;
    }
    tempEV.spreadPush[bet.SPREAD] += 1;
  }
  return tempEV;
};

const CalcEV = (style, valLine, valWin, valJuice, valPush) => {
  if (style === BET_STYLE.moneyline) {
    if (valLine === 0) return 0;
    if (valLine > 0)
      return valWin * (100 * (valLine / 100)) - (1 - (valWin + valPush)) * 100;
    else
      return (
        valWin * (100 / (Math.Abs(valLine) / 100)) -
        (1 - (valWin + valPush)) * 100
      );
  } else {
    if (valJuice === 0) return 0;

    if (valJuice > 0)
      return valWin * (100 * (valJuice / 100)) - (1 - (valWin + valPush)) * 100;
    else
      return (
        valWin * (100 / (Math.Abs(valJuice) / 100)) -
        (1 - (valWin + valPush)) * 100
      );
  }
};

export const getBestStyle = (evCalculator, bet) => {
  const {
    spreadWon,
    spreadTotalGames,
    spreadPush,
    wonGamesML,
    pushML,
    totalGames
  } = evCalculator;
  let wonGamesSpread = 0;
  let totalGamesSpread = 0;
  let pushSpread = 0;
  // eslint-disable-next-line
  spreadWon.map(each => {
    if (each.Key >= bet.SPREAD) {
      wonGamesSpread += each.Value;
    }
  });
  // eslint-disable-next-line
  spreadTotalGames.map(each => {
    if (each.Key >= bet.SPREAD) {
      totalGamesSpread += each.Value;
    }
  });
  // eslint-disable-next-line
  spreadPush.map(each => {
    if (each.Key >= bet.SPREAD) {
      pushSpread += each.Value;
    }
  });
  const divWonS =
    totalGamesSpread === 0 ? 0 : wonGamesSpread / totalGamesSpread;
  const divPushS = totalGamesSpread === 0 ? 0 : pushSpread / totalGamesSpread;
  const divWonM = totalGames === 0 ? 0 : wonGamesML / totalGames;
  const divPushM = totalGames === 0 ? 0 : pushML / totalGames;

  const evSpread = CalcEV(
    BET_STYLE.spread,
    bet.ML,
    divWonS,
    bet.SPREAD_VIG,
    divPushS
  );
  const evML = CalcEV(BET_STYLE.moneyline, bet.ML, divWonM, 0, divPushM);

  if (evSpread >= evML) {
    return BET_STYLE.spread;
  }
  return BET_STYLE.moneyline;
};

export const calcBetSize = (strategy, bet, portfolioSize, betStyle) => {
  let calculator = '0';

  switch (strategy.sizingMethod) {
    case SIZING_METHOD.FixedDollar:
      calculator = `$ ${strategy.sizingMethodParameter.toString()}`;
      return { ret: strategy.sizingMethodParameter, calculator };

    case SIZING_METHOD.FixedPercentage:
      calculator = `${strategy.sizingMethodParameter.toString()} %`;
      return {
        ret: (strategy.sizingMethodParameter * portfolioSize) / 100.0,
        calculator
      };

    case SIZING_METHOD.Kelly: {
      calculator = '0 %';

      // calculate kelly value
      let winPercent = 100.0 / (bet.ML + 100.0);
      if (bet.ML < 0)
        winPercent = Math.Abs(bet.ML) / (Math.Abs(bet.ML) + 100.0);

      // win value is always 1 except in moneyline
      let winValue = 2;
      if (betStyle === BET_STYLE.moneyline) {
        winValue = 1.0 / (bet.ML / -100.0) + 1;
        if (bet.ML > 0) winValue = bet.ML / 100.0 + 1;
      }

      const kelly =
        (winValue - 1) * winPercent - (1 - winPercent) / (winValue - 1);

      if (kelly <= 0) return { ret: 0, calculator };

      calculator = `${(kelly * strategy.sizingMethodParameter).toString()} %`;

      let portfolioBet = kelly * strategy.sizingMethodParameter * portfolioSize;
      if (portfolioBet < 1) {
        portfolioBet = 0;
        calculator = '0 %';
      }
      return { ret: portfolioBet, calculator };
    }
    default:
      break;
  }

  return { ret: 0, calculator };
};
