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
          router.delete('/', [OrganizationController, 'delete'])

          router
            .group(() => {
              router.get('/', [OrganizationCustomerController, 'index'])
              router.get('/:id', [OrganizationCustomerController, 'show'])
              router.post('/', [OrganizationCustomerController, 'create'])
            })
            .prefix('/customers')
        })
        .prefix('/:organizationId')
      router.post('/', [OrganizationController, 'create'])
    })
    .prefix('/v1/organizations')
    .use(middleware.auth({ guards: ['jwt'] }))
})
