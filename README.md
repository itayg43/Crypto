# Crypto

https://itays-portfolio.vercel.app/projects/crypto

## Setup

### Server

1. open docker
2. open terminal and run:

```
docker run -p 3306:3306 --name crypto -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=crypto_db -d mysql/mysql-server
```

3. open terminal at the root project and run:

```
cd server/ && npm i && cd db/ && npx sequelize-cli db:migrate
```

4. create .env file in the server folder with the needed values (see .env.example file)

5. open terminal at the root project and run:

```
cd server/ && npm run dev
```

### Client

1. open terminal at the root project and run:

```
cd client && npm i && npx react-native start
```

2. open another terminal at the root project and run:

```
cd client && npx react-native run-ios
```
