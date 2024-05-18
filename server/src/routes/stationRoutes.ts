import express from "express";
import { stationCreateOne, stationGetAll, stationGetOne, stationUpdateOne, stationDeleteOne } from "../controllers/stationController";

const stationRouter = express.Router();

// POST endpoint to create a new station
stationRouter.post('/', stationCreateOne);

// GET endpoint to get all station
stationRouter.get('/', stationGetAll);

// GET endpoint to get a single station by ID
stationRouter.get('/:id', stationGetOne);

// PUT endpoint to update a station
stationRouter.post('/:id', stationUpdateOne);

// DELETE endpoint to delete a station
stationRouter.delete('/:id', stationDeleteOne);

export default stationRouter;