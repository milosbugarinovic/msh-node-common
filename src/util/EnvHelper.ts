import * as base64 from 'base-64'
import { secrets } from './secrets'

export class EnvHelper {
  private readonly pName: string

  constructor(projectName: string) {
    this.pName = projectName
  }

  public getEnv = (envName: string, defaultValue?: string) => {
    const pEnvName = `${this.pName}_${envName}`
    return (
      secrets.get(pEnvName) ||
      secrets.get(envName) ||
      process.env[pEnvName] ||
      process.env[envName] ||
      defaultValue ||
      ''
    )
  }

  public getEnvJSON: any = (envName: string, defaultValue?: any) => {
    const env = this.getEnv(envName)
    try {
      if (env === '') return defaultValue || {}
      return JSON.parse(env)
    } catch (ex) {
      console.error(ex.message || ex) // tslint:disable-line
      return defaultValue || {}
    }
  }

  public getEnvBase64 = (envName: string, defaultValue?: string) => {
    const env = this.getEnv(envName)
    try {
      return base64.decode(env)
    } catch (ex) {
      console.error(ex.message || ex) // tslint:disable-line
      return defaultValue || ''
    }
  }
}
