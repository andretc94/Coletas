import knex from '../database/connection';
import IEmployee from '../interfaces/employees';

export default class EmployeeModel {
    public async getAll(){
        return await knex('employees').select();
    }
    
    public async create(employee: IEmployee, locationsIds: number[]){
        const transaction = await knex.transaction();

        const employeeExists = await transaction('employees')
            .select()
            .where({registration: employee.registration})
            .first();
        
        if(employeeExists){
            transaction.rollback();
            return {message: "employee exists!"};
        }

        const [id] = await transaction('employees').insert(employee);

        let error = 0;

        const employees_locations = locationsIds.map(async (location_id: number) =>{

            const locationsIds = await transaction('location')
                .where({id: location_id})
                .first();
            
            if(!locationsIds){
                error+=1
                return;
            } else {
                return {
                    location_id: locationsIds.id,
                    employee_id: id
                }
            }
        });

        if((await Promise.all(employees_locations)) && error > 0) {
            transaction.rollback();
            return {message: "some location already exists"};
        }

        await transaction('employees_locations').insert(await Promise.all(employees_locations));

        await transaction.commit();

        return {
            ...employee,
            id
        };
    }

    public async findById(id: string){
        const employee = await knex('employees').select().where({id}).first();

        if(!employee){
            return {message: "Employee not found!"}
        }

        const list = await knex('employees_locations as el')
            .join('location as l', 'el.location_id', '=', 'l.id')
            .where('el.employee_id', '=', id)
            .groupBy('employee_id')
            .select()
        
        return list;
    }
}