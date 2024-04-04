## OMS (Organization Management System)

OMS is a web-based application designed to manage organizational structures and employee information efficiently. It provides features to create, visualize, and manipulate the organizational hierarchy, as well as manage employee data.

### Features:

1. **Employee Management**: Add, edit employee records, including details like name, designation, team, and manager.

2. **Organizational Chart**: Visualize the organizational structure using an interactive and draggable org chart.

3. **Search and Filter**: Search for employees by name or team, and filter them based on specific criteria.

4. **Team Filtering**: Filter employees by their assigned teams to focus on specific groups within the organization.

5. **Create Employee Dialog**: A dialog box to conveniently add new employees to the system with required details.

6. **Drag and Drop**: Drag and drop functionality to easily rearrange employees within the organizational chart.

7. **Responsive Design**: User-friendly interface that adapts to different screen sizes for optimal viewing experience.

### Installation:

1. Clone the repository from GitHub: `git clone <repository-url>`
2. Navigate to the project directory: `cd oms`
3. Install dependencies: `bun install`

### Running the Application:

1. Run the server: `bun run server`
2. Run the client: `bun run client`
3. Or you could simply run `bun dev`
3. Access the application in your web browser at `http://localhost:3000`

### Usage:

1. Upon accessing the application, you will see the main dashboard displaying the organizational chart and employee list.
2. Use the search bar to search for specific employees by name or team.
3. Filter employees by team using the dropdown menu.
4. Click on an employee node in the org chart to view detailed information.
5. Use the create employee dialog to add new employees to the system.
6. Drag and drop employee nodes in the org chart to rearrange the organizational structure.

### Dependencies:

- **React**: Frontend library for building user interfaces.
- **React DnD**: Drag and drop library for React.
- **React Organizational Chart**: Component library for building organizational charts.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Next-generation frontend build tool.
- **Bun**: Development server for running the application.

### Development:

- **eslint**: Linter for identifying and reporting patterns in JavaScript/TypeScript code.
- **prettier**: Code formatter to maintain consistent code style.
- **vitest**: Test runner for unit testing.