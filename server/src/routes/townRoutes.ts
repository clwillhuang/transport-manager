import express from "express";
import { townCreateOne, townGetAll, townGetOne, townUpdateOne, townDeleteOne } from "../controllers/townController";

const townRouter = express.Router();

// POST endpoint to create a new town
townRouter.post('/', townCreateOne);

// GET endpoint to get all town
townRouter.get('/', townGetAll);

// GET endpoint to get a single town by ID
townRouter.get('/:id', townGetOne);

// PUT endpoint to update a town
townRouter.post('/:id', townUpdateOne);

// DELETE endpoint to delete a town
townRouter.delete('/:id', townDeleteOne);

export default townRouter;