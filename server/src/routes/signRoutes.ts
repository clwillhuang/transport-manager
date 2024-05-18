import express from "express";
import { signCreateOne, signGetAll, signGetOne, signUpdateOne, signDeleteOne } from "../controllers/signController";

const signRouter = express.Router();

// POST endpoint to create a new sign
signRouter.post('/', signCreateOne);

// GET endpoint to get all sign
signRouter.get('/', signGetAll);

// GET endpoint to get a single sign by ID
signRouter.get('/:id', signGetOne);

// PUT endpoint to update a sign
signRouter.post('/:id', signUpdateOne);

// DELETE endpoint to delete a sign
signRouter.delete('/:id', signDeleteOne);

export default signRouter;