import knex from "../database/connection";
import IUser from "../interfaces/user";
import { hash, compare } from "bcryptjs";
import ILogin from "../interfaces/login";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";

export default class UserModel {
  public async getAll() {
    const users = await knex("users").select();
    return users;
  }

  public async create({ name, email, password }: IUser) {
    const userExists = await knex("users").where({ email }).first();

    if (userExists) {
      return { message: "Email exists in database!" };
    }

    const passwordHash = await hash(password, 8);

    const newUser = { name, email, password: passwordHash };

    const [id] = await knex("user").insert(newUser);

    return { ...newUser, id };
  }

  public async authenticate({ email, password }: ILogin){
    const user = await knex("users").where({email}).first();

    if(!user){
      return {message: "authenticate fail"};
    }

    if(!await compare(password, user.password)){
      return {message: "authenticate fail"};
    }

    const token = sign({id: user.id, name: user.name}, authConfig.jwt.secret, {
      subject: String(user.id),
      expiresIn: authConfig.jwt.expiresIn
    });

    delete user.password;
    user.token = token;

    return user;
  }
}
