import express from "express";
import { v4 as uuid } from "uuid";
import verifyIfExistsAccount from "./middlewares/verifyIfExistsAccount";
import { getBalance } from "./utils/balance";
import { getError } from "./utils/errors";

const routes = express.Router();
export const customers = [] as Account[];

routes.post("/account", (req: Req, res: Res) => {
  const { cpf, name } = req.body as Account;

  if(customers.some(c => c.cpf === cpf)){
    return getError(res, 400, "Account already exists");
  };

  customers.push({
    id: uuid(),
    cpf,
    name,
    statement: []
  });

  return res.status(201).send("Account created");
});

routes.get("/accounts", (req: Req, res: Res) => {
  return res.json(customers);
});

routes.use(verifyIfExistsAccount);

routes.get("/statement", (req: Req, res: Res) => {
  const { date } = req.query;
  const customer = req.customer;
  let statement = customer.statement;

  if(date){
    const dateFormatted = new Date(date + " 00:00").toDateString();
    statement = customer.statement.filter(s => s.created_at.toDateString() === dateFormatted)
  };
  
  return res.json(statement);
});

routes.post("/deposit", (req: Req, res: Res) => {
  const { description , amount } = req.body;
  const customer = req.customer;
  const statementOperation: StatementOperation = {
    description,
    amount: Number(amount),
    created_at: new Date(),
    type: "credit"
  };

  customer.statement.push(statementOperation);

  return res.status(201).send("Statement created");
});

routes.post("/withdraw", (req: Req, res: Res) => {
  const { amount } = req.body;
  const customer = req.customer;
  const balance = getBalance(customer.statement);
  
  if(balance < amount) {
    return getError(res, 400, "Insufficient funds")
  };

  const statementOperation: StatementOperation = {
    amount: Number(amount),
    created_at: new Date(),
    type: "debit"
  };

  customer.statement.push(statementOperation);

  return res.status(201).send("Statement created");
});

routes.put("/account", (req: Req, res: Res) => {
  const { name } = req.body;
  const customer = req.customer;
  customer.name = name;

  return res.send("Account updated");
});

routes.get("/account", (req: Req, res: Res) => {
  const customer = req.customer;
  return res.json(customer);
});

routes.delete("/account", (req: Req, res: Res) => {
  const customer = req.customer;
  const index = customers.findIndex(c => c.cpf === customer.cpf);
  customers.splice(index, 1);
  return res.send("Accountd deleted");
});

routes.get("/account/balance", (req: Req, res: Res) => {
  const customer = req.customer;
  return res.json({
    amount: getBalance(customer.statement)
  });
});

export default routes;