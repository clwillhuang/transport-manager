import express from "express";
import { economyGETOneEconomy, economyGETPacks } from "../controllers/economyController";

const economyRouter = express.Router();

economyRouter.get('/all', economyGETPacks);

economyRouter.get('/one', economyGETOneEconomy);

export default economyRouter;