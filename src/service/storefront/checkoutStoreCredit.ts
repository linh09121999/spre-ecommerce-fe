import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";

export const AddStoreCredit = (
    amount?: string,
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (amount) params.append("amount", amount);
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.post(`/storefront/checkout/add_store_credit?${decodeURIComponent(params.toString())}`)
}
export const RemoveStoreCredit = (
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.post(`/storefront/checkout/remove_store_credit?${decodeURIComponent(params.toString())}`)
}
