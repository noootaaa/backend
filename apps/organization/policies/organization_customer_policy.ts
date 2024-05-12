import { inject } from '@adonisjs/core'
import { JwtPayload } from '#apps/authentication/contracts/jwt'
import { HttpContext } from '@adonisjs/core/http'
import PermissionResolver from '#apps/shared/services/permissions/permission_resolver'
import { allowGuest, BasePolicy } from '@adonisjs/bouncer'
import User from '#apps/user/models/user'

@inject()
export default class OrganizationCustomerPolicy extends BasePolicy {
  protected payload: JwtPayload

  constructor(
    protected permissionResolver: PermissionResolver,
    protected ctx: HttpContext
  ) {
    super()
    this.payload = ctx.auth.use('jwt').payload! as JwtPayload
  }

  async before() {
    const isAdmin = await this.permissionResolver
      .createResolve(this.payload.resource_access, 'api')
      .verifyAccess('admin')

    if (isAdmin) return true
  }

  @allowGuest()
  async view(_: User | null, userOrganizationId?: string, organizationId?: string) {
    if (userOrganizationId && organizationId) {
      if (userOrganizationId === organizationId) {
        return true
      }
    }

    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'api')
      .verifyAccess('view-customers')
  }

  @allowGuest()
  async create(_: User | null, userOrganizationId?: string, organizationId?: string) {
    if (userOrganizationId && organizationId) {
      if (userOrganizationId === organizationId) {
        return true
      }
    }
    return this.permissionResolver
      .createResolve(this.payload.resource_access, 'api')
      .verifyAccess('create-customers')
  }
}
