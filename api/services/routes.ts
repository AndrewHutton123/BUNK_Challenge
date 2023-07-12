import * as bodyParser from "body-parser";
import express from "express";
import ExpenseService from "./expense.service";

class Routes {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.use("/", ExpenseService);
  }
}

export default new Routes().express;
