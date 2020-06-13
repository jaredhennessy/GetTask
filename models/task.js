module.exports = function(sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    estCompletion: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      as: "creator",
      foreignKey: "creatorId"
    });
    Task.belongsTo(models.User, {
      as: "assignee",
      foreignKey: "assigneeId"
    });
  };

  return Task;
};