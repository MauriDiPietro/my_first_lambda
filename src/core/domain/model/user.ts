import UserInterface from "../interface/userInterface";
import defaultUsername from '../../../lib/defaultUsername'

export default class User implements UserInterface {

    user_id: string | undefined;
    name: string;
    email: string;

    public constructor( 
        user_id: string | undefined = '',
        name: string | undefined = '',
        email: string | undefined = ''
    ) {
        this.assingValues(          
            user_id,
            name,
            email
        );
    }

    public set({
        user_id,
        name,
        email
    }): void{
        this.assingValues(
            user_id,
            name,
            email
        )
    } 

    private assingValues(
        user_id: string,
        name: string,
        email: string
    ){
        this.user_id = user_id;
        this.name = name;
        this.email = email;
    }

    public ur2obj(ur:any){
        console.log('A---> ', this.user_id, this.name, this.email);
        this.user_id = ur.user_id;
        this.name = defaultUsername(ur.name);
        this.email = ur.email;
        console.log('B---> ', this.user_id, this.name, this.email);
    }

    validateUserId():boolean{
        return this.user_id ? true : false;
    }

    validateUserEmail():boolean{
        return this.email ? true : false;
    }

    validate():boolean{
        const validation = [
            this.validateUserId(),
            this.validateUserEmail()
        ]
        return validation.every((property:boolean)=>property === true) 
        ? true
        : false
    }

}