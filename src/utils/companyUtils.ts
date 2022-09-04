import * as companyRepository from '../repositories/companyRepository'

export async function checkComapany(apiKey:any){

    const checkCompany = await companyRepository.findByApiKey(apiKey.toString());

    if(!checkCompany){
        throw {
            type: "error_not_found",
            message: "not found." 
        }
    }
    return checkCompany;
}

