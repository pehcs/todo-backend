import jwt from "jsonwebtoken";

async function userAuth(req,res,next){

  const cookies = req.cookies['access-token']
  console.log(cookies)

  await jwt.verify(cookies, process.env.SECRET_KEY, (error, decoded) => {
      if(error){
        res.redirect('/user/login')
        console.log("Token error")
        return
        next()
      }
      if(decoded){
        console.log("Token decoded")
        next()
      }
    })

}

export default userAuth