import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.index);
userRouter.post('/', userController.create);
userRouter.post('/login', userController.login);

export default userRouter;