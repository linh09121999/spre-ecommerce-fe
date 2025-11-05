import api from "../api/apiOrderToken";

export const ListAllStorePolicies = () => api.get(`/api/v2/storefront/policies`)
export const RetrieveAPolicy = (policy_slug: string) => api.get(`/api/v2/storefront/policies/${policy_slug}`)
