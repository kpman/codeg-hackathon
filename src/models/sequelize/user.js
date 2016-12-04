exports = module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    messengerId: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'messenger_id',
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    relation: {
      // 1: single
      // 2: connected
      // 3: secret_mode
      // 4: block_partner
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    tableName: 'users',
  });
  return User;
};
