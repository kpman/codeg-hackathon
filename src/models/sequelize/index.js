import fs from 'fs';
import path from 'path';

import Sequelize from 'sequelize';

import dbConfigs from '../../../config/database';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = dbConfigs[env];
const db = {};

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .filter(file => file !== 'console.js') // FIXME
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  if (db[modelName].attachScope) {
    db[modelName].attachScope(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

export const User = db.User;
export const Relation = db.Relation;
export const Message = db.Message;
export const Code = db.Code;
