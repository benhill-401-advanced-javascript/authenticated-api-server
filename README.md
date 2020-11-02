# Authenticated-API-Server

### Author: Ben Hill

### Setup

Add following values to .env file:

PORT= (pick a port number)
MONGODB_URI=mongodb://localhost:27017/authenticated-api-server
SECRET= pick a secret word
CLIENT_ID= get this from github
CLIENT_SECRET= get this from github
STATE= pick anything you want
TOKEN_SERVER=https://github.com/login/oauth/access_token
REDIRECT_URI=http://localhost:3000/oauth
REMOTE_API=https://api.github.com/user

## How to initialize/run application

- Clone repository
- In the CLI enter: \$npm init -> npm install (to download needed dependencies) -> node index.js

## Dependencies

- base-64
- bcrypt
- chalk
- cors
- dotenv
- express
- jswonwebtoken
- mongoose
- mongoose-schema-jsonschema
- superagent
