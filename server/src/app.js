import express from "express";
import cors from "cors";
import "./database";

//Middlewares
import transactionsMiddleware from "./middlewares/transactions";

//Routes
import routes from "./routes";
import routeValidator from "./middlewares/routeValidator";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(transactionsMiddleware);
  }

  routes() {
    this.server.use("/api", routes);
    this.server.use(routeValidator);
  }
}

export default new App().server;
