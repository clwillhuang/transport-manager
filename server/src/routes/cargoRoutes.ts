import express from "express";
import { cargoCreateOne, cargoGetAll, cargoGetOne, cargoUpdateOne, cargoDeleteOne } from "../controllers/cargoController";

const cargoRouter = express.Router();

// POST endpoint to create a new cargo
cargoRouter.post('/', cargoCreateOne);

// GET endpoint to get all cargoes
cargoRouter.get('/', cargoGetAll);

// GET endpoint to get a single cargo by ID
cargoRouter.get('/:id', cargoGetOne);

// PUT endpoint to update a cargo
cargoRouter.post('/:id', cargoUpdateOne);

// DELETE endpoint to delete a cargo
cargoRouter.delete('/:id', cargoDeleteOne);

export default cargoRouter;