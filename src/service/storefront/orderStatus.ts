import api from "../api/apiOrderToken";
import { type AxiosResponse } from "axios";

export const RetrieveAnOrderStatus = (
    order_number: number,
    include?: string,
    fields_cart?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);

    return api.get(`/api/v2/storefront/order_status/${order_number}?${params.toString()}`)
}
