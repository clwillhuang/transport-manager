import express from "express";
import { industryTypeCreateOne, industryTypeGetAll, industryTypeGetOne, industryTypeUpdateOne, industryTypeDeleteOne } from "../controllers/industryTypeController";

const industryTypeRouter = express.Router();

// POST endpoint to create a new industryType
industryTypeRouter.post('/', industryTypeCreateOne);

// GET endpoint to get all industryType
industryTypeRouter.get('/', industryTypeGetAll);

// GET endpoint to get a single industryType by ID
industryTypeRouter.get('/:id', industryTypeGetOne);

// PUT endpoint to update a industryType
industryTypeRouter.post('/:id', industryTypeUpdateOne);

// DELETE endpoint to delete a industryType
industryTypeRouter.delete('/:id', industryTypeDeleteOne);

export default industryTypeRouter;