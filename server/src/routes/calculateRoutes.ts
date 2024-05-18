import express from "express";
import * as methods from "../controllers/calculateController";

const calculateRouter = express.Router();

calculateRouter.post('/:saveId/oneway', methods.CalculationMethodControllerFactory(methods.OneWay))
calculateRouter.post('/:saveId/twoway', methods.CalculationMethodControllerFactory(methods.TwoWay))
calculateRouter.post('/:saveId/distance', methods.CalculationMethodControllerFactory(methods.VariableDistance))
calculateRouter.post('/:saveId/speed', methods.CalculationMethodControllerFactory(methods.VariableSpeed))
calculateRouter.post('/:saveId/days', methods.CalculationMethodControllerFactory(methods.VariableTransitDays))

export default calculateRouter;

