import { AccessTokensUserProviderContract } from '@adonisjs/auth/types/access_tokens'
import { JwtProviderConfig } from '#apps/authentication/contracts/jwt'
import { HttpContext } from '@adonisjs/core/http'
import { JwtGuard } from '#apps/authentication/guards/jwt_guard'
import KeycloakService from '#apps/authentication/services/keycloak_service'

export function jwtGuard<T extends AccessTokensUserProviderContract<unknown>>(
  config: JwtProviderConfig<T>
) {
  return {
    async resolver() {
      const { default: Model } = await config.model()
      const provider = {
        model: Model,
      }

      return (ctx: HttpContext) => {
        return new JwtGuard(ctx, provider as any, new KeycloakService())
      }
    },
  }
}
