import express from "express";
import * as userController from "../controllers/user/user.controller";
import * as categoryController from "../controllers/category/category.controller";
import * as driverController from "../controllers/driver/driver.controller";
import * as productController from "../controllers/product/product.controller";
import * as ordersController from "../controllers/orders/orders.controller";

// const multer = require("multer");
// const path = require("path");

const router = express.Router();
import UploadImage from "../middleware/UploadImage";
// import {localUpload} from "../middleware/multer";

// // menentukan lokasi pengunggahan
// const diskStorage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, path.join(__dirname, "src/public/images"));
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
// 	},
// });

//= ===============================
// Admin routes
//= ===============================
router.get("/user/list", userController.list);
router.post("/user/create", userController.create);
router.put("/user/update/:id", userController.update);
router.delete("/user/delete/:id", userController.deleted);

router.get("/category/list", categoryController.list);
router.post("/category/create", categoryController.create);
router.put("/category/update/:id", categoryController.update);
router.delete("/category/delete/:id", categoryController.deleted);

router.get("/driver/list", driverController.list);
router.post("/driver/create", driverController.create);
router.put("/driver/update/:id", driverController.update);
router.delete("/driver/delete/:id", driverController.deleted);

router.get("/product/list", productController.list);
router.post("/product/create", UploadImage.single("image"), productController.create);
router.put("/product/update/:id", UploadImage.single("image"), productController.update);
router.delete("/product/delete/:id", productController.deleted);

router.get("/order/list", ordersController.list);
// router.post("/order/create", ordersController.create);
router.put("/order/update/:id", ordersController.update);
router.post("/order/Close-order/:id", ordersController.cancelOrder);
router.delete("/order/delete/:id", ordersController.deleted);

module.exports = router;
