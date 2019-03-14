export const LEAGUE = {
  title: 'Choose League:',
  type: 'select',
  data: [
    {
      value: 'NFL',
      key: 0
    },
    {
      value: 'NBA',
      key: 1
    },
    {
      value: 'NCAAF',
      key: 2
    },
    {
      value: 'MLB',
      key: 3
    },
    {
      value: 'SOCCER',
      key: 4
    },
    {
      value: 'NHL',
      key: 5
    }
  ]
};

export const BETTING_STYLE = {
  title: 'Betting Style',
  type: 'select',
  data: [
    {
      value: 'Spread',
      key: 0
    },
    {
      value: 'Over',
      key: 1
    },
    {
      value: 'Under',
      key: 2
    },
    {
      value: 'Moneyline',
      key: 3
    },
    {
      value: 'Best',
      key: 4
    }
  ]
};

export const NUMBER_OF_STRATEGY = {
  title: 'Number of strategies:',
  type: 'hex',
  data: {
    max: 500,
    min: 1,
    step: 1
  }
};

export const START_DATE = {
  title: 'StartDate',
  type: 'date',
  data: {}
};

export const END_DATE = {
  title: 'EndDate',
  type: 'date',
  data: {}
};

export const NUMBER_RULE_MIN = {
  title: 'Number of Rules(Min):',
  type: 'number',
  data: {
    max: 5,
    min: 1,
    step: 1
  }
};

export const NUMBER_RULE_MAX = {
  title: 'Number of Rules(Max):',
  type: 'number',
  data: {
    max: 5,
    min: 1,
    step: 1
  }
};

export const MIN_BETS = {
  title: 'Min Bets:',
  type: 'number',
  data: {
    max: 1000,
    min: 1,
    step: 1
  }
};

export const BET_AMOUNT = [
  {
    title: 'Bet Amount:',
    type: 'number',
    data: {
      max: 10000,
      min: 1,
      step: 10,
      value: 100
    }
  },
  {
    title: 'Bet %:',
    type: 'number',
    data: {
      max: 100,
      min: 1,
      step: 1,
      value: 2
    }
  },
  {
    title: 'Kelly Multiplier:',
    type: 'number',
    data: {
      max: 10,
      min: 1,
      step: 0.01,
      value: 1
    }
  }
];

export const SIZING_MODEL = {
  title: 'Bet Sizing Method:',
  type: 'select',
  data: [
    { value: 'Fixed $', key: 0 },
    { value: 'Fixed %', key: 1 },
    { value: 'Kelly', key: 2 }
  ]
};

export const STARTING_MONEY = {
  title: 'Starting Money:',
  type: 'number',
  data: {
    max: 1000000,
    min: 100,
    step: 10000
  }
};

export const TREE_DATA = [
  {
    key: 'A',
    title: 'A',
    children: [
      {
        key: 'Apple',
        title: 'Apple'
      },
      {
        key: 'Ace',
        title: 'Ace'
      }
    ]
  },
  {
    key: 'B',
    title: 'B',
    children: [
      {
        key: 'Boy',
        title: 'Boy'
      },
      {
        key: 'Busy',
        title: 'Busy'
      }
    ]
  },
  {
    key: 'C',
    title: 'C'
  },
  {
    key: 'D',
    title: 'D',
    children: [
      {
        key: 'Date',
        title: 'Date'
      },
      {
        key: 'Day',
        title: 'Day'
      }
    ]
  }
];
