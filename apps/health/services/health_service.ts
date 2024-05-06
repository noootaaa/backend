import db from '@adonisjs/lucid/services/db'
import HealthException, { HealthErrors } from '#apps/shared/exceptions/health_exception'

export default class HealthService {
  async checkDb(): Promise<boolean> {
    try {
      await db.query().from('users').limit(1).first()

      return true
    } catch (e) {
      throw new HealthException(HealthErrors.DB_CONNECTION)
    }
  }

  async sendReport() {
    try {
      const reportDb = await this.checkDb()
      return {
        healthy: reportDb,
        report: {
          appKey: {
            displayName: 'App Key Check',
            health: {
              healthy: true,
            },
          },
          db: {
            displayName: 'Database Check',
            health: {
              healthy: reportDb,
              message: 'All connections are healthy',
            },
          },
        },
      }
    } catch (e) {
      throw e
    }
  }
}
