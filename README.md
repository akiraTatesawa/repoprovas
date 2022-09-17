# RepoProvas 📝

## Table of Contents

- [RepoProvas 📝](#repoprovas-)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
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
  - [Notes](#notes)

## Description

**RepoProvas** is a service for sharing tests between students. The user can search for old collage/school tests and add new ones to the system!

![status-finished](https://user-images.githubusercontent.com/97575616/152926720-d042178b-24c0-4d6b-94fb-0ccbd3c082cc.svg)

## Built With

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Features

## API Reference

### AUTHENTICATION

#### Sign Up

```http
POST /sign-up
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `email`          | `string` | **Required**          |
| `password`       | `string` | **Required** |
| `confirmPassword`       | `string` | **Required**, must be equal to `password` |

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
| `empty`          |   `200`    | **OK**          |
| `json`           |   `409`    | **Conflict**, user is already registered |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

#### Sign In

```http
POST /sign-in
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `email`          | `string` | **Required**          |
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
| `json`           |   `201`    | **Created**, returns a token          |
| `json`           |   `409`    | **Conflict**, user is already registered |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

```json
{
  "token": "JWT token"
}
```

## Notes

When a request returns an error, the response is a json: 

```json
{
  "name": "Unprocessable Entity",
  "message": "\"invalidField\" is not allowed"
}
```