import { allowGuest, BasePolicy } from '@adonisjs/bouncer'
import { inject } from '@adonisjs/core'
import { JwtPayload } from '#apps/authentication/contracts/jwt'
import PermissionResolver from '#apps/shared/services/permissions/permission_resolver'
import { HttpContext } from '@adonisjs/core/http'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

@inject()
export default class OrganizationPolicy extends BasePolicy {
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
      .createResolve(this.payload.resourceAccess, 'api')
      .verifyAccess('admin')

    if (isAdmin) return true
  }

  @allowGuest()
  async view(): Promise<AuthorizerResponse> {
    return this.permissionResolver
      .createResolve(this.payload.resourceAccess, 'organizations')
      .verifyAccess('view-organizations')
  }
}
