import express from "express";
import validate from "express-validation";
import apiMiddleware from "../middleware/apiAuth";
import * as userController from "../controllers/user/user.controller";
import * as userValidator from "../controllers/user/user.validator";
import * as ordersController from "../controllers/orders/orders.controller";
import * as productController from "../controllers/product/product.controller";
import * as categoryController from "../controllers/category/category.controller";
import * as cartController from "../controllers/cart/cart.controller";

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get("/me", apiMiddleware, userController.profile);
router.post("/products", apiMiddleware, productController.productClient);
router.post("/order", apiMiddleware, ordersController.getCurrentOrder);
router.post("/create-order", apiMiddleware, ordersController.create);
router.post("/bulk-order", apiMiddleware, ordersController.bulkOrder);
router.put("/update-order/:id", apiMiddleware, ordersController.update);
router.post("/cancel-order/:id", ordersController.cancelOrder);
router.get("/category/list", apiMiddleware, categoryController.list);

router.get("/cart/list", apiMiddleware, cartController.list);
router.post("/cart/create", apiMiddleware, cartController.create);
router.put("/cart/update/:id", apiMiddleware, cartController.update);
router.delete("/cart/delete/:id", apiMiddleware, cartController.deleted);

// router.post(
//   '/changePassword',
//   validate(userValidator.changePassword),
//   userController.changePassword,
// );
//= ===============================
router.post("/login", validate(userValidator.login), userController.login);
router.post("/register", validate(userValidator.register), userController.register);

module.exports = router;
