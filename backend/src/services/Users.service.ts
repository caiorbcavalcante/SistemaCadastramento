import jwt from "jsonwebtoken";
import { User } from "../entities/User"
import { UserRepository } from "../repositories/Users.repositories"
import { EmailAlreadyExistsError } from "../errors/emailAlreadyExistsError";
const bcrypt = require('bcrypt');
import { barbersRouter } from "../routes/Barbers.routes";

export class UserService{
 
    userRepository:UserRepository

    constructor(userRepository = new UserRepository())
    {
        this.userRepository = userRepository
    }

    getUser = async (id_user:number):Promise<User | null> =>{
    return await this.userRepository.getUser(id_user)
    }

    getAllUser= async():Promise<User[] | null>=>{
        return await this.userRepository.getAllUser()
    }

    createUser=async(name:string,email:string, password:string, number:string):Promise<User> =>{
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser){
            throw new EmailAlreadyExistsError();
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User(name,email,passwordHash, number)
        return await this.userRepository.createUser(user as User)
    }

    updateUser= async(id:number,name:string, email:string, password:string, number:string):Promise<User | null>=>{
        let passwordHash: string | undefined;
        if (password) {
            const salt = await bcrypt.genSalt(12);
            passwordHash = await bcrypt.hash(password, salt);
        }
        return await this.userRepository.updateUser(id,name,email,number,passwordHash)
    }

    deleteUser=async(id_user:number):Promise<boolean>=>{
        return await this.userRepository.deleteUser(id_user)
    }

    getAutenticationByEmailPassword = async(email:string, password:string):Promise<User | null>=>{
        const user = await this.userRepository.getAutenticationByEmailPassword(email)

        if (!user) return null;

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) return null;

        return user
    }

    getToken = async(email:string, password:string):Promise<string>=>{
        const user = await this.getAutenticationByEmailPassword(email, password)

        if(!user){
            throw new Error ("Usuario ou senha invalidos")
    }
    const token = jwt.sign(
        {id_user:user.id_user, email:user.email, role:"user"},
        process.env.JWT_SECRET as string,
        {expiresIn:"1h"}
    )
    return token
    }
}