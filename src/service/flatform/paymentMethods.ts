import api from "../api";
import { type AxiosResponse } from "axios";
import { type PaymentMethod } from '../../interface/interfaceSendData'

export const CreateAPaymentMethod = (data: { payment_method: PaymentMethod }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/payment_methods?${params.toString()}`, data);
}
export const DeleteAPaymentMethod = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/payment_methods/${id}`);
}
export const ReturnAListOfPaymentMethods = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_name?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_name) params.append("filter[name]", filter_name);

    return api.get(`/api/v2/platform/payment_methods?${params.toString()}`);
}
export const ReturnAPaymentMethod = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/payment_methods/${id}?${params.toString()}`);
}
export const UpdateAPaymentMethod = (data: { payment_method: PaymentMethod }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/payment_methods/${id}?${params.toString()}`, data);
}

