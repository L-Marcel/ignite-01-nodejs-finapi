declare module Express {
  interface Request {
      customer: Account;
  };
  interface Response {

  };
};

declare type Req = import("express").Request;
declare type Res = import("express").Response;
declare type Next = import("express").NextFunction;
declare type Err = { message: string; };

declare type Account = {
  id: string;
  cpf: string;
  name: string;
  statement: StatementOperation[];
};

declare type StatementOperation = {
  description?: string;
  amount: number;
  created_at: Date;
  type: "credit" | "debit";
};