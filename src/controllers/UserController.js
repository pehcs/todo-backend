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
    try {
      const userInfo = await User.findAll({
        raw: true,
        plain: true,
        where: {
          email: userData.email,
        },
        attributes: ["id"],
      });
      console.log(userInfo);
      if (!userInfo) {
        await User.create({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        });
      } else {
        res.status(403).end();
        console.log("Usuário já existe");
      }

      const token = await jwt.sign(userInfo.id, process.env.SECRET_KEY);

      res.writeHead(201, {
            "Set-Cookie": `access-token=${token};`,
            "Access-Control-Allow-Credentials": "true",
          })
    } catch (e) {
      console.log("Error: " + e.message);
    }
  },

  async login(req, res) {
    const userData = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const userCredentials = await User.findAll({
        raw: true,
        plain: true,
        where: {
          email: userData.email,
        },
        attributes: ["email", "password", "id"],
      });
      if (!userCredentials) {
        console.log("valor nulo", userCredentials);
        res.status(403).json({
          error: "Credenciais não existem",
        });
        return;
      }
      if (await bcrypt.compare(userData.password, userCredentials.password)) {
        const token = await jwt.sign(
          userCredentials.id,
          process.env.SECRET_KEY
        );
        res.status(201).cookie('access-token', token).end();
      } else {
        res.status(403).end();
        console.log("Credenciais invalidas");
      }
    } catch (e) {
      console.log("Error: " + e.message);
    }
  },
};

export default UserController;
