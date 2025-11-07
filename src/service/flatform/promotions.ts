import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Promotion } from '../../interface/sendData/interfaceFlatform'

export const CreateAPromotion = (data: { promotion: Promotion }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/promotions?${params.toString()}`, data);
}
export const DeleteAPromotion = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/promotions/${id}`);
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

    return api.get(`/platform/promotions?${params.toString()}`);
}
export const ReturnAPromotion = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/promotions/${id}?${params.toString()}`);
}
export const UpdateAPromotion = (data: { promotion: Promotion }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/promotions/${id}?${params.toString()}`, data);
}