import { ProductModel } from "../../DB/model/index.js";
import { UserModel } from "../../DB/model/index.js";    

export const listProducts=async ()=>{
    const products = await ProductModel.find({}).populate("createdBy")
}

export const creatProduct=async (inputs)=>{
const {createdBy,name,price}=inputs
const user = await UserModel.findById(createdBy)
if(!user){
    throw new Error("Invalid User ID", {cause: {statuseCode: 404}})
}
const [product]=await ProductModel.create([{createdBy,name,price}]);
return product;
}