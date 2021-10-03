import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const UserController = {
  async createUser(req, res) {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    };
    
    await User.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }).then(async () => {
      await User.findAll({
        raw: true,
        plain: true,
        where: {
          email: userData.email,
        },
        attributes: ["id"],
      }).then(async (result)=>{
          console.log(result)
        const token = await jwt.sign(result.id, process.env.SECRET_KEY);
        res.writeHead(201, {
            "Set-Cookie": `token=${token};`,
            "Access-Control-Allow-Credentials": "true",
            })
            .end();
      })
    }).catch(e=>{
        console.log(`Email já cadastrado: ${e}`)
        res.status(403).end()
    })
  },

  async login(req, res){

    const userData = {
      email: req.body.email,
      password: req.body.password
    }

    await User.findAll({
      raw: true,
        plain: true,
        where: {
          email: userData.email,
        },
        attributes: ["email","password","id"]
    }).then(async (result) => {
      if(!result){
        console.log("valor nulo",result)
        res.status(403).json({
          error: "Credenciais não existem"
        })
        return
      }
      if(await bcrypt.compare(userData.password, result.password)){
        const token = await jwt.sign(result.id, process.env.SECRET_KEY)
        res.writeHead(201, {
          "Set-Cookie": `token=${token};`,
          "Access-Control-Allow-Credentials": "true",
          })
          .end();
      }else{
        res.status(403).end()
        console.log("Credenciais invalidas")
      }

    }).catch(e=>{
      console.log(e)
    })
  }
};

export default UserController;
