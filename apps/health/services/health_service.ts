import db from '@adonisjs/lucid/services/db'
//import HealthException, { HealthErrors } from '#apps/shared/exceptions/health_exception'

export default class HealthService {
  async checkDb(): Promise<{ displayName: string, health: { healthy: boolean, message: string }, meta: any[] }> {
    return db.manager.report()
  }

  async sendReport() {
    try {
      const reportDb = await this.checkDb()
      return {
        healthy: reportDb.health.healthy,
        report: {

          appKey: {
            displayName: 'App Key Check',
            health: {
              healthy: true,
            },
          },
          db: reportDb
        },
      }
    } catch (e) {
      throw e
    }
  }
}
