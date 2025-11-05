import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Name } from '../../interface/interfaceSendDataFlatform'

export const CreateAShippingCategory = (data: { shipping_category: Name }): Promise<AxiosResponse> => {
    return api.post(`/api/v2/platform/shipping_categories`, data);
}
export const DeleteAShippingCategory = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/shipping_categories/${id}`);
}
export const ReturnAListOfShippingCategoryies = (
    page?: number,
    per_page?: number,
    filter_name_i_cont?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (filter_name_i_cont) params.append("filter[name_i_cont]", filter_name_i_cont);

    return api.get(`/api/v2/platform/shipping_categories?${params.toString()}`);
}
export const ReturnAShippingCategory = (id: string): Promise<AxiosResponse> => {
    return api.get(`/api/v2/platform/shipping_categories/${id}`);
}
export const UpdateAShippingCategory = (data: { shipping_category: Name }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/api/v2/platform/shipping_categories/${id}`, data);
}