function getError(res: Res, status: number, message: string) {
  if(process.env.NODE_ENV?.trim() === "dev") {
    console.error(`[\x1b[31mERROR\x1b[0m] \x1b[30m\x1b[1m${new Date().toLocaleTimeString()}\x1b[0m ${message}`);
  };

  return res.status(status).json({
    message,
  } as Err);
};

export { getError };