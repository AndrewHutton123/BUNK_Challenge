import express from "express";
import { Payout, User, CalculatedExpenses } from "../types";
import * as bodyParser from "body-parser";

class ExpenseService {
  public express: express.Application;

  public users: User[];
  public payouts: CalculatedExpenses;

  constructor() {
    this.express = express();
    this.routes();
    this.middleware();
    this.users = [];
    this.payouts = {
      total: 0,
      equalShare: 0,
      payout: [{ owes: "", owed: "", amount: 0 }],
    };
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.post("/payouts", (req, res, next) => {
      this.payouts = this.calculatePayout(req.body);
      console.log("triggered");
      res.json(this.payouts);
    });
  }

  calculatePayout(data: User[]): CalculatedExpenses {
    const total = data
      .map((expense) => expense.amount)
      .reduce((acc, curr) => acc + curr, 0);
    const equalShare = total / 2;
    const payouts: Payout[] = [];
    const totals: { [name: string]: number } = {};

    for (const name in totals) {
      const amount = totals[name] - equalShare;
      if (amount !== 0) {
        if (amount > 0) {
          payouts.push({ owes: name, owed: "everyone", amount });
        } else {
          for (const otherName in totals) {
            if (otherName !== name) {
              payouts.push({ owes: name, owed: otherName, amount: -amount });
            }
          }
        }
      }
    }

    return {
      total: total,
      equalShare,
      payout: payouts,
    };
  }
}

export default new ExpenseService().express;
