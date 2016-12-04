exports = module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    senderId: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'sender_id',
    },
    receiverId: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'receiver_id',
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    type: {
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
    tableName: 'messages',
  });
  return Message;
};
