import pkg from 'sequelize'
import db from '../database.js'

const { DataTypes } = pkg

const User = db.define('User',{
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

export default User