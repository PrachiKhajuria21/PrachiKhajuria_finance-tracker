import react, { useState } from "react";

// const records = JSON.parse(localStorage.getItem("Data"));
const records = [
  {
    date: "01-12-2023",
    month: "april",
    transactionType: "Home Expense",
    fromAccount : "Personal Account",
    toAccount : "My Dream Home",
    amount : 10,
    receipt : "",
    id:Date.now(),
    notes:"hello"

  },
  {
    date: "3-12-2023",
    month: "may",
    transactionType: "Personal Expense",
    fromAccount : "Personal Account",
    toAccount : "Real Living",
    amount : 100,
    receipt : "",
    id:Date.now(),
    notes:"helloMY"

  },
  {
    date: "11-12-2023",
    month: "april",
    transactionType: "Income",
    fromAccount : "Full Circle",
    toAccount : "Core Realtors",
    amount : 1000,
    receipt : "",
    id:Date.now(),
    notes:"hellojhdsfgj"

  },
  {
    date: "01-2-2022",
    month: "march",
    transactionType: "Home Expense",
    fromAccount : "Personal Account",
    toAccount : "Full Circle",
    amount : 560,
    receipt : "",
    id:Date.now(),
    notes:"prachi here"

  },
];

export const userContext = react.createContext(records);

export default function ProviderComponent({ children }) {
  const [data, setData] = useState(records);
  return (
    <userContext.Provider value={{ data, setData }}>
      {children}
    </userContext.Provider>
  );
}
