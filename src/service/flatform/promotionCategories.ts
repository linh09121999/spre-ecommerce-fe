import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type PromotionCategory } from '../../interface/interfaceSendDataFlatform'

export const CreateAPromotionCategory = (data: { promotion_category: PromotionCategory }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/promotion_categories?${params.toString()}`, data);
}
export const DeleteAPromotionCategory = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/promotion_categories/${id}`);
}
export const ReturnAListOfPromotionCategories = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_code_eq?: string,
    filter_name_eq?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_code_eq) params.append("filter[code_eq]", filter_code_eq);
    if (filter_name_eq) params.append("filter[name_eq]", filter_name_eq);

    return api.get(`/api/v2/platform/promotion_categories?${params.toString()}`);
}
export const ReturnAPromotionCategory = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/promotion_categories/${id}?${params.toString()}`);
}
export const UpdateAPromotionCategory = (data: { promotion_category: PromotionCategory }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/promotion_categories/${id}?${params.toString()}`, data);
}