import { DraggableContext } from "@/hooks/draggableProvider";
import { isEmployeeUnderManager } from "@/lib/common";
import { cn } from "@/lib/utils";
import { Employee } from "@/model/employee";
import { BriefcaseBusiness, Component } from "lucide-react";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

import { useToast } from "../ui/use-toast";

interface ExtendedEmployee extends Employee {
    reporters: Employee[] | null;
    depth: number;
}

function EmployeeNode({
    employees,
    employee,
    setEmployees,
}: {
    employees: Employee[];
    employee: ExtendedEmployee;
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}) {
    const { toast } = useToast();

    async function handleDrop({ from, to }: { from: ExtendedEmployee; to: ExtendedEmployee }) {
        if (
            (from.depth < to.depth &&
                isEmployeeUnderManager({ employees, employeeId: from.id, managerId: to.id })) ||
            from.managerId === to.id ||
            from.id === to.id
        )
            return;
        const newEmployee: Employee = {
            id: from.id,
            designation: from.designation,
            name: from.name,
            team: from.team,
            managerId: to.id,
        };
        const response = await fetch("http://localhost:3000/api/employee/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
        });
        const updatedEmployee = await response.json();
        if (!updatedEmployee || updatedEmployee.error) {
            toast({ title: "Error ❌", description: "Failed to update employee", variant: "destructive" });
            return;
        }
        setEmployees((prevEmployees) => {
            return prevEmployees.map((emp) => {
                if (emp.id === from.id) {
                    return updatedEmployee;
                }
                return emp;
            });
        });
        toast({
            title: "Success ✅",
            description: "Employee information has been updated successfully",
        });
    }

    const [{ isDragging }, drag] = useDrag({
        item: {
            employee: employee,
        },
        type: "employee",
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult() as { employee: ExtendedEmployee };
            if (monitor.didDrop()) {
                handleDrop({ from: item.employee, to: dropResult.employee });
            }
        },
    });

    const [{ isOver, canDrop, getItem }, drop] = useDrop(
        () => ({
            accept: "employee",
            drop: () => ({ employee: employee }),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                getItem: monitor.getItem() as { employee: ExtendedEmployee },
            }),
        }),
        []
    );
    const isActive =
        canDrop &&
        isOver &&
        getItem.employee.id !== employee.id &&
        getItem.employee.managerId !== employee.id &&
        (getItem.employee.depth >= employee.depth ||
            !isEmployeeUnderManager({ employees, employeeId: employee.id, managerId: getItem.employee.id }));

    const { handleDrag } = React.useContext(DraggableContext);

    return (
        <div className='relative flex  justify-center space-x-4' ref={drag}>
            <div
                onMouseOver={() => {
                    handleDrag(true);
                }}
                onMouseOut={() => {
                    handleDrag(false);
                }}
                className={cn(
                    "flex w-fit cursor-move flex-col justify-center space-x-4 space-y-1 border p-4",
                    isDragging ? "opacity-50" : "opacity-100",
                    isActive ? "border-blue-500" : ""
                )}
                ref={drop}>
                {isOver && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100%",
                            width: "100%",
                            zIndex: 1,
                            opacity: 0.5,
                        }}
                    />
                )}
                <div>
                    <h4 className='text-sm font-semibold'>{employee.name}</h4>
                    <div className='flex items-center pt-2'>
                        <BriefcaseBusiness className='mr-2 h-4 w-4 opacity-70' />{" "}
                        <span className='text-muted-foreground'>{employee.designation}</span>
                    </div>

                    <div className='flex items-center pt-2'>
                        <Component className='mr-2 h-4 w-4 opacity-70' />{" "}
                        <span className='text-muted-foreground'>{employee.team}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeNode;