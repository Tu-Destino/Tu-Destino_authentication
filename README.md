# Tu Destino API - v1

Your destination is a backend application developed in Node.js with the Nest.js framework, designed to manage user authentication and verification and role management. This API allows users to register, log in, and manage routes depending on specific roles.

# Demonstration

You can interact with the API using the following URL:

[Go test the API](http://localhost:3000/api) -> To log in as admin you can use these credentials:
```json
{
   "email":"cristian@gmail.com",
    "password":"cristian123",
    "role":"admin"
}

{
    "email":"juanMa@gmail.com",
    "password":"juanMa123",
    "role":"superAdmin"
}
```

## Local settings

To run the project locally, clone the repository and configure the necessary environment variables for the database and JWT.

1. Clone the repository:

   git clone https://github.com/Tu-Destino/Tu-Destino_authentication.git
   cd Tu-Destino_authentication
   
2. Install the necessary dependencies:
   ```shell
   npm install
     ``` 
3. Copy the .env.example file to a new .env file and set the necessary environment variables:
    ```shell
    .env.example .env
   ```  

4.   Edit the .env file and configure the following values:
    ```shell
        DB_CONNECTION=mongodb://
        DB_HOST=localhost:27017
        DB_NAME=your_database_name
        DB_USER=your_database_user
        DB_PASSWORD=your_database_password
        JWT_SECRET=your_secret_key
        ACCESS_TOKEN_EXPIRY=1d
        PORT=3000
        ENVIROMENTS='production'
    ```
Estos pasos garantizan que tengas toda la configuración necesaria para ejecutar el proyecto localmente, ajustando las variables de entorno según las necesidades de tu entorno de desarrollo.
                   

## Development Commands

To start the server in development mode, use:

```shell
npm run start:dev
```
## Production Deployment

To start the server in development mode, use:

```shell
npm run build
npm start
```

## Project Folder Structure

- `/auth`: Contains the components related to authentication, such as drivers, services, strategies and guards.
    - `/controllers`: Controller that handles authentication-related HTTP requests.
    - `/dto`: Data Transfer Objects that define the data structure for authentication operations.
    - `/guards`: Classes that implement authorization logic.
    - `/services`: Service that contains the business logic related to authentication.
    - `/strategies`: Passport strategies for JWT authentication.
    - `/types`: Defines the interfaces to type the objects within the authentication module.
    - `/auth.module.ts`: Module that groups all elements related to authentication.

- `/decorators`: Custom functions that add additional functionality to controller routes or methods.

- `/errors`: Custom functions that add error handling to functions
    - `/error.module.ts`: Module that groups all elements related to error handling
    - `/auth.service.ts`: Service that contains business logic related to error handling

- `/persistance`: Contains the connection to the database
    - `persistance.module.ts`: Module that groups all the elements related to the connection to the database

- `/utils`: Contains common elements that can be used throughout the application.
    - `/service`: contains the business logic.
    - `utils.module.ts`: Module that provides common elements to other modules.


- `/modules`: Modules for book management.
    - `/users`: Modules for book management.
    - `controllers`: Controller for user operations.
        - `/dto`: Data Transfer Objects for user manipulation.
        - `/entities`: Entities that represent the users table in the database.
        - `services`: Service that contains the business logic for users.
        - `users.module.ts`: Module that encapsulates all the components of the user domain.
        

- `app.module.ts`: Main module that imports and organizes all the application modules.
- `main.ts`: Entry point of the application that starts the NestJS server.

This folder structure is designed to keep the project organized and modular, making the code easier to maintain and scale.

## Branching Strategy with Gitflow

This project implements the Gitflow branching strategy, which is a scalable and robust model for handling software development. Here is a brief description of how branches are organized and their purpose within the project workflow:

- `master`: The main branch containing the production code, where the code reaches the most stable state after being tested on other branches.
- `dev`: The development branch where all features, fixes and improvements are merged before being deployed to production. This branch contains the latest status of the upcoming release.
- `feat/x`: Feature branches where new functionalities are developed. Each feature has its own branch (e.g. `feat/new-login` for new login functionality).


The work is merged into `dev` for integration testing. Once `dev` is stable and ready for a release, it is merged into `main`.

To contribute to the project, create a branch from `dev` following the prefix (feat/ ) depending on the type of work. After completing the work and testing, create a Pull Request to `dev`.

Adopting Gitflow enables organized release management, providing clarity and an established process for collaboration and software deployment.



## Characteristics

- **User Authentication**: Manage access through a robust JWT authentication system.
- **Data Validation**: Ensures data integrity with complete validations on all entries.
- **Role Management**: Control access to different parts of the API based on user roles (superadmin, admin, user).
- **Query Optimization**: Improves performance through optimized database queries.


## Used technology

- Nest.js: A progressive Node.js framework for building efficient and scalable server applications.
- Mongoose for MongoDB: Non-relational database management system to store all user data.
- JWT: For authentication and session management.
- Swagger: For API documentation.
- Gitflow: Branch management strategy that keeps development organized and efficient.

## Dependencies

This project uses the following libraries and frameworks:

- Nest.js: `@nestjs/common`, `@nestjs/core`, `@nestjs/config`, `@nestjs/platform-express` (version 10.0.0)
- Authentication: `@nestjs/jwt` (version 10.2.0), `@nestjs/passport` (version 10.0.3), `passport` (version 0.7.0), `passport-jwt` (version 4.0.1)
- API documentation: `@nestjs/swagger` (version 7.3.1)
- Mongoose and Databases: `@nestjs/mongoose mongoose` (version 10.0.2), `mongoose ` (version 8.3.4),
- Security Tools: `bcrypt` (version 5.1.1)
- Data Validation: `class-validator` (version 0.14.1), `class-transformer` (version 0.5.1)
- Reactive Programming: `rxjs` (version 7.8.1)



- Author - [Luisa Perez](https://holas1356.github.io/Portafolio/)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
