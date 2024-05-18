import express from "express";
import stationRouter from "./stationRoutes";
import cargoRouter from "./cargoRoutes";
import companyRouter from "./companyRoutes";
import industryRouter from "./industryRoutes";
import industryTypeRouter from "./industryTypeRoutes";
import townRouter from "./townRoutes";
import circleRouter from "./circleRoutes";
import signRouter from "./signRoutes";
import { economySetVersion } from "../controllers/economyController";

const dataRouter = express.Router();

dataRouter.use('/cargoes', cargoRouter)
dataRouter.use('/companies', companyRouter)
dataRouter.use('/industries', industryRouter)
dataRouter.use('/industrytypes', industryTypeRouter)
dataRouter.use('/stations', stationRouter)
dataRouter.use('/towns', townRouter)
dataRouter.use('/circles', circleRouter)
dataRouter.use('/signs', signRouter)
dataRouter.post('/economy', economySetVersion)

export default dataRouter;