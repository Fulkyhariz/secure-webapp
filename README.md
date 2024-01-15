# secure-webapp



## Prepartion
Edit **.env.example** file according to your desire, change the file name to **.env**

Make sure the you fill all env variable, example:
```bash
# database
MYSQL_DATABASE=secure_webapp
MYSQL_USER=randomuser
MYSQL_PASSWORD=randompassword
MYSQL_ROOT_PASSWORD=randompassword
MYSQL_HOST=172.27.94.244
MYSQL_PORT=3306
MYSQL_ROOT_HOST= '%'
# json web token
ACCESS_SECRET_KEY= randomsecret
REFRESH_SECRET_KEY= randomsecret2
ACCESS_EXPIRY= 600
REFRESH_EXPIRY= 86400
```

## Installation

```bash
# Install node module
$ npm install

# Install and Run database
$ sudo docker compose up
```

## Running the app

```bash
$ npm start
```
## API Documentation

https://documenter.getpostman.com/view/31170822/2s9YsQ6oj2

The documentation provide example as well as case that is handled by the application and their respective error message, you can try the api directly from the documentation by creating a postman environment and adding host variable, the variable corespond to which host api is running (for example localhost:3000)