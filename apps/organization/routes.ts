import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const OrganizationController = () =>
  import('#apps/organization/controllers/organizations_controller')
const OrganizationCustomerController = () =>
  import('#apps/organization/controllers/organization_customers_controller')

router.group(() => {
  router
    .group(() => {
      router.get('/', [OrganizationController, 'index'])
      router.get('/me', [OrganizationController, 'me'])

      router
        .group(() => {
          router.get('/', [OrganizationController, 'show'])
          router.get('/customers', [OrganizationCustomerController, 'index'])
          router.delete('/', [OrganizationController, 'delete'])
        })
        .prefix('/:organizationId')
      router.post('/', [OrganizationController, 'create'])
    })
    .prefix('/v1/organizations')
    .use(middleware.auth({ guards: ['jwt'] }))
})
