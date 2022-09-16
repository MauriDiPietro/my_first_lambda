import userRepository from '../core/repositories/user.repository';
import { localresponse, response } from '../lib/localResponse';
import User from '../core/domain/model/user';
import userManager from './manager/userPG';

export default class UserDS implements userRepository { //-> interface

    public async save(_user: User): Promise<localresponse>{
        const processTitle = 'Save User'
        const msg = 'User Save FAILS'
        const statusCode = 404
        const resp = new response(processTitle, msg, '')
        const result = new localresponse(statusCode, resp)
        try {
            const user = new userManager()
            const res: number = await user.store(_user)
            console.log('res', res)
            if (res >= 0){
                result.status = 200
                result.response.msg = 'User Saved OK'
            }
        } catch (error) {
            console.log(error)
            result.response.msg = JSON.stringify(error)
        }
        return result;
    }
}
