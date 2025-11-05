import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const ListAllOrders = (
    include?: string,
    fields_cart?: string,
    page?: number,
    per_page?: number
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));

    return api.get(`/api/v2/storefront/account/orders?${params.toString()}`);
}
export const RetriebeAnOrder = (
    order_number: number,
    include?: string,
    fields_cart?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart)

    return api.get(`/api/v2/storefront/account/orders/${order_number}?${params.toString()}`);
}
