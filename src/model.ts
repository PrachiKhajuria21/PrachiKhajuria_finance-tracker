export type InitialStateType = {
    date:string;
    month:string;
    transactionType: string;
    fromAccount: string;
    toAccount : string;
    amount:number;
    receipt:string;
    id:number;
    notes:string
  }

  export type sortt = keyof InitialStateType ;

  