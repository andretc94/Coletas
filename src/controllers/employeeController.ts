import { Request, Response } from 'express';
import IEmployees from '../interfaces/employees';
import EmployeeModel from '../models/EmployeeModel';

export default class EmployeeController {
    public async index(req: Request, res: Response){
        const employeeModel = new EmployeeModel();
        
        const employees: IEmployees[] = await employeeModel.getAll();

        return res.json(employees);
    }

    public async create(req: Request, res: Response) {
        const employeeModel = new EmployeeModel();
        
        const {name, registration, locationsIds} = req.body;
        
        const employee: IEmployees = { name, registration } as IEmployees;

        return res.json(await employeeModel.create(employee, locationsIds));
    }

    public async findById(req: Request, res: Response){
        const employeeModel = new EmployeeModel();
        
        const {id} = req.params;

        res.json(await employeeModel.findById(id));
    }
}