import api from "../api/apiOrderToken";

export const GetDefaultCountry = (
    include?: string,
    fields_country?: string
) => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_country) params.append("fields[country]", fields_country);

    return api.get(`/api/v2/storefront/countries/default?${params.toString()}`)
}
export const ListAllCountries = () => api.get(`/api/v2/storefront/countries`)
export const RetrieveAContry = (iso: number) => api.get(`/api/v2/storefront/countries/${iso}`)
