import api from "../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type PaymentIntent, PaymentIntentUpdate } from '../../interface/sendData/interfaceStorefront'

export const ReturnAStripePaymentIntent = (id: number): Promise<AxiosResponse> => {
    return api.get(`/api/v2/storefront/stripe/payment_intents/${id}`)
}
export const UpdatesStripePaymentIntent = (
    data: { payment_intent: PaymentIntentUpdate },
    id: number
): Promise<AxiosResponse> => {
    return api.patch(`/api/v2/storefront/stripe/payment_intents/${id}`)
}
export const CreateAStripePaymentIntent = (
    data: { payment_intent: PaymentIntent }
): Promise<AxiosResponse> => {
    return api.post(`/api/v2/storefront/stripe/payment_intents`, data)
}
export const CreateAStripeSetupIntent = (): Promise<AxiosResponse> => {
    return api.post(`/api/v2/storefront/stripe/setup_intents`)
}
export const MarkThePaymentIntentAsConfirmedAndMoveTheOrderToTheCompleteState = (id: number): Promise<AxiosResponse> => {
    return api.patch(`/api/v2/storefront/stripe/payment_intents/${id}/confirm`)
}
