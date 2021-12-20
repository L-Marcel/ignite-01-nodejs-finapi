import express from "express";

const routes = express.Router();

routes.get("/", (req: Req, res: Res) => {
  return res.json({
    message: "Hello world!!!",
    create_at: new Date()
  });
});

export default routes;