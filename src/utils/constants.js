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
    min: 1
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
    min: 1
  }
};

export const NUMBER_RULE_MAX = {
  title: 'Number of Rules(Max):',
  type: 'number',
  data: {
    max: 5,
    min: 1
  }
};
