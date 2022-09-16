interface Connection {
  host: string;
  user: string;
  password: string | undefined;
  dbName: string;
  port: number;
}

export default Connection;
