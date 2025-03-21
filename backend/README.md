# User Registration Endpoint Documentation

## Endpoint
**POST** `/register`

## Description
This endpoint is used to register a new user in the system. It validates the input data, hashes the password, and stores the user information in the database.

## Request Body
The request body should be in JSON format and must include the following fields:

- **email** (string, required): A valid email address.
- **fullname** (object, required):
  - **firstname** (string, required): Must be at least 3 characters long.
  - **lastname** (string, optional): Must be at least 3 characters long if provided.
- **password** (string, required): Must be at least 6 characters long.

### Example Request Body
```json
{
  "email": "example@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securepassword"
}
```

## Response
### Success Response
- **Status Code**: `201 Created`
- **Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com",
      "socketid": null
    }
  }
  ```

### Error Responses
- **Status Code**: `400 Bad Request`
  - **Description**: Validation errors in the request body.
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **Status Code**: `500 Internal Server Error`
  - **Description**: Server encountered an unexpected condition.

## Notes
- The password is hashed before being stored in the database.
- The `token` in the response is a JWT used for authentication.
