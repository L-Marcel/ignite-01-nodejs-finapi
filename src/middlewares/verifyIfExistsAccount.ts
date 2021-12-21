import { customers } from "../routes";
import { getError } from "../utils/errors";

export default function verifyIfExistsAccount(req: Req, res: Res, next: Next) {
  const { cpf } = req.headers;
  const customer = customers.find(c => c.cpf === cpf);

  if(!customer){
    return getError(res, 400, "Account not found");
  };

  req.customer = customer;

  return next();
};