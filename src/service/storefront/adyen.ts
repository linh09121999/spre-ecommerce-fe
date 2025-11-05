import api from "../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type PaymentSession } from '../../interface/interfaceSendDataStorefront'

export const CreateAnAdyenPaymentSession = (
    data: { payment_session: PaymentSession }
): Promise<AxiosResponse> => {
    return api.post(`/api/v2/storefront/adyen/payment_sessions`, data)
}
export const GetAdyenPaymentSession = (id: string): Promise<AxiosResponse> => {
    return api.get(`/api/v2/storefront/adyen/payment_sessions/${id}`)
}
