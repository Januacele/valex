import * as companyRepository from '../repositories/companyRepository';
import errorResponses from '../Responses/errorResponses';

export async function validateApiKey(apiKey: string){
    const company = await companyRepository.findByApiKey(apiKey);
    if(!company){
        return errorResponses.unauthorized("Data")
    }
    return company;
}