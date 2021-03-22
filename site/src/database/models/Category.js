module.exports = (sequelize, dataType) => {

    const alias = "Categories";

    const cols = {
        id: {
            type: dataType.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: dataType.STRING(30),
            allowNull: true
        },
        animal_id: {
            type: dataType.INTEGER,
            allowNull: true
        }
    }

    const config = {
        tableName: "category",
        timestamps: false,
    }

    const Category = sequelize.define(alias, cols, config)
    Category.associate = (models) => {

        Category.hasMany(models.SubCategories, {
            as: "subCategory",
            foreingKey: 'category_id'
        })
        Category.belongsTo(models.Animals, {
            as: "animal",
            foreingKey: 'animal_id'
        })
    }
    return Category
}