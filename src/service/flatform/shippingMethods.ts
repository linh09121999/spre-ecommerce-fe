import api from "../api";
import { type AxiosResponse } from "axios";
import { type ShippingMethod } from '../../interface/interfaceSendData'

export const CreateAShippingMethod = (data: { shipping_method: ShippingMethod }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/shipping_methods?${params.toString()}`, data);
}
export const DeleteAShippingMethod = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/shipping_methods/${id}`);
}
export const ReturnAListOfShippingMethods = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_name?: string,
    filter_title_cont?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_name) params.append("filter[name]", filter_name);
    if (filter_title_cont) params.append("filter[title_cont]", filter_title_cont);

    return api.get(`/api/v2/platform/shipping_methods?${params.toString()}`);
}
export const ReturnAShippingMethod = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/shipping_methods/${id}?${params.toString()}`);
}
export const UpdateAShippingMethod = (data: { shipping_method: ShippingMethod }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/shipping_methods/${id}?${params.toString()}`, data);
}