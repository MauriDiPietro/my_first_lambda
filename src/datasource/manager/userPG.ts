import DB from '../../lib/db/db';
import User from '../../core/domain/model/user';

export default class UserManager {
    private table = 'users';
    private resourceName = 'users';
    private db: DB;

    private strInsert = `INSERT INTO ${this.table} (user_id, email, name) VALUES ('#user_id', '#email', '#name')`;
    
    private async init(){
        this.db = await DB.getInstance(this.resourceName);
    }

    public async store(data: User){
        console.log('store', data)
        let resultData = -1
        try {
            await this.db.execQuery(this.strInsert, data);
            resultData = 0
        } catch (error) {
            console.log(error);
        }
        return resultData;
    }
}