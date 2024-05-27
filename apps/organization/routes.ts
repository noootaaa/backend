import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const OrganizationController = () =>
  import('#apps/organization/controllers/organizations_controller')
const OrganizationCompaniesController = () =>
  import('#apps/organization/controllers/organization_companies_controller')
const OrganizationProductsController = () => 
  import('#apps/organization/controllers/organization_products_controller')
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
              router.get('/', [OrganizationCompaniesController, 'index'])
              router.get('/:id', [OrganizationCompaniesController, 'show'])
              router.post('/', [OrganizationCompaniesController, 'create'])
            })
            .prefix('/companies')


          router.group(() => {
            router.get('/', [OrganizationProductsController, 'index'])
          }).prefix('/products')
        })
        .prefix('/:organizationId')
      router.post('/', [OrganizationController, 'create'])
    })
    .prefix('/v1/organizations')
    .use(middleware.auth({ guards: ['jwt'] }))
})
