import express from "express";
import { industryCreateOne, industryGetAll, industryGetDirectory, industryGetOne, industryUpdateOne, industryDeleteOne } from "../controllers/industryController";

const industryRouter = express.Router();

// POST endpoint to create a new industry
industryRouter.post('/', industryCreateOne);

// GET endpoint to get all industry
industryRouter.get('/', industryGetAll);

// GET endpoint to get all industry
industryRouter.get('/directory', industryGetDirectory);

// GET endpoint to get a single industry by ID
industryRouter.get('/:id', industryGetOne);

// PUT endpoint to update a industry
industryRouter.post('/:id', industryUpdateOne);

// DELETE endpoint to delete a industry
industryRouter.delete('/:id', industryDeleteOne);

export default industryRouter;