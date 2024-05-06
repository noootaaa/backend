import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import HealthService from '#apps/health/services/health_service'
@inject()
export default class HealthController {
  constructor(private healthService: HealthService) {}

  /**
   * Display a list of resource
   */
  async live({ response }: HttpContext) {
    return response.ok({
      status: 'ok',
    })
  }

  async readiness() {
    return this.healthService.sendReport()
  }
}
