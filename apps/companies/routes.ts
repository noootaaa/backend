import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const CompaniesController = () => import('#apps/companies/controllers/companies_controller')

router.group(() => {
  router
    .group(() => {
      router.get('/', [CompaniesController, 'index'])
      router.get('/:companyId', [CompaniesController, 'show'])
    })
    .prefix('/v1/companies')
    .use(middleware.auth({ guards: ['jwt'] }))
})
