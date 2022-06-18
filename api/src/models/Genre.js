const { DataTypes, Sequelize } = require ('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('genre', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false
    })
}