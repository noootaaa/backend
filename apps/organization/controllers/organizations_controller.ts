import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import OrganizationService from '#apps/organization/services/organization_service'
import {
  createOrganizationValidator,
  getOrganizationsValidator,
} from '#apps/organization/validators/organization'
import UserService from '#apps/user/services/user_service'

@inject()
export default class OrganizationsController {
  constructor(
    private organizationService: OrganizationService,
    private userService: UserService
  ) {}

  /**
   * Display a list of resource
   */
  async index({ bouncer, request }: HttpContext) {
    await bouncer.with('OrganizationPolicy').authorize('view' as never)
    const getOrganizationsSchema = await request.validateUsing(getOrganizationsValidator)

    return this.organizationService.findAll(getOrganizationsSchema)
  }

  async show({ bouncer, params, auth }: HttpContext) {
    const userOidcId = auth.use('jwt').payload?.sub as string
    const user = await this.userService.findByOidcId(userOidcId)

    await bouncer
      .with('OrganizationPolicy')
      .authorize('view' as never, user.organizationId, params.organizationId)

    return this.organizationService.findById(params.organizationId)
  }

  // method for get all customers of the organization


  async me({ auth }: HttpContext) {
    const userOidcId = auth.use('jwt').payload?.sub as string
    const user = await this.userService.findByOidcId(userOidcId)

    return this.organizationService.findByUserId(user.id)
  }

  async create({ request, auth }: HttpContext) {
    const data = await request.validateUsing(createOrganizationValidator)
    const userOidcId = auth.use('jwt').payload!.sub as string

    const user = await this.userService.findByOidcId(userOidcId)

    return this.organizationService.create(data, user)
  }

  async delete({ params, response }: HttpContext) {
    await this.organizationService.deleteById(params.organizationId)

    return response.send({
      message: 'Organization deleted successfully',
    })
  }
}
