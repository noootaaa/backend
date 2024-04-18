import jwt from 'jsonwebtoken'
import { AccessTokensUserProviderContract } from '@adonisjs/auth/types/access_tokens'
import { symbols } from '@adonisjs/auth'

export type JwtPayload = jwt.JwtPayload

export type ResourceAccess = {
  [key: string]: {
    roles: string[]
  }
}

export type WellKnownKeyResponse = {
  keys: {
    'kid': string
    'kty': string
    'alg': string
    'use': string
    'n': string
    'e': string
    'x5c': string[]
    'x5t': string
    'x5t#S256': string
  }[]
}

export type KeycloakConfig = {
  realm?: string
  url?: string
  clientId?: string
  clientSecret?: string
  admin: {
    clientId?: string
    clientSecret?: string
  }
}


export type JwtProviderConfig<T extends AccessTokensUserProviderContract<unknown>> = {
  model: () => Promise<{ default: T[typeof symbols.PROVIDER_REAL_USER] }>
}

export interface ProtocolOpenIdConnectTokenResponse {
  'access_token': string
  'expires_in': number
  'refresh_expires_in': number
  'refresh_token': string
  'token_type': string
  'not-before-policy': number
  'session_state': string
  'scope': string
}
