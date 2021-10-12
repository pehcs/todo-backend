import pkg from 'sequelize'
import db from '../database.js'
import Tasks from './Tasks.js'
const { DataTypes } = pkg

const User = db.define('User',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.TEXT,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
})
User.hasMany(Tasks)
Tasks.belongsTo(User)

export default User