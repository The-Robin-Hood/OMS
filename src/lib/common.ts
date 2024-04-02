import { Employee } from "@/model/employee";

function employeeFinder({ employees, id }: { employees: Employee[]; id: number }){
    return employees.find(employee => employee.id === id);
}

export { employeeFinder };