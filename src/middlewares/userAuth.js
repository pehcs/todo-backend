import User from '../models/User.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function userAuth(req,res,next){

  const authorization = req.headers['access-control-allow-credentials']
  const cookies = req.cookies['access-token']
  console.log(cookies)

    const verifyToken =  await jwt.verify(cookies, process.env.SECRET_KEY, (error, decoded) => {
      if(error){
        res.redirect('/user/login')
        console.log("Token error")
      }
      if(decoded){
        console.log("Token decoded")
        next()
      }
    })

  
    // const userData = {
    //     email: req.body.email,
    //     password: req.body.password,
    //   };
    //   try {
    //     const userCredentials = await User.findAll({
    //       raw: true,
    //       plain: true,
    //       where: {
    //         email: userData.email,
    //       },
    //       attributes: ["email", "password", "id"],
    //     });
    //     if (!userCredentials) {
    //       console.log("valor nulo", userCredentials);
    //       res.status(403).json({
    //         error: "Credenciais não existem",
    //       });
    //       next()
    //       return;
    //     }
    //     if (await bcrypt.compare(userData.password, userCredentials.password)) {
    //       const token = await jwt.sign(
    //         userCredentials.id,
    //         process.env.SECRET_KEY
    //       );
    //       res
    //         .writeHead(201, {
    //           "Set-Cookie": `token=${token};`,
    //           "Access-Control-Allow-Credentials": "true",
    //         })
    //         .end();
    //         next()
    //     } else {
    //       res.status(403).end();
    //       console.log("Credenciais invalidas");
    //       next()
    //     }
    //   } catch (e) {
    //     console.log("Error: " + e.message);
    //   }
}

export default userAuth