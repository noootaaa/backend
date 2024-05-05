import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import { genLogInfo } from '#apps/shared/helpers/index'

export default class ReqResLogger {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response, logger } = ctx

    if (request.url().startsWith('/v1/health')) {
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
