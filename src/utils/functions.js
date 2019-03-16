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
  let result;
  let wholeNum = 0;
  let frac;
  let deci = 0;
  const fracStr = fraction.toString();
  if (fracStr.search('/') >= 0) {
    if (fracStr.search('-') >= 0) {
      wholeNum = fracStr.split('-');
      // eslint-disable-next-line
      frac = wholeNum[1];
      wholeNum = parseInt(wholeNum, 10);
    } else {
      frac = fracStr;
    }
    if (fracStr.search('/') >= 0) {
      frac = frac.split('/');
      deci = parseInt(frac[0], 10) / parseInt(frac[1], 10);
    }
    result = wholeNum + deci;
  } else {
    result = parseFloat(fracStr);
  }
  return result;
};
