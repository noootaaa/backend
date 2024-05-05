import { ResourceAccess } from '#apps/authentication/contracts/jwt'
import PermissionResolverBuilder from '#apps/shared/services/permissions/permission_resolver_builder'

export default class PermissionResolver {
  async getResourceAccess(data: ResourceAccess, key: string): Promise<string[]> {
    return data[key]?.roles ?? []
  }

  createResolve(resourceAccess: ResourceAccess, key: string) {
    return new PermissionResolverBuilder(this, resourceAccess, key)
  }
}
