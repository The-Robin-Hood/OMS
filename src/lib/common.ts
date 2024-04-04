import { Employee } from "@/model/employee";

function employeeFinder({ employees, id }: { employees: Employee[]; id: number }) {
    return employees.find((employee) => employee.id === id);
}

// function to check if an employee is under a manager (max depth) - to check for circular references
function isEmployeeUnderManager({
    employees,
    employeeId,
    managerId,
}: {
    employees: Employee[];
    employeeId: number;
    managerId: number;
}) {
    let employee = employeeFinder({ employees, id: employeeId });
    while (employee) {
        if (employee.managerId === managerId) {
            return true;
        }
        employee = employeeFinder({ employees, id: employee.managerId! });
    }
    return false;
}

// function to check if an employee is under any manager in a list
function isEmployeeUnderAnyManagerInList({
    employees,
    employeeId,
}: {
    employees: Employee[];
    employeeId: number;
}) {
    let employee = employeeFinder({ employees, id: employeeId });
    let managerIds = employees.map((emp) => emp.id);
    while (employee) {
        if (managerIds.includes(employee.managerId!)) {
            return true;
        }
        employee = employeeFinder({ employees, id: employee.managerId! });
    }
    return false;
}

function calculateDepthOfEmployee({ employees, employeeId }: { employees: Employee[]; employeeId: number }) {
    let employee = employeeFinder({ employees, id: employeeId });
    let depth = 0;
    while (employee) {
        depth++;
        employee = employeeFinder({ employees, id: employee.managerId! });
    }
    return depth;
}

export { employeeFinder, isEmployeeUnderManager, isEmployeeUnderAnyManagerInList, calculateDepthOfEmployee };
