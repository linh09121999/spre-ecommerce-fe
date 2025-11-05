import api from "../api";
import { type AxiosResponse } from "axios";
import { type Promotion } from '../../interface/interfaceSendData'

export const CreateAPromotion = (data: { promotion: Promotion }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/promotions?${params.toString()}`, data);
}
export const DeleteAPromotion = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/promotions/${id}`);
}
export const ReturnAListOfPromotions = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_code_eq?: string,
    filter_name_cont?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_code_eq) params.append("filter[code_eq]", filter_code_eq);
    if (filter_name_cont) params.append("filter[name_cont]", filter_name_cont);

    return api.get(`/api/v2/platform/promotions?${params.toString()}`);
}
export const ReturnAPromotion = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/promotions/${id}?${params.toString()}`);
}
export const UpdateAPromotion = (data: { promotion: Promotion }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/promotions/${id}?${params.toString()}`, data);
}