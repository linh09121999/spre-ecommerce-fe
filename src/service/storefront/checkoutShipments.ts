import api from "../api/apiOrderToken";
import { type AxiosResponse } from "axios";

export const ListShippingRates = (): Promise<AxiosResponse> => {
    return api.get(`/api/v2/storefront/checkout/shipping_rates`)
}
export const SelectShippingMethodForShipments = (
    data: { shipping_method_id: string },
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);

    return api.patch(`/api/v2/storefront/checkout/select_shipping_method?${params.toString()}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}


