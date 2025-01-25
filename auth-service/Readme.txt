Below steps needs to perfrom

lifecare-connect\auth-service

yarn install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all

// Creating New service
yarn add express sequelize pg pg-hstore bcrypt jsonwebtoken dotenv body-parser cors
yarn add --dev nodemon sequelize-cli
create .sequelizerc file
npx sequelize-cli init
create other files or copy past from this projects
