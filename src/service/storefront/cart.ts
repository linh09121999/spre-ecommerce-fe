import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type Cart } from '../../interface/sendData/interfaceStorefront'

// tao cart-> response co token với người dùng khách
export const CreateACart = (
    data: Cart,
    include?: string,
    fields_cart?: string
) => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.post(`/storefront/cart?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}
export const DeleteACart = (): Promise<AxiosResponse> => {
    return api.delete(`/storefront/cart`)
}
export const RetrieveACart = (
    include?: string,
    fields_cart?: string,
    currency?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    if (currency) params.append("currency", currency);

    return api.get(`/storefront/cart?${decodeURIComponent(params.toString())}`)
}
