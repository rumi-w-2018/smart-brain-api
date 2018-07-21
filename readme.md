# smart-brain-api

## Node, Express, PostgreSQL

## Functions

- User registration
- User sign in
- Face detection on pictures
- User usage tracking

## Demo

The client application, <a href="https://rumi-w-2018.github.io/smart-brain/">smart-brain</a> demonstrates the use of this API.

### **Routes**

### 1) /user/register

Paremeters:<br>

- email
- name
- password

Returns:

- user ID
- token

### 2) /user/signin

Paremeters:<br>

- email
- password

Returns:

- user ID
- token

### 3) /image

Paremeters:<br>

- "user ID"

Returns:

- face recognition boxes
