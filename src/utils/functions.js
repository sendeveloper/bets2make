import React from 'react';
import { TreeNode } from 'rc-tree';

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
