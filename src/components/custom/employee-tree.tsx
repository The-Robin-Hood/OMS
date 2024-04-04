import { calculateDepthOfEmployee, isEmployeeUnderAnyManagerInList } from "@/lib/common";
import { Employee } from "@/model/employee";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tree, TreeNode } from "react-organizational-chart";

import EmployeeNode from "./employee-node";

interface ExtendedEmployee extends Employee {
    reporters: Employee[] | null;
    depth: number;
}

function addReportersToEmployees(employees: Employee[]) {
    return employees.map(
        (employee): ExtendedEmployee => ({
            id: employee.id,
            name: employee.name,
            team: employee.team,
            designation: employee.designation,
            managerId: employee.managerId,
            reporters: employees.filter((emp) => emp.managerId === employee.id),
            depth: calculateDepthOfEmployee({ employees, employeeId: employee.id }),
        })
    );
}

const EmployeeTree = ({
    employees,
    setEmployees,
}: {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}) => {
    let rootEmployees = addReportersToEmployees(employees);
    const renderTreeNodes = (managerId: number) => {
        const subordinates = rootEmployees.filter((emp) => emp.managerId === managerId);
        if (subordinates.length === 0) return null;

        return subordinates.map((subordinate) => (
            <TreeNode
                key={subordinate.id}
                label={
                    <EmployeeNode employee={subordinate} employees={employees} setEmployees={setEmployees} />
                }
                className='text-center'>
                {renderTreeNodes(subordinate.id)}
            </TreeNode>
        ));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='p-4'>
                <Tree
                    label={
                        <div className='text-center'>
                            <h1 className='text-lg font-bold'>Organization</h1>
                        </div>
                    }
                    lineWidth='2px'
                    lineColor='#ccc'
                    lineBorderRadius='15px'>
                    {rootEmployees.map((root) => {
                        if (
                            isEmployeeUnderAnyManagerInList({
                                employees: rootEmployees,
                                employeeId: root.id,
                            })
                        )
                            return null;
                        return (
                            <TreeNode
                                key={root.id}
                                label={
                                    <EmployeeNode
                                        employee={root}
                                        employees={employees}
                                        setEmployees={setEmployees}
                                    />
                                }
                                className='text-center'>
                                {renderTreeNodes(root.id)}
                            </TreeNode>
                        );
                    })}
                </Tree>
            </div>
        </DndProvider>
    );
};

export default EmployeeTree;
