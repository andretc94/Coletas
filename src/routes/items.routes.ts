import { Router } from "express";
import ItemController from "../controllers/itemController";
const itensRouter = Router();

const itemController = new ItemController();

itensRouter.get('/', itemController.index);

export default itensRouter;