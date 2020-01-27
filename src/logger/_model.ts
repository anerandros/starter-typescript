export interface LogConfigurationInterface {
  isActive: boolean;
}

export class LogConfiguration implements LogConfigurationInterface {
  private _isActive: boolean = false;
  public set isActive(value: boolean) { this._isActive = value; }
  public get isActive() { return this._isActive; }

  constructor(configObj: LogConfigurationInterface) {}
}