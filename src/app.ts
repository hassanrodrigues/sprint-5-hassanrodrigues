import "reflect-metadata";
import express from "express";
import "express-async-errors";
import userRouter from "./routes/users/users.routes";
import sessionRouter from "./routes/session/session.routes";
import categoriesRouter from "./routes/categories/categories.routes";
import propertiesRoutes from "./routes/properties/properties.routes";
import { handleErrorMiddleware } from "./middlewares/erro.middleware";
import schudelesRoutes from "./routes/schedules/schedules.routes";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRouter);
app.use("/properties", propertiesRoutes)
app.use("/schedules", schudelesRoutes)

app.use(handleErrorMiddleware);
export default app;
