import keycloak from '#config/keycloak'
import {
  KeycloakConfig,
  ProtocolOpenIdConnectTokenResponse,
  WellKnownKeyResponse,
} from '#apps/authentication/contracts/jwt'
import { errors as authErrors } from '@adonisjs/auth'
import logger from '@adonisjs/core/services/logger'
import { errors } from '@adonisjs/core'

export default class KeycloakService {
  private readonly config: KeycloakConfig
  private publicCert?: string

  constructor() {
    this.config = keycloak
  }

  async getPublicCert(): Promise<string> {
    return this.publicCert ?? (await this.fetchOidcCert())
  }

  private async fetchOidcCert(): Promise<string> {
    const url = `${this.config.url}/realms/${this.config.realm}/protocol/openid-connect/certs`
    const response = await fetch(url, {
      method: 'GET',
    })

    const data: WellKnownKeyResponse = (await response.json()) as WellKnownKeyResponse

    const rs256key = data.keys.filter((key) => key.alg === 'RS256')

    if (!rs256key) {
      throw new Error('No RS256 key found')
    }

    this.publicCert = rs256key[0].x5c[0]

    return this.publicCert
  }

  private async getAdminToken(): Promise<string> {
    const url = `${this.config.url}/realms/${this.config.realm}/protocol/openid-connect/token`

    const data = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.config.admin.clientId ?? '',
      client_secret: this.config.admin.clientSecret ?? '',
    })

    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get admin token')
    }

    const responseData: ProtocolOpenIdConnectTokenResponse =
      (await response.json()) as ProtocolOpenIdConnectTokenResponse
    return responseData.access_token
  }

  async createUser(user: any): Promise<string | undefined> {
    try {
      const url = `${this.config.url}/admin/realms/${this.config.realm}/users`

      const tokenResponse = await this.getAdminToken()

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenResponse}`,
        },
        body: JSON.stringify(user),
      })

      if (![200, 201, 204].includes(response.status)) {
        throw new authErrors.E_UNAUTHORIZED_ACCESS('Failed to create user', {
          guardDriverName: 'jwt',
        })
      }

      const locationHeader: string = response.headers.get('Location') ?? ''

      return locationHeader.split('/').pop()
    } catch (err) {
      logger.error({ messsage: err.messsage }, 'failed to create user in keycloak')
      throw new errors.E_HTTP_EXCEPTION('Error failed to create user')
    }
  }

  async deleteUser(userId: string): Promise<void> {
    const url = `${this.config.url}/admin/realms/${this.config.realm}/users/${userId}`

    const tokenResponse = await this.getAdminToken()

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenResponse}`,
        'Content-Type': 'application/json',
      },
    })

    if (![200, 204, 201].includes(response.status)) {
      throw new authErrors.E_UNAUTHORIZED_ACCESS('Failed to delete user', {
        guardDriverName: 'jwt',
      })
    }
  }

  async loginWithPassword(username: string, password: string) {
    logger.info(`User login: ${username}`)

    try {
      const response = await fetch(
        `${this.config.url}/realms/${this.config.realm}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'password',
            client_id: this.config.clientId ?? '',
            client_secret: this.config.clientSecret ?? '',
            username,
            password,
          }),
        }
      )
      if (!response.ok) {
        throw new authErrors.E_INVALID_CREDENTIALS('Invalid credentials', {
          code: '401',
          status: 401,
        })
      }

      return response.json()
    } catch (err) {
      logger.warn(err)
      throw err
    }
  }
}
