Medical hospital

This project is part of CSCI361

This is the backend-part mainly REST-API of system
Project was writtten with Node.js, React.js, PostgeSQL

To run the project:
  1. install  Node.js
  2. npm install
  3. create tables using .sql file provided
 
Basic functionality for "admin" staff is finished. 
Mainly now admin staff can login and fo CRUD operations on "patient" and "doctor entities"

Routes:
  **[POST]** /api/auth/signin - for signin returns JWT after successful login to authenticate </br>
  Following routes can be accessed only by admin staff</br>
  **[POST]** /api/auth/signup - to register doctors and patients to the system</br>
  __CRUD__ for doctors</br>
  **[GET]** /api/data/doctors/all - returns JSON with all doctors and theid details</br>
  **[GET]** /api/data/doctor/:id - returnes JSON with detailes of doctor with articular **id**</br>
  **[PUT]** /api/data/doctor/:id - requests to update detailes of doctor with particular **id**</br>
  **[DELETE]** /api/data/doctor/:id - requests to delate doctor with particular **id** from system</br>
  __CRUD__ for patients</br>
  **[GET]** /api/data/patients/all - returns JSON with all patients and theid details</br>
  **[GET]** /api/data/patients/:id - returnes JSON with detailes of patient with articular **id**</br>
  **[PUT]** /api/data/patients/:id - requests to update detailes of patient with particular **id**</br>
  **[DELETE]** /api/data/patients/:id - requests to delate patients with particular **id** from system</br>
  
