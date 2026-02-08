import { Router } from "express";
import { creatProduct, listProducts } from "./product.service.js";
import { succesResponse } from "../../common/utils/index.js";
const router=Router();
router.post("/" , async (req,res,next)=>{
    const product = await creatProduct(req.body) 
    return succesResponse({res, data:{product}})

})
router.get("/" , async (req,res,next)=>{
    const products = await listProducts() 
    return succesResponse({res, data:{product}})

})
 export default router