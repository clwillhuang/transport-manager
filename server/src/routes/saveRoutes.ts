import express from "express";
import { saveCreateOne, saveGetAll, saveGetOne, saveUpdateOne, saveDeleteOne } from "../controllers/saveController";

const saveRouter = express.Router();

// POST endpoint to create a new save
saveRouter.post('/', saveCreateOne);

// GET endpoint to get all save
saveRouter.get('/', saveGetAll);

// GET endpoint to get a single save by ID
saveRouter.get('/:id', saveGetOne);

// PUT endpoint to update a save
saveRouter.post('/:id', saveUpdateOne);

// DELETE endpoint to delete a save
saveRouter.delete('/:id', saveDeleteOne);

export default saveRouter;