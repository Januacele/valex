import * as employeeRepository from '../repositories/employeeRepository'


export async function checkEmployeesIsResistered(employeeId:number){

    const employee = await employeeRepository.findById(employeeId);
    if(!employee){
        throw {
            type: "error_not_found",
            message: "not found." 
        }
    }
    return employee;
}

export async function checkEmployeesIsFromCompany(companyId: number, employeedComapnyId: number ){
    const checkEmployee = companyId === employeedComapnyId;
    if(!checkEmployee){
        throw {
            type: "error_not_found",
            message: `not found.`
        }
    }
    return;
}