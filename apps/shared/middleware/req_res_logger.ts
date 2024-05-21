import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import { genLogInfo } from '#apps/shared/helpers/index'
import env from '#start/env'

export default class ReqResLogger {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response, logger } = ctx

    // if nodeapi is developing, don't log health check requests

    const nodeEnv = env.get('NODE_ENV')


    if (nodeEnv === 'development' || request.url().startsWith('/v1/health')) {
      return next()
    }

    const start = performance.now()

    const logInfo = genLogInfo(ctx)

    logger.info(logInfo, 'Request Received')

    await next()

    const end = performance.now()

    const latencyInMs = (end - start).toFixed(2)

    logger.info(
      {
        ...logInfo,
        fields: {
          ...logInfo.fields,
          status: response.response.statusCode,
          latency: latencyInMs,
        },
      },
      'Response Sent'
    )
  }
}
