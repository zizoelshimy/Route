//recive the incoming request as HTTP and sent back to client 
import { Router } from "express";
import { signup } from "./auth.service.js";
const router = Router();
router.post('/signup',async (req, res) => {
   const result = await signup(req.body);
   return res.status(201).json({ message: "Done-signup", data:result });
}); 
router.post('/login', (req, res) => {
    const result = login(req.body);
    return res.status(201).json({ message: "Done-login", data:result});
});
export default router;