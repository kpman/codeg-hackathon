module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      senderId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'sender_id',
      },
      receiverId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'receiver_id',
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('messages');
  },
};
