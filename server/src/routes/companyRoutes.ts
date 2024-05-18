import express from "express";
import { companyCreateOne, companyGetAll, companyGetOne, companyUpdateOne, companyDeleteOne, companyGetCurrent } from "../controllers/companyController";

const companyRouter = express.Router();

// POST endpoint to create a new company
companyRouter.post('/', companyCreateOne);

// GET endpoint to get all company
companyRouter.get('/', companyGetAll);

companyRouter.get('/player', companyGetCurrent);

// GET endpoint to get a single company by ID
companyRouter.get('/:id', companyGetOne);

// PUT endpoint to update a company
companyRouter.post('/:id', companyUpdateOne);

// DELETE endpoint to delete a company
companyRouter.delete('/:id', companyDeleteOne);

export default companyRouter;