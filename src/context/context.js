import react, { useState } from "react";

// const records = JSON.parse(localStorage.getItem("Data"));
const records = [
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
    notes: "hellojhdsfgj",
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

export const userContext = react.createContext(records);

export default function ProviderComponent({ children }) {
  const [data, setData] = useState(records);
  const [globalGroupBy, setGlobalGroupBy] = useState("");
  return (
    <userContext.Provider value={{ data, setData }}>
      {children}
    </userContext.Provider>
  );
}
