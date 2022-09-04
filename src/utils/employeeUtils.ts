import * as employeeRepository from '../repositories/employeeRepository'
import errorResponses from '../Responses/errorResponses';

export async function checkEmployeesIsResistered(id:number){

    const employee = await employeeRepository.findById(id);
    if(!employee){
        return errorResponses.notFound("Employee")
    }
    return employee;
}

export async function checkEmployeesIsFromCompany(companyId: number, employeedComapnyId: number ){
    const checkEmployee = companyId === employeedComapnyId;
    if(!checkEmployee){
        return errorResponses.notFound("Employee")
    }
    return;
}