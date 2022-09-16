import userRepository from '../repositories/user.repository';
import { localresponse, response } from "../../lib/localResponse";
import User from '../domain/model/user';

const saveUserInteractor = (userRepository: userRepository)=>{
    return async (_user:User):Promise<localresponse> => {
        const processTitle = 'Save User'
        const msg = 'User Save FAILS'
        const resp = new response(processTitle, msg, '')
        let result = new localresponse(404, resp)
        result = await userRepository.save(_user)
        return result;
    }
}

export default saveUserInteractor;