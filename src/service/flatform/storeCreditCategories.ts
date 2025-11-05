import api from "../api";
import { type AxiosResponse } from "axios";
import { type Name } from '../../interface/interfaceSendData'

export const CreateAStoreCreditCategory = (data: { store_credit_category: Name }): Promise<AxiosResponse> => {
    return api.post(`/api/v2/platform/store_credit_categories`, data);
}
export const DeleteAStoreCreditCategory = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/store_credit_categories/${id}`);
}
export const ReturnAListOfStoreCreditCategories = (
    page?: number,
    per_page?: number,
    filter_name_eq?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (filter_name_eq) params.append("filter[name_eq]", filter_name_eq);

    return api.get(`/api/v2/platform/store_credit_categories?${params.toString()}`);
}
export const ReturnAStoreCreditCategory = (id: string): Promise<AxiosResponse> => {
    return api.get(`/api/v2/platform/store_credit_categories/${id}`);
}
export const UpdateAStoreCreditCategory = (data: { store_credit_category: Name }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/api/v2/platform/store_credit_categories/${id}`, data);
}