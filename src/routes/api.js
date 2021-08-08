import express from "express";
import validate from "express-validation";
import apiMiddleware from "../middleware/apiAuth";
import * as userController from "../controllers/user/user.controller";
import * as userValidator from "../controllers/user/user.validator";
import * as ordersController from "../controllers/orders/orders.controller";
import * as productController from "../controllers/product/product.controller";
import * as categoryController from "../controllers/category/category.controller";

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get("/me", apiMiddleware, userController.profile);
router.get("/product/list", apiMiddleware, productController.list);
router.get("/order/list", apiMiddleware, ordersController.list);
router.post("/create-order", apiMiddleware, ordersController.create);
router.post("/Close-order/:id", ordersController.cancelOrder);
router.get("/category/list", apiMiddleware, categoryController.list);
// router.post(
//   '/changePassword',
//   validate(userValidator.changePassword),
//   userController.changePassword,
// );
//= ===============================
router.post("/login", validate(userValidator.login), userController.login);
router.post("/register", validate(userValidator.register), userController.register);

module.exports = router;
