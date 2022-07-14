import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('user_database', 'root', 'y902mt12', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;