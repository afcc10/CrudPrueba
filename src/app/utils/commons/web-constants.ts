import { environment } from "src/environments/environment";

const BASE_URL: string = environment.BASE_URL;

export const ENDPOINTS = {    
    getStudents: (): string => {
        return `${BASE_URL}Student/GetAll`;
    },
    registerStudent: (): string => {
        return `${BASE_URL}Student/Create`;
    },
    updateStudent  : (): string => {
        return `${BASE_URL}Student/Update`;
    },
    getByIdStudent : (id: number): string => {
        return `${BASE_URL}Student/GetById/${id}`;
    },
    deleteByIdStudent : (id: number): string => {
        return `${BASE_URL}Student/Delete?id=${id}`;
    }
}