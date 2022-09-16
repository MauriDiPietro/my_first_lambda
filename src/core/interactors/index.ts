import saveUser from './saveUser.interactor';
import UserDS from '../../datasource/user.datasource';

const userRepository = new UserDS();

const _saveUser = saveUser(userRepository);

export { 
    _saveUser
}
