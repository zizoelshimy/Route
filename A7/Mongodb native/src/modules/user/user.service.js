import { ObjectId } from 'mongodb'
import {userCollection, users} from '../../DB/model/index.js'
export const profile   = async (id)=>{
    const user = await userCollection.findOne({_id:ObjectId.createFromHexString(id)})
    if(!user){
        throw new Error("Invalid Account Id",{cause:404})
    }
    return user
}
export const allUsers   = async (id)=>{
    const count = await userCollection.countDocuments()
    const user = await userCollection.find({}).toArray()
    return {count,user}
}
export const updateProfile   = async (id, updateData)=>{
     const updatedUser = await userCollection.updateOne(
        {_id: ObjectId.createFromHexString(id)},
        { $set: updateData }
    );
    if(!updatedUser.matchedCount){
        throw new Error("Invalid Account Id",{cause:404})
    }
   
    return updatedUser;
}
export const deleteProfile   = async (id)=>{
     const deletedUser = await userCollection.deleteOne(
        {_id: ObjectId.createFromHexString(id)}
    );
    if(!deletedUser.deletedCount){
        throw new Error("Invalid Account Id",{cause:404})
    }
   
    return deletedUser;
}