import { Router } from "express";
import { createUserSchema, loginSchema, usersTable } from "../../db/usersSchema.js";
import { validateData } from "../../middlewares/validatinMiddleware.js";
import bcrypt from 'bcryptjs'
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken'

const router = Router();

router.post('/register' ,validateData(createUserSchema), async (req,res) =>{
    try{
        const data = req.cleanBody;
        data.pasword =await bcrypt.hash(data.pasword , 10);
    
        const [user] = await db
        .insert(usersTable)
        .values(data)
        .returning();

        //@ts-ignore
        delete user.pasword ;
    
        res.status(201).json({user});
    }catch(e){
        res.status(500).send('Bir seyler ters gitti !!!')
    }
})

router.post('/login' ,validateData(loginSchema) , async (req,res) =>{
    try{

        const {email , pasword} = req.cleanBody;

        const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email , email));

        if(!user){
            res.status(401).json({error :  'Authentication Failed '});
            return;
        }
        const matched = await bcrypt.compare(pasword , user.pasword);

        if(!matched){
            
            res.status(401).json({error :  'Authentication Failed '});
            return;
        }

        //create a jwt token

        const token = jwt.sign(
            {userId:user.id ,role: user.role} , 
            'your-secret' , 
            {expiresIn:'30d'}
        );
        //@ts-ignore
        delete user.pasword;
        res.status(200).json({token , user});
        

    }catch(e){
        res.status(500).send('Bir seyler ters gitti !!!')
    }
    
})

export default router;