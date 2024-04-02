import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Employee } from "@/model/employee";
import {
    BriefcaseBusiness,
    Building,
    CircleUser,
    Component,
    FileBadge2,
    Fingerprint,
    Pencil,
    Plus,
    Search,
} from "lucide-react";
import React from "react";

import { EmployeeHoverCard } from "./components/custom/employee-hover-card";
import { employeeFinder } from "./lib/common";

const App: React.FC = () => {
    const [employees, setEmployees] = React.useState<Employee[]>([]);
    const [search, setSearch] = React.useState<string>("");

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://192.168.0.175:3000/api/employees");
            const data = await response.json();
            setEmployees(data);
        };
        fetchData();
    }, []);

    const handleAddEmployee = async () => {
        const newEmployee: Employee = {
            id: 0,
            name: "John Doe",
            designation: "Software Engineer",
            team: "Engineering",
            managerId: 1,
        };

        const response = await fetch("http://192.168.0.175:3000/api/employee/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
        });
        const data = await response.json();
        if (data) {
            const updatedEmployees = [...employees, data];
            setEmployees(updatedEmployees);
        }
    };

    return (
        <div className='grid min-h-screen w-full grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]'>
            <div className='border-r bg-muted/40 md:block'>
                <div className='flex h-full max-h-screen flex-col gap-2'>
                    <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
                        <a href='/' className='flex items-center gap-2 font-semibold'>
                            <Building className='h-6 w-6' />
                            <span className=''>OMS</span>
                        </a>
                    </div>
                    <div className='flex-1'>
                        <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                            <div className='relative mb-4 mt-2 flex w-full items-center gap-2'>
                                <Search className='absolute left-2.5 top-3 h-4 w-4 text-muted-foreground' />
                                <Input
                                    type='search'
                                    placeholder='Search employees...'
                                    className='w-full appearance-none bg-background pl-8 shadow-none'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button
                                    variant='outline'
                                    size='icon'
                                    className='ml-auto h-10 w-10'
                                    onClick={handleAddEmployee}>
                                    <Plus className='h-4 w-4' />
                                    <span className='sr-only'>Add Employee</span>
                                </Button>
                            </div>
                            {employees.length > 0 ? (
                                employees.map((employee) => {
                                    if (
                                        employee.name.toLowerCase().includes(search.toLowerCase()) ||
                                        employee.team.toLowerCase().includes(search.toLowerCase())
                                    ) {
                                        return (
                                            <EmployeeHoverCard
                                                employee={employee}
                                                employees={employees}
                                                key={employee.id}
                                            />
                                        );
                                    }
                                })
                            ) : (
                                <div className='flex flex-col items-center gap-1 text-center'>
                                    <h3 className='text-2xl font-bold tracking-tight'>
                                        You have no employee
                                    </h3>
                                    <p className='text-sm text-muted-foreground'>
                                        You can start by adding employees to your team
                                    </p>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
                    <div className='flex items-center'>
                        <h1 className='text-lg font-semibold md:text-2xl'>Employee Org Chart</h1>
                    </div>
                    <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
                        <div className='flex flex-col items-center gap-1 text-center'>
                            <h3 className='text-2xl font-bold tracking-tight'>You have no team</h3>
                            <p className='text-sm text-muted-foreground'>
                                You can start by adding employees to your team
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
export default App;
