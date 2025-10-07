import type { Organization } from './types'

import { mockOrganizations } from './mocs/mockData.ts'

export const fetchOrganizations = async (): Promise<Organization[]> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockOrganizations
}
