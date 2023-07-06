export interface Account {
  name: string;
  category: string;
  tags: string[];
  balance: number;
  availableBalance: number;
}

export enum ChangeDirection {
  Increase = 'increase',
  Decrease = 'decrease',
  NoChange = 'no-change'
}

export interface AccountWithChange extends Account {
  changeDirection: ChangeDirection
}