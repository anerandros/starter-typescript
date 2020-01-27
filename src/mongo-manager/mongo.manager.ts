import { MongoManagerConnectInterface } from "./_model";
import { LogManager } from "../logger/logger.manager";

const MongoClient = require("mongodb").MongoClient;

export class MongoManager extends LogManager {
  private _serverUrl: string = "mongodb://127.0.0.1";
  private set serverUrl(url: string) { url && (this._serverUrl = url); }
  private get serverUrl() { return this._serverUrl; }

  private _db: any = null;
  private set db(db: any) { db && (this._db = db); }
  private get db() { return this._db; }

  private _collection: string = "";
  private set collection(name: string) { name && (this._collection = name); }
  private get collection() { return this._collection; }

  constructor() {
    super();
    this.managerName = "MongoManager";
  }

  public connect(connectObj: MongoManagerConnectInterface) {
    connectObj && connectObj.url && (this.serverUrl = connectObj.url);
    return new Promise((resolve, reject) => {
      const _this = this;
      MongoClient.connect(this.serverUrl, function(err: any, db: any) {
        if (err) { reject(err); }
        _this.db = db;
        _this.logIf(connectObj.log, "Connected");
        resolve(db);
      });
    });
  }
}