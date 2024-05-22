export const organizationPolicies = {
  OrganizationPolicy: () => import('#apps/organization/policies/organization_policy'),
  OrganizationCompaniesPolicy: () =>
    import('#apps/organization/policies/organization_company_policy'),
}
