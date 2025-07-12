import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  logging: true,
  transactionType: 'IMMEDIATE',
});

export default sequelize;

