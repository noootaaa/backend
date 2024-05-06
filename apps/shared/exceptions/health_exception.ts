import { Exception } from '@adonisjs/core/exceptions'

export enum HealthErrors {
  DB_CONNECTION = 'DB_CONNECTION',
  //REDIS_CONNECTION = 'REDIS_CONNECTION',
}
export default class HealthException extends Exception {
  protected error?: HealthErrors
  constructor(error?: HealthErrors) {
    super()
    this.error = error
  }

  static status = 500
  static code = 'E_HEALTH_EXCEPTION'

  handle() {
    return {
      healthy: !this.error,
      report: {
        db: {
          displayName: 'Database Check',
          health: {
            healthy: this.error !== HealthErrors.DB_CONNECTION,
            message:
              this.error === HealthErrors.DB_CONNECTION
                ? 'Some connections are unhealthy'
                : 'All connections are healthy',
          },
        },
      },
    }
  }
}

