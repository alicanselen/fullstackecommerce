import { Router } from "express";
import { createOrder } from "./ordersControllers.js";
import { validateData } from "../../middlewares/validatinMiddleware.js";
import { insertOrderSchema, insertOrderWithItemsSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post(
    '/',
    verifyToken,
    validateData(insertOrderWithItemsSchema),
    createOrder
  );

export default router;