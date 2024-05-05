import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import AuthenticationService from '#apps/authentication/services/authentication_service'
import { loginCredentialsValidator } from '#apps/authentication/validators/authentication'
import KeycloakService from '#apps/authentication/services/keycloak_service'
@inject()
export default class AuthenticationController {
  constructor(
    protected authenticationService: AuthenticationService,
    protected keycloakService: KeycloakService
  ) {}

  async login({ request, response }: HttpContext) {
    const { username, password } = await request.validateUsing(loginCredentialsValidator)

    const token = await this.keycloakService.loginWithPassword(username, password)

    return response.send(token)
  }

  async callback({ request }: HttpContext) {
    console.log(request.all())

    return request
  }
}
