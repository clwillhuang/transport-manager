import { Router } from "express";
import { requestUpdateAll, cancelRequestAll, getFrequency, pollGS, requestAdminPollFactory, requestDataFactory, updateFrequency } from "../controllers/socketController";
import { AdminUpdateType, GameScriptDataType } from "../utils/constants";

const gameSendRouter = Router()

gameSendRouter.get('/request/all', requestUpdateAll)
gameSendRouter.get('/cancel', cancelRequestAll)
gameSendRouter.get('/request/com', requestDataFactory(GameScriptDataType.COMPANY))
gameSendRouter.get('/request/sta', requestDataFactory(GameScriptDataType.STATION))
gameSendRouter.get('/request/tow', requestDataFactory(GameScriptDataType.TOWN))
gameSendRouter.get('/request/typ', requestDataFactory(GameScriptDataType.INDUSTRY_TYPE))
gameSendRouter.get('/request/car', requestDataFactory(GameScriptDataType.CARGO))
gameSendRouter.get('/request/ind', requestDataFactory(GameScriptDataType.INDUSTRY))
gameSendRouter.get('/request/mon', requestDataFactory(GameScriptDataType.MONTHLY_STATS))
gameSendRouter.get('/request/wai', requestDataFactory(GameScriptDataType.CARGO_WAITING_STATION_AT_VIA_FROM))
gameSendRouter.get('/poll/info', requestAdminPollFactory(AdminUpdateType.CompanyStats))
gameSendRouter.get('/poll/stats', requestAdminPollFactory(AdminUpdateType.CompanyInfo))
gameSendRouter.get('/poll/econ', requestAdminPollFactory(AdminUpdateType.CompanyEcon))
gameSendRouter.get("/pollgs", pollGS)
gameSendRouter.post("/freq/:freq", updateFrequency)
gameSendRouter.get("/poll", getFrequency)

export default gameSendRouter;