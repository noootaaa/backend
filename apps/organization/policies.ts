export const organizationPolicies = {
  OrganizationPolicy: () => import('#apps/organization/policies/organization_policy'),
  OrganizationCustomerPolicy: () =>
    import('#apps/organization/policies/organization_customer_policy'),
}
