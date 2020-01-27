import { LogConfiguration } from "./_model";
import { defaultLogConfig } from "./default.config";

export abstract class LogManager {
  private _logConfig: any;
  public set logConfig(obj: LogConfiguration) { this._logConfig = obj; }
  public get logConfig() { return this._logConfig as LogConfiguration; }

  private _managerName: string = "Unknow";
  public set managerName(name: string) { this._managerName = name; };
  public get managerName() { return this._managerName; };

  private get isLogActive(): boolean { return this.logConfig.isActive; }

  constructor(logConfigObj?: LogConfiguration) {
    this.logConfig = new LogConfiguration(logConfigObj ? logConfigObj : defaultLogConfig);
  }


  public log(...args: any[]) {
    this.isLogActive && this._log(args);
  }

  public logIf(boolCondition: boolean = false, args: any, forceLog: boolean = false) {
    if (this.isLogActive) {
      boolCondition && this._log(args);
    } else {
      forceLog && this._log(args);
    }
  }

  private _log(...args: any) {
    console.log(`[${this.managerName}] `, args);
  }

}