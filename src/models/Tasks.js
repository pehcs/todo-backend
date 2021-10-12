import pkg from 'sequelize'
import db from '../database.js'

const { DataTypes, Sequelize } = pkg

const Tasks = db.define('Task',{
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    task:{
        type: DataTypes.TEXT
    },
    deadline: {
        type: DataTypes.BOOLEAN
    },
    finished: {
        type: DataTypes.DATE
    }
})
//inverter o deadline


export default Tasks


