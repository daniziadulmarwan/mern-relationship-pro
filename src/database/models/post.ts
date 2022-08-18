"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
  class Post extends Model {
    static associate(models: any) {
      this.belongsTo(models.User, { onDelete: "cascade" });
      this.belongsTo(models.Category, { onDelete: "cascade" });
    }
  }
  Post.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "cascade",
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
      underscored: true,
    }
  );
  return Post;
};
