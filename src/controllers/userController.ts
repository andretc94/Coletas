import { Request, Response } from "express";
import ILogin from "../interfaces/login";
import IUser from "../interfaces/user";
import UserModel from "../models/UserModel";

export default class UserController {
  public async index(req: Request, res: Response) {
    const userModel = new UserModel();

    const users = await userModel.getAll();

    res.json(users);
  }

  public async create(req: Request, res: Response) {
    const userModel = new UserModel();
    
    const { name, email, password } = req.body;

    const userRequest:IUser = {
        name, email, password
    }

    const user = await userModel.create(userRequest);

    return res.json(user);
  }

  public async login(req: Request, res: Response) {
    const userModel = new UserModel();
    
    const { email, password } = req.body;

    const reqLogin: ILogin = {email, password}

    const user = await userModel.authenticate(reqLogin);

    res.json(user);
  }
}
