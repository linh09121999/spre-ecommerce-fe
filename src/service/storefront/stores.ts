import api from "../api/apiOrderToken";

export const ReturnTheCurrentStore = (
    include?: string,
    fields_store?: string
) => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_store) params.append("fields[store]", fields_store);

    return api.get(`/api/v2/storefront/store?${params.toString()}`)
}
