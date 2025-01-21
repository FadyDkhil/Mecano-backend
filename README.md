# API Endpoints

## User Authentication

### Signup
- **Method:** POST  
- **URL:** `https://mecano-backend.onrender.com/user/signup`  
- **Body:**  
  ```json
  {
    "email": "", // string
    "password": "" // string
  }
  ```
- **Response:** Returns a token (to use for session)

### Signin
- **Method:** POST  
- **URL:** `https://mecano-backend.onrender.com/user/signin`  
- **Body:**  
  ```json
  {
    "email": "", // string
    "password": "" // string
  }
  ```
- **Response:** Returns a token (to use for session)

---

## User Profile

### Create Profile
- **Method:** POST  
- **URL:** `https://mecano-backend.onrender.com/user/profile`  
- **Body:**  
  ```json
  {
    "firstname": "", // string
    "lastname": "", // string
    "birthDate": "", // date
    "gender": "" // string, accepts only "male" or "female"
  }
  ```


### Get My Info
- **Method:** GET  
- **URL:** `https://mecano-backend.onrender.com/user/me`  
- **Description:** Get the logged in user informations.
-  **Exemple Response Body:**  
  ```json
{
  "id": "5ff49497-d130-46ba-921d-087f95471b79",
  "email": "user@gmail.com",
  "phone": "",
  "signInAt": "2025-01-21T21:54:42.256+01:00",
  "status": "inactive",
  "recoveryCode": null,
  "createdAt": "2025-01-21T20:54:29.355Z",
  "updatedAt": "2025-01-21T19:54:42.258Z",
  "profile": {
    "firstName": "user",
    "lastName": "user",
    "birthDate": "1998-10-10T00:00:00",
    "gender": "male",
    "cv": null,
    "profilePicture": null,
    "createdAt": "2025-01-21T20:54:59.758241",
    "updatedAt": "2025-01-21T20:54:59.758241"
  }
}


---

## Vehicle Management

### Add Vehicle
- **Method:** POST  
- **URL:** `https://mecano-backend.onrender.com/vehicle/add`  
- **Body:**  
  ```json
  {
    "model": "model", // string
    "licensePlate": "XXX TST XXX" // string
  }
  ```

### Update Vehicle
- **Method:** PUT  
- **URL:** `https://mecano-backend.onrender.com/vehicle/update`  
- **Body:**  
  ```json
  {
    "model": "model", // string
    "licensePlate": "XXX TST XXX" // string
  }
  ```

---

## Mechanic Requests

### Request to Become a Mechanic
- **Method:** POST  
- **URL:** `https://mecano-backend.onrender.com/user/become`  
- **Body:**  
  ```json
  {
    "cv": "" // string
  }
  ```
- **Description:** User uses this endpoint to request to become a mechanic.


### View Users that applied to be a mechanic 
- **Method:** GET  
- **URL:** `https://mecano-backend.onrender.com/mechanic/getMechanicRequests`  
- **Description:** Admin uses this endpoint to view all users who have pending request to become a mechanic.
-  **Exemple Response Body:**  
  ```json
[
  {
    "id": "b0f1ace8-38f8-4e00-8d25-61ee21751c34",
    "userId": "ac10b02f-b508-40f6-8a25-c28b6b5b6a79",
    "cv": "cv.pdf",
    "status": "pending",
    "profile": {
      "firstName": "mechanic",
      "lastName": "mechanic",
      "birthDate": "1998-10-10T00:00:00",
      "gender": "male",
      "profilePicture": null,
      "createdAt": "2025-01-21T22:32:03.775491",
      "updatedAt": "2025-01-21T22:32:03.775491"
    }
  }
]
  ```

### Approve Mechanic Request
- **Method:** POST  
- **URL:** `https://mecano-backend.onrender.com/user/approve/:id`  
- **Body:**  
  ```json
  {
    "status": "" // string, can only be: "accepted" or "rejected"
  }
  ```
- **Description:** Admin uses this endpoint to accept or decline a user request to become a mechanic.


---

## User Requesting Mechanic

### Get available mechanics 
- **Method:** GET  
- **URL:** `https://mecano-backend.onrender.com/mechanic/getMechanics`  
- **Description:** User uses this endpoint to search for a mechanic.
-  **Exemple Response Body:**  
  ```json
 [
  {
    "id": "5ff49497-d130-46ba-921d-087f95471b79",
    "email": "user@gmail.com",
    "phone": "",
    "averageRate": null,
    "profile": {}
  }
]
  ```

### Requesting a mechanic to fix car
- **Method:** POST  
- **URL:** `/mechanic/create`  
-  **Body:**  
  ```json
  {
    "mechanicId": "" // string
    "location": "" //nullable string
    "reason": "" //nullable string
  }
  ```
- **Description:** after clicking on mechanic to request his help, we use this endpoint to create a request for the mechanic that he will see and accept it or reject it.

###  Mechanic viewing his requests to fix a car
- **Method:** GET  
- **URL:** `https://mecano-backend.onrender.com/mechanic/getMyRequests`  

- **Description:** screen for the mechanic to view who needs his help.
-  **Exemple Response Body:**  
  ```json
  [
  {
    "id": "4b40704c-bfe5-478a-9a97-1cf32cfc7ea7",
    "userId": "4deae9e2-ea87-4164-805d-9a1041364696",
    "mechanicId": "ac10b02f-b508-40f6-8a25-c28b6b5b6a79",
    "location": "loc",
    "reason": "reason",
    "profile": {
      "gender": "male",
      "lastName": "user",
      "birthDate": "1998-10-10T00:00:00",
      "createdAt": "2025-01-21T22:31:32.437458",
      "firstName": "user",
      "updatedAt": "2025-01-21T22:31:32.437458",
      "profilePicture": null
    },
    "vehicle": {
      "id": "cabec661-c070-47c2-8ad8-d4891a87d3b2",
      "model": "model",
      "licensePlate": "XXX TST XXX"
    }
  }
]
  ```

### Mechanic accepting or rejecting a user request to fix his car
- **Method:** POST  
- **URL:** `https://mecano-backend.onrender.com/mechanic/update/:id`  
-  **Body:**  
  ```json
  {
    "status": "" // string that can only be accepted or rejected
  }
  ```
- **Description:** after clicking on the request from previous endpoint to view the problem and the car of the user needing help the mechanic chooses here to accept or deny the request. the id of the mechanic request that we will update it status will be passed through the parameter

