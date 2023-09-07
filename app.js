import express from "express";
import cors from "cors";
import "./src/database";

//Middlewares
import transactionsMiddleware from "./src/middlewares/transactions";

//Routes
import routes from "./src/routes";

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
    }
}

export default new App().server;
