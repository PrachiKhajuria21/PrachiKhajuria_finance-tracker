
import { InitialStateType } from "../../model";

export const records : InitialStateType[] = [
  {
    date: "2023-02-01",
    month: "april",
    transactionType: "Home Expense",
    fromAccount: "Personal Account",
    toAccount: "My Dream Home",
    amount: 10,
    receipt: "",
    id: 1,
    notes: "hello",
  },
  {
    date: "2023-12-07",
    month: "may",
    transactionType: "Personal Expense",
    fromAccount: "Personal Account",
    toAccount: "Real Living",
    amount: 100,
    receipt: "",
    id: 2,
    notes: "helloMY",
  },
  {
    date: "2023-04-11",
    month: "april",
    transactionType: "Income",
    fromAccount: "Full Circle",
    toAccount: "Core Realtors",
    amount: 1000,
    receipt: "",
    id: 3,
    notes: "hello all",
  },
  {
    date: "2023-07-10",
    month: "march",
    transactionType: "Home Expense",
    fromAccount: "Personal Account",
    toAccount: "Full Circle",
    amount: 560,
    receipt: "",
    id: 4,
    notes: "prachi here",
  },
];

export const userRecords = [
  {
    name: "prachi",
    userName: "Pra@123",
    email: "prachi@gmail.com",
    password: "Par@12354",
  },
  {
    name: "abhay",
    userName: "Abhy@123",
    email: "abhay@gmail.com",
    password: "Abhay@12354",
  },
  {
    name: "raj",
    userName: "Raj@123",
    email: "raj@gmail.com",
    password: "Raj@12354",
  },
];
