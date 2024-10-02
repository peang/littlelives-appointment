'use strict';

const tableName = 'holidays';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .createTable(tableName, {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        date: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        remarks: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      })
      .then(() => {
        return queryInterface.addIndex(tableName, ['date'], {
          name: 'index_date',
        });
      });
  },

  async down(queryInterface) {
    return queryInterface
      .removeIndex(tableName, 'index_date')
      .then(() => queryInterface.dropTable(tableName));
  },
};
