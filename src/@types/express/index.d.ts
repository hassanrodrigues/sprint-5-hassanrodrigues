import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        //using email to types request user
        email?: string;
      };
    }
  }
}
