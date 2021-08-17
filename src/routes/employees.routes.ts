import { Router } from "express";
import EmployeeController from "../controllers/employeeController";

const employeeRouter =  Router();

const employeeController = new EmployeeController();

employeeRouter.get('/', employeeController.index);
employeeRouter.get('/:id', employeeController.findById);
employeeRouter.post('/', employeeController.create);

export default employeeRouter;