import express from "express";
import { circleCreateOne, circleGetAll, circleGetOne, circleUpdateOne, circleDeleteOne } from "../controllers/circleController";

const circleRouter = express.Router();

// POST endpoint to create a new circle
circleRouter.post('/', circleCreateOne);

// GET endpoint to get all circle
circleRouter.get('/', circleGetAll);

// GET endpoint to get a single circle by ID
circleRouter.get('/:id', circleGetOne);

// PUT endpoint to update a circle
circleRouter.post('/:id', circleUpdateOne);

// DELETE endpoint to delete a circle
circleRouter.delete('/:id', circleDeleteOne);

export default circleRouter;