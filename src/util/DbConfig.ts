import { EnvHelper } from './EnvHelper'

export class DbConfig {
  constructor(envHelper: EnvHelper) {
    this.host = envHelper.getEnv('DATABASE_HOST')
    this.user = envHelper.getEnv('DATABASE_USER')
    this.pass = envHelper.getEnv('DATABASE_PASS')
    this.port = envHelper.getEnv('DATABASE_PORT')
    this.name = envHelper.getEnv('DATABASE_NAME')
    this.option = envHelper.getEnvJSON('SEQUELIZE_OPTIONS', {}) // {logging: false}
  }

  public readonly host: string
  public readonly name: string
  public readonly port: string
  public readonly user: string
  public readonly pass: string
  public readonly option: any // tslint:disable-line

  public conn(): string {
    let cnn = 'postgres://'
    if (this.user && this.pass) cnn += `${encodeURIComponent(this.user)}:${encodeURIComponent(this.pass)}@`
    cnn += this.host
    if (this.port) cnn += `:${this.port}`
    cnn += `/${this.name}`
    return cnn
  }
}
