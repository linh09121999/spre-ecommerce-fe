import api from "../api/apiOrderToken";
import { type AxiosResponse } from "axios";

export const AdvanceCheckout = (
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.patch(`/api/v2/storefront/checkout/advance?${params.toString()}`)
}
export const ComplateCheckout = (
    include?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/storefront/checkout/complete?${params.toString()}`)
}
export const NextCheckoutStep = (
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.patch(`/api/v2/storefront/checkout/next?${params.toString()}`)
}
