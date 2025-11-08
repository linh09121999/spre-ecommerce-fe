import apiOrderToken from "../../api/apiOrderToken";
import apiAuthorization from "../../api/apiAuthorization";

import { type AxiosResponse } from "axios";

export const AssociateACartWithAUser = (
    guest_order_token?: string,
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (guest_order_token) params.append("guest_order_token", guest_order_token);
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return apiAuthorization.patch(`/storefront/cart/associate?${decodeURIComponent(params.toString())}`)
}
export const ChangeCartCurrency = (
    new_currency?: string,
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (new_currency) params.append("new_currency", new_currency);
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return apiOrderToken.patch(`/storefront/cart/change_currency?${decodeURIComponent(params.toString())}`)
}
export const EmptyTheCart = (
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return apiOrderToken.patch(`/storefront/cart/empty?${decodeURIComponent(params.toString())}`)
}
export const ListEstimatedShippingRates = (
    country_iso?: string,
    fields_shipping_rate?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (country_iso) params.append("country_iso", country_iso);
    if (fields_shipping_rate) params.append("fields[shipping_rate]", fields_shipping_rate);
    return apiOrderToken.get(`/storefront/cart/estimate_shipping_rates?${decodeURIComponent(params.toString())}`)
}
