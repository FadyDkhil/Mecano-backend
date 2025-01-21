# API Endpoints

## User Authentication

### Signup
- **Method:** POST  
- **URL:** `/user/signup`  
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
- **URL:** `/user/signin`  
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
- **URL:** `/user/profile`  
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
- **URL:** `/user/me`  
- **Description:** Get the logged in user informations.


---

## Vehicle Management

### Add Vehicle
- **Method:** POST  
- **URL:** `/vehicle/add`  
- **Body:**  
  ```json
  {
    "model": "model", // string
    "licensePlate": "XXX TST XXX" // string
  }
  ```

### Update Vehicle
- **Method:** PUT  
- **URL:** `/vehicle/update`  
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
- **URL:** `/user/become`  
- **Body:**  
  ```json
  {
    "cv": "" // string
  }
  ```
- **Description:** User uses this endpoint to request to become a mechanic.


### View Users that applied to be a mechanic 
- **Method:** GET  
- **URL:** `/mechanic/getMechanicRequests`  
- **Description:** Admin uses this endpoint to view all users who have pending request to become a mechanic.

### Approve Mechanic Request
- **Method:** POST  
- **URL:** `/user/approve/:id`  
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
- **URL:** `/mechanic/getMechanics`  
- **Description:** User uses this endpoint to search for a mechanic.

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
- **URL:** `/mechanic/getMyRequests`  

- **Description:** screen for the mechanic to view who needs his help.

### Mechanic accepting or rejecting a user request to fix his car
- **Method:** POST  
- **URL:** `/mechanic/update/:id`  
-  **Body:**  
  ```json
  {
    "status": "" // string that can only be accepted or rejected
  }
  ```
- **Description:** after clicking on the request from previous endpoint to view the problem and the car of the user needing help the mechanic chooses here to accept or deny the request. the id of the mechanic request that we will update it status will be passed through the parameter

