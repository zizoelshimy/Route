import { UserModel } from "../../DB/models/index.js";
import { connectDB } from "../../DB/database.connection.js";

export const signup = async (input) => {
  const { fullName, email, password, DOB } = input;
  //this is the way to create user instance and save to data base by three different methods (new ,build,create)
  //const user = new UserModel({fullName,email,password,DOB});
  //await user.save({ validate: false });
  //const user =  UserModel.build({fullName,email,password,DOB});
 // await user.save({ validate: false });
 //creat is short hand for build and save in one step 
 const user = await UserModel.create(input,{ fields:["firstName","middleName","lastName","email","password","gender","DOB"] }); //this method create and save in one step and save in the database what i want by feilds option 
 //bulk create is used to create multiple records at a time
 //const user = await UserModel.bulkCreate(input,{ fields:["firstName","middleName","lastName","email","password"] });
 return user;
};

