function getBalance(statement: StatementOperation[]) {
  return statement.reduce((acc, operation) => {
    if(operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    };
  }, 0);
};

export { getBalance };