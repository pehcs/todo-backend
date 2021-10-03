import pkg from 'sequelize'

const { Sequelize } = pkg

const db = new Sequelize('db_todo','postgres','87728810',{
    host: 'localhost',
    dialect: 'postgres',
    
})

export default db

