# Project : Task Management App with User Authentication

The Task Management App is a web-based application designed to help users efficiently manage tasks by providing a platform for creating, updating, and tracking tasks. The app features a robust user authentication system implemented using Node.js, Express.js, MongoDB, JWT (JSON Web Tokens), bcrypt for secure user registration, login, and access control. Users can create an account, log in, and perform various task-related actions based on their privileges.

# Tech Stack (Backend Project)
- NodeJS
- ExpressJS
- MongoDB
- Postman

# Features
- Management of tasks.
- CRUD operations on tasks and user
- Assigning tasks to user.
- Authenticate User
- login and logout
- Encryption of user password (bcrypt)
- Jwt Tokens
- Express Router
- Testing Api's with Postman

# User Authentication and Routes:

- The user authentication system ensures secure access to the app's features. User routes begin with "/api/users", and they are handled by the userRouter module. Here are some of the key user-related routes:

- Register User (/register): New users can create an account by providing their details. The registration process uses bcrypt to securely hash and store passwords in the MongoDB database.

- Retrieve All Users (/allUsers): Authenticated users with appropriate privileges can retrieve a list of all registered users.

- Retrieve Single User (/:id): Authenticated users can retrieve details about a specific user by providing their user ID.

- Delete User (/:id): Authenticated users can delete a specific user's account.

- Login User (/login): Users can log in by providing their credentials. Upon successful login, a JWT token is generated and returned, allowing the user to access protected routes.

- Logout User (/logout): Authenticated users can log out, invalidating their JWT token and ensuring secure access control.

# Task Management and Routes:

- The app also offers comprehensive task management functionalities. Task routes begin with "/api/tasks" and are managed by the taskRouter module. Here are some of the key task-related routes:

- Create Task (/create): Authenticated users can create new tasks, specifying task details and assignment.

- Retrieve All Tasks (/allTasks): Authenticated users can retrieve a list of all tasks available in the system.

- Retrieve User's Tasks (/allUserTasks): Users can retrieve tasks assigned to them.

- Retrieve Completed Tasks (/completed): Users can retrieve a list of completed tasks.

- Retrieve Uncompleted Tasks (/uncompleted): Users can retrieve a list of tasks that are not yet completed.

- Retrieve User's Completed Tasks (/userCompleted): Users can retrieve tasks they have marked as completed.

- Retrieve User's Uncompleted Tasks (/userUncompleted): Users can retrieve tasks they have not yet completed.

- Retrieve Single Task (/:id): Authenticated users can retrieve detailed information about a specific task.

- Update Task Details (/:id): Authenticated users can update task details, such as task title, description, or due date.

- Delete Task (/:id): Authenticated users can delete a specific task.

- Complete Task (/:id/complete): Authenticated users can mark a task as completed.

- Uncomplete Task (/:id/uncomplete): Authenticated users can mark a completed task as uncompleted.

# Conclusion:

The Task Management App is a comprehensive solution that provides users with the ability to create, manage, and track tasks. With a secure user authentication system based on JWT and bcrypt, users can securely access the app's features while maintaining data privacy. The app's modular architecture using Node.js and Express.js makes it easy to expand and enhance functionalities as needed. Whether for personal or professional task management, this app offers a user-friendly and secure experience.
