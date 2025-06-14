import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();

//DISPLAY ALL PRODUCTS
router.get("/" ,getProducts);

//CREATE 
router.post("/", createProduct);

//update 
router.put("/:id",updateProduct);

//DELETE
router.delete("/:id" ,deleteProduct);

export default router;
