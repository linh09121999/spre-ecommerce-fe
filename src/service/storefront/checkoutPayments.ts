import api from "../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type CheckoutPayment } from '../../interface/sendData/interfaceStorefront'

export const CreateNewPayment = (
    data: CheckoutPayment,
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);

    return api.post(`/api/v2/storefront/checkout/create_payment?${params.toString()}`, data)
}
export const ListPaymentMethods = (): Promise<AxiosResponse> => {
    return api.get(`/api/v2/storefront/checkout/payment_methods`)
}
