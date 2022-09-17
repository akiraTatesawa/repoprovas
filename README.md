# RepoProvas 📝

## Description

**RepoProvas** is a service for sharing tests between students. The user can search for old collage/school tests and add new ones to the system!

![status-finished](https://user-images.githubusercontent.com/97575616/152926720-d042178b-24c0-4d6b-94fb-0ccbd3c082cc.svg)

## Table of Contents

- [RepoProvas 📝](#repoprovas-)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Built With](#built-with)
  - [Features](#features)
  - [API Reference](#api-reference)
    - [AUTHENTICATION](#authentication)
      - [Sign Up](#sign-up)
        - [Request](#request)
        - [Response](#response)
      - [Sign In](#sign-in)
        - [Request](#request-1)
        - [Response](#response-1)
    - [TESTS](#tests)
      - [Notes](#notes)
      - [Create Test](#create-test)
        - [Request](#request-2)
        - [Response](#response-2)
      - [Get Tests by Discipline](#get-tests-by-discipline)
        - [Response](#response-3)
      - [Get Tests by Teacher](#get-tests-by-teacher)
        - [Response](#response-4)
    - [NOTES](#notes-1)
  - [Running the Project](#running-the-project)
  - [Testing the API](#testing-the-api)
    - [Endpoints (Thunder Client)](#endpoints-thunder-client)
    - [Jest](#jest)

## Built With

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Features

- User Registration and Login;
- List Tests by Disciplines;
- List Tests by Teachers;
- Create tests;

## API Reference

### AUTHENTICATION

#### Sign Up

```http
POST /sign-up
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `email`          | `string` | **Required**, must be a valid email format          |
| `password`       | `string` | **Required** |
| `confirmPassword`| `string` | **Required**, must be equal to `password` |

```json
{
  "email": "example@gmail.com",
  "password": "pass1234",
  "confirmPassword": "pass1234"
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `201`    | **Created**          |
| `json`           |   `409`    | **Conflict**, user is already registered |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

#### Sign In

```http
POST /sign-in
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `email`          | `string` | **Required**, must be a valid email format          |
| `password`       | `string` | **Required** |

```json
{
  "email": "example@gmail.com",
  "password": "pass1234",
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**, returns a token          |
| `json`           |   `401`    | **Unauthorized**, incorrect password |
| `json`           |   `404`    | **Not Found**, user does not exist |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

```json
{
  "token": "JWT token"
}
```

### TESTS

#### Notes

- Every `/tests` route is authenticated using **Bearer TOKEN**;
- The token must be sent in the Authorization request header;
- The API will return the following errors if the authentication fails:

| Code             | Description  |
| :--------------- | :----------- |
| `401`            | **Unauthorized**, invalid token     |
| `400`            | **Bad Request**, token was not sent     |
| `422`            | **Unprocessable Entity**, token is not in the Bearer format     |

#### Create Test

```http
POST /tests
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`           | `string` | **Required**        |
| `pdfUrl`         | `string` | **Required**, must be a valid URL format |
| `categoryId`     | `number` | **Required**, must be an integer |
| `teacherDisciplineId`| `number` | **Required**, must be an integer |

```json
{
  "name": "Test Example",
  "pdfUrl": "http://example.com",
  "categoryId": 2,
  "teacherDisciplineId": 1
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `201`    | **Created**          |
| `json`           |   `404`    | **Not Found**, category or teacherDiscipline not found |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

#### Get Tests by Discipline

- This route returns the tests filtered by Terms-Disciplines-Categories;

```http
GET /tests/disciplines
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`          |   `200`    | **OK**          |

```json
[
  {
    "id": 1,
    "number": 1,
    "disciplines": [
      {
        "id": 1,
        "name": "HTML e CSS",
        "termId": 1,
        "categories": [
          {
            "id": 1,
            "name": "Projeto",
            "tests": []
          },
          {
            "id": 2,
            "name": "Prática",
            "tests": [
              {
                "id": 1,
                "name": "Test Example",
                "pdfUrl": "http://example.com",
                "categoryId": 2,
                "teacherDisciplineId": 1,
                "teacherDiscipline": {
                  "id": 1,
                  "disciplineId": 1,
                  "teacherId": 1,
                  "teacher": {
                    "name": "Diego Pinho"
                  },
                  "discipline": {
                    "id": 1
                  }
                }
              }
            ]
          },
          {
            "id": 3,
            "name": "Recuperação",
            "tests": [
              {
                "id": 2,
                "name": "Test Example",
                "pdfUrl": "http://example.com",
                "categoryId": 3,
                "teacherDisciplineId": 1,
                "teacherDiscipline": {
                  "id": 1,
                  "disciplineId": 1,
                  "teacherId": 1,
                  "teacher": {
                    "name": "Diego Pinho"
                  },
                  "discipline": {
                    "id": 1
                  }
                }
              }
            ]
          }
        ]
      },
    ]
  },
]
```

#### Get Tests by Teacher

- This route returns the tests filtered by Teachers-Categories;

```http
GET /tests/teachers
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**          |

```json
[
  {
    "id": 1,
    "name": "Diego Pinho",
    "categories": [
      {
        "id": 1,
        "name": "Projeto",
        "tests": []
      },
      {
        "id": 2,
        "name": "Prática",
        "tests": [
          {
            "id": 1,
            "name": "Test Example",
            "pdfUrl": "http://example.com",
            "teacherDiscipline": {
              "discipline": {
                "id": 1,
                "name": "HTML e CSS"
              }
            }
          }
        ]
      },
      {
        "id": 3,
        "name": "Recuperação",
        "tests": [
          {
            "id": 2,
            "name": "Test Example",
            "pdfUrl": "http://example.com",
            "teacherDiscipline": {
              "discipline": {
                "id": 1,
                "name": "HTML e CSS"
              }
            }
          }
        ]
      }
    ]
  },
]
```

### NOTES

When a request returns an error, the response is a json:

```json
{
  "name": "Error Name",
  "message": "Error Details"
}
```

## Running the Project

1. Clone the repository:

    ```bash
    git clone https://github.com/akiraTatesawa/repoprovas.git
    ```

2. Navigate to the project directory:

    ```bash
    cd repoprovas/
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set your environment variables following the .env.sample file:

    | Name              | Type     |
    | :--------------- | :------- |
    | `DATABASE_URL`   | `string` |
    | `PORT`           | `number` |
    | `JWT_SECRET`     | `number` |

   ```ts
    PORT=
    DATABASE_URL=
    JWT_SECRET=
   ```

5. Run the prisma migrations command:

   ```bash
   npx prisma migrate dev
   ```

   *This will automatically execute the `npx prisma db seed` command*

6. Run the project on dev mode:

    ```bash
    npm run dev
    ```

## Testing the API

### Endpoints (Thunder Client)

1. Import the collection and environments on the `thunderclient/` directory;
2. Set the `URL` environment variable on the Thunder Client DEV env;
3. Go to the RepoProvas collection and you are ready to use the API!

### Jest

1. Create a `.env.test` file and set your testing database url `DATABASE_URL`;
2. Run the command:

    ```bash
    npm run test
    ```  
