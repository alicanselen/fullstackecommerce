import { Router } from "express";
import { listProducts ,getProductById ,updateProduct , createProduct , deleteProduct} from "./productsController";
import { validateData } from "../..//middlewares/validatinMiddleware";
import { createProductSchema , updateProductSchema} from "../../db/productsSchema";

const router= Router();

router.get('/' , listProducts);
router.get('/:id' ,getProductById);
router.post('/',validateData(createProductSchema), createProduct);
router.put('/:id' ,validateData(updateProductSchema), updateProduct);
router.delete('/:id' , deleteProduct);

export default router;
