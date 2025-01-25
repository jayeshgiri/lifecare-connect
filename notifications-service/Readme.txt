Below steps needs to perfrom

lifecare-connect\notifications-service

yarn install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all

// Creating New service
yarn add express sequelize pg pg-hstore dotenv body-parser cors @sendgrid/mail handlebars lodash joi http-status winston
make sure http-status verions is "http-status": "^1.7.4",
yarn add --dev nodemon sequelize-cli
create .sequelizerc file
npx sequelize-cli init
create other files or copy past from this projects
