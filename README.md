# micro-service
A simple example to learn microservice using express, RabbitMQ and Nodejs.

To use RabbitMQ with docker, just run the following command:

``` sh
$ docker run -d --hostname micro-service --name rabbit13 -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
```

To access RabbitMQ admin page: [http://localhost:8080/](http://localhost:8080/).

```
user:  guest
senha: guest
```

Now we are able to run ower api and microservice.

First clone this repository and enter it:
``` sh
$ git clone https://github.com/xdigu/micro-service
$ cd micro-service
```

Install all dependencies:
``` sh
$ yarn
```

Create database runing:
``` sh
$ npx sequelize-cli db:migrate
```

Run API:
``` sh
$ yarn dev:api
```

To test you can POST requisitions on [http://localhost:3333/users](http://localhost:3333/users) with a body that contains a user with name and email.

``` json 
{
    "user": {
        "name": "user name",
        "email": "user email"
    }
}
```

Now start microservice and than ower service will create all users that is in the line.

``` sh
$ yarn dev:service
```

To check all the users registered do a GET on [http://localhost:3333/users](http://localhost:3333/users).

if you want scale, you can run as many services as you want and all than will consume the line.
