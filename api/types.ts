export type User = {
  name: string;
  amount: number;
};

export type Payout = {
  owes: string;
  owed: string;
  amount: number;
};

export type CalculatedExpenses = {
  total: number;
  equalShare: number;
  payout: Payout[];
};
