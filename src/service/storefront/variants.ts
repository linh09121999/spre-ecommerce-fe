import api from "../../api/apiOrderToken";

export const ListAllProductVariants = (product_slug: string) => api.get(`/storefront/products/${product_slug}/variants`)
