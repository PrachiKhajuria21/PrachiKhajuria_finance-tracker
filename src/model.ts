export type InitialStateType = {
  date: string;
  month: string;
  transactionType: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  receipt:  string;
  id: number;
  notes: string;
};
export type UserStateType = {
  namee: string;
  userName: string;
  email: string;
  password: string | number;
};
export type ErrorType = {
  namee: string;
  userName: string;
  email: string;
  password: string;
};
export type UserStateLoginType = {
  email: string;
  password: string;
};
export type ErrorLoginType = {
  email: string;
  password: string;
};

export type sortt = keyof InitialStateType;
