import { API_URL } from './config';
import { TREE_DATA } from './constants';

function getYMD(date) {
  // eslint-disable-next-line
  return (
    date.getFullYear() +
    `0${date.getMonth() + 1}`.slice(-2) +
    `0${date.getDate()}`.slice(-2)
  );
}

function getRuleIDs(id, rules) {
  const ids = [];
  const data = TREE_DATA[id]
    .split('|')
    .join(';')
    .split(';');
  // eslint-disable-next-line
  rules.map(rule => {
    const pos = data.indexOf(rule);
    if (pos !== -1) {
      ids.push(pos);
    }
  });
  return ids.join(';');
}

export function getSimulationData(cfg, callback) {
  const url = API_URL.simulation;
  const startDate = new Date(cfg.strategyParameters.startDate);
  const endDate = new Date(cfg.strategyParameters.endDate);
  const startYMD = getYMD(startDate);
  const endYMD = getYMD(endDate);
  const ruleIDs = getRuleIDs(
    cfg.strategyParameters.gametype,
    cfg.selectedRules
  );
  const parameter =
    `strategy/${cfg.numStrategies}/` +
    `minrule/${cfg.minNumOfRules}/` +
    `maxrule/${cfg.maxNumOfRules}/` +
    `startdate/${startYMD}/` +
    `enddate/${endYMD}/` +
    `LeagueType/${cfg.strategyParameters.gametype}/` +
    `BetStyle/${cfg.strategyParameters.betStyle}/` +
    `MinBets/${cfg.minBets}/` +
    `SizingMethod/${cfg.strategyParameters.sizingMethod}/` +
    `SizingInput/${cfg.strategyParameters.sizingMethodParameter}/` +
    `PortfolioAmount/${cfg.strategyParameters.portfolioAmount}/` +
    `CheckedLeagues/${ruleIDs}`;

  // eslint-disable-next-line
  fetch(url + parameter)
    .then(res => res.json())
    .then(
      result => {
        return callback(result);
      },
      error => {
        console.log('error', error);
      }
    );
}

export function getSimulationGraphData(strategyId, callback) {
  const url = API_URL.simulation;
  const parameter = `bestdata/strategyId/${strategyId}`;
  // eslint-disable-next-line
  fetch(url + parameter)
    .then(res => res.json())
    .then(
      result => {
        return callback(result);
      },
      error => {
        console.log('error', error);
      }
    );
}

export function getTonightData(strategyId, callback) {
  const url = API_URL.tonight;
  const parameter = `leaguetype/${strategyId}`;
  // eslint-disable-next-line
  fetch(url + parameter)
    .then(res => res.json())
    .then(
      result => {
        return callback(result);
      },
      error => {
        console.log('error', error);
      }
    );
}
