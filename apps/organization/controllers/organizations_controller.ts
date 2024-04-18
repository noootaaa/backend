import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import OrganizationService from '#apps/organization/services/organization_service'
import { getOrganizationsValidator } from '#apps/organization/validators/organization'

@inject()
export default class OrganizationsController {
  constructor(private organizationService: OrganizationService) {}

  /**
   * Display a list of resource
   */
  async index({ request, bouncer }: HttpContext) {
    await bouncer.with('OrganizationPolicy').authorize('view' as never)
    const getOrganizationsSchema = await request.validateUsing(getOrganizationsValidator)

    return this.organizationService.findAll(getOrganizationsSchema)
  }
}
