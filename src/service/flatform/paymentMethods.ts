import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type PaymentMethod } from '../../interface/sendData/interfaceFlatform'

export const CreateAPaymentMethod = (data: { payment_method: PaymentMethod }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/payment_methods?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAPaymentMethod = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/payment_methods/${id}`);
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

    return api.get(`/platform/payment_methods?${decodeURIComponent(params.toString())}`);
}
export const ReturnAPaymentMethod = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/payment_methods/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAPaymentMethod = (data: { payment_method: PaymentMethod }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/payment_methods/${id}?${decodeURIComponent(params.toString())}`, data);
}

