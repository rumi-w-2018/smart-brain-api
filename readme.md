# smart-brain-api

## Node, Express, PostgreSQL

Routes

###/user/register

Paremeters<br>

- "email"
- "name"
- "password"

Returns:

- name
- email
- token

## /user/signin

- "email"
- "password"

Returns:

- token
- id
- name
- email
- useagecount
- joind (Date)

## /user/image

- "email"
- "token"

Returns:

- usagecount(updated)
