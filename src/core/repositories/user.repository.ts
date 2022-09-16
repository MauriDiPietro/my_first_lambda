import { localresponse } from '../../lib/localResponse';
import User from '../domain/model/user';

export default interface UserRepository {
    save(provider: User): Promise<localresponse>  
}