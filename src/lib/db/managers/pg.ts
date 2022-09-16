import DBAdapter from "../adapters/DBAdapter";
const { Pool } = require("pg");

class Pg implements DBAdapter {
  private pool: any;
  private static instance: Pg;

  private constructor(
    host: string,
    user: string,
    password: string | undefined,
    dbName: string,
    port: number
  ) {}

  public static async getInstance(
    host: string,
    user: string,
    password: string | undefined,
    dbName: string,
    port: number
  ): Promise<DBAdapter> {
    if (!Pg.instance) {
      Pg.instance = new Pg(host, user, password, dbName, port);
      Pg.instance.pool = await new Pool({
        user: user,
        host: host,
        database: dbName,
        password: password,
        port: port,
      });
    }
    return Pg.instance;
  }

  public async exec(query: string): Promise<any> {
    const result = await this.pool.query(query);

    return result.rows;
  }
}

export default Pg;
