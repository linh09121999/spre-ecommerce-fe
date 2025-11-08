import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type Checkout } from '../../interface/sendData/interfaceStorefront'

export const UpdateCheckOut = (
    data: { order: Checkout },
    include?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/storefront/checkout?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}

export const ValidateOrderPayment = (
    skip_state?: boolean,
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (skip_state) params.append("skip_state", String(skip_state));
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.post(`/storefront/checkout/validate_order_for_payment?${decodeURIComponent(params.toString())}`)
}
