//import Config from "../config/config";
//import { LocalCredential } from "../config/configInterface";
import DBAdapter from "./adapters/DBAdapter";
import Pg from "./managers/pg";
import Connection from "./interfaces/connection";
import { localresponse, response } from "../localResponse";
import secretManager from "../secretmanager/secretManaget";

class DB {
  private static instance: DB;
  private database: DBAdapter;
  resourceType = "database";
  credential: any;
  resp: localresponse;
  resourceData: any;
  //log: LogManager;

  private constructor(_resName: string) {
    this.resp = new localresponse(500, new response());
  }

  public static async getInstance(_resName: string) {
    if (!DB.instance) {
      DB.instance = new DB(_resName);
      let connection: Connection;
      try {
        if (process.env.ENV.toLowerCase().includes("dev")) {
          connection = {
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            dbName: process.env.DBNAME,
            port: parseInt(process.env.DBPORT),
          };
          DB.instance.resourceData = { dbType: process.env.DBTYPE };
        } else {
          const credentials = await secretManager(
            "us-west-2",
            `${_resName}-db-${process.env.ENV.toLowerCase()}-credentials`
          );
          DB.instance.credential = credentials;

          const resources = await secretManager(
            "us-west-2",
            `${_resName}-db-${process.env.ENV.toLowerCase()}-resources`
          );
          DB.instance.resourceData = resources;
          console.log(credentials, resources);
          connection = {
            host: DB.instance.resourceData.host,
            user: DB.instance.credential.user,
            password: DB.instance.credential.password,
            dbName: DB.instance.resourceData.name,
            port: DB.instance.resourceData.port,
          };
        }
        console.log(connection);
        DB.instance.database = await DB.getDatabaseManager(
          DB.instance.resourceData.dbType,
          connection
        );
      } catch (err: any) {
        console.log(err);
        DB.instance.resp.response.msg =
          "Error reading Credentials or ResourceData";
        DB.instance.resp.response.data = err;

        DB.instance.resp.status = 500;
        console.log(DB.instance.resp, true);
        throw new Error(err);
      }
    }
    return DB.instance;
  }

  private static async getDatabaseManager(
    dbType: string,
    connection: Connection
  ): Promise<DBAdapter> {
    switch (dbType) {
      case "postgres":
      default:
        return await Pg.getInstance(
          connection.host,
          connection.user,
          connection.password,
          connection.dbName,
          connection.port
        );
    }
  }

  public async execQuery(query: string, values: any): Promise<any> {
    query = DB.formatQuery(query, values);
    return await this.database.exec(query);
  }

  private static formatQuery(query: string, values: any): string {
    const keys = Object.keys(values);
    console.log("ENTRA");
    keys.forEach((key) => {
      query = query.replace("#" + key, values[key]);
    });
    return query;
  }
}

export default DB;
