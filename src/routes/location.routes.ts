import { Router } from "express";
import LocationController from "../controllers/locationController";
import multer from "multer";
import multerConfig from "../config/multer";
import multerValidate from "../middlewares/multerValidate";
import authentication from "../middlewares/authentication";

const locationRouter = Router();

locationRouter.use(authentication);

const locationController = new LocationController();

const upload = multer(multerConfig);

locationRouter.get("/", locationController.index);
locationRouter.post("/", locationController.create);
locationRouter.put("/:id", multerValidate.multerValidate, upload.single("image"), locationController.update);

export default locationRouter;
