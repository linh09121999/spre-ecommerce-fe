import api from "../api/apiOrderToken";

export const ListAllProductVariants = (product_slug: string) => api.get(`/api/v2/storefront/products/${product_slug}/variants`)
