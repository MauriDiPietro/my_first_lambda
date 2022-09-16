import User from '../domain/model/user';
import {_saveUser} from '../interactors';
import { localresponse, response } from "../../lib/localResponse";

const processUser = async (urData: any): Promise<localresponse> => {
    console.log('urData', urData);
    const procesTitle = "Process User";
    const msg = "User process FAILS";
    const statusCode = 404;
    const resp = new response(procesTitle, msg, "");
    const result = new localresponse(statusCode, resp);

    const objUser = new User();
    objUser.ur2obj(urData);
    console.log('objUser', objUser);
    const validateObjUser = objUser.validate();
    
    if(!validateObjUser){
        result.status = statusCode  //404
        result.response.msg = msg   
        return result;              //statusCode, resp
    } 

    await _saveUser(objUser)
    result.status = 200;
    result.response.msg = 'User saved OK';
    return result;

}

export default processUser;

