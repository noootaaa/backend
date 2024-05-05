import { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'node:crypto'

export function genLogInfo(ctx: HttpContext) {
  const { request, auth } = ctx

  let requestId = request.header('x-request-id')

  if (!requestId) {
    requestId = randomUUID()
    request.request.headers['x-request-id'] = requestId
  }

  console.log(auth)

  if (ctx.response.response.statusCode) {
    return {
      fields: {
        method: request.method(),
        url: request.url(),
        //userId: auth.use('jwt').payload?.sub ?? 'guest',
        status: ctx.response.response.statusCode,
      },
      spans: {
        requestId: requestId,
      },
    }
  }

  return {
    fields: {
      method: request.method(),
      url: request.url(),
      //userId: auth.use('jwt').payload?.sub ?? 'guest',
    },
    spans: {
      requestId: requestId,
    },
  }
}
