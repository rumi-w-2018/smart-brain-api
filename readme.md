# smart-brain-api

## Node, Express, PostgreSQL

## Functions

- User registration
- User sign in
- Face detection on pictures - Uses the capability provided by clarifai API (https://clarifai.com/).
- User usage tracking

## Demo

The client application, <a href="https://rumi-w-2018.github.io/smart-brain/">smart-brain</a> demonstrates the use of this API. The information below can be used for demo.

Log In

- Email: demo@email.com
- Password: apple

Image URL

- https://samples.clarifai.com/face-det.jpg

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
