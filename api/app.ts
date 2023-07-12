import * as bodyParser from "body-parser";
import express from "express";
import Routes from "./services/routes";

class App {
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
    this.express.get("/", (req, res, next) => {
      res.send("Typescript App works!!");
    });

    console.log("sup");
    this.express.use("/api", Routes);

    this.express.get("/payouts", (req, res, next) => {
      res.send("Typescriptdsfgsdg App works!!");
    });

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
