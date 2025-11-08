import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type PromotionActionRule, PromotionActionRuleUpdate } from '../../interface/sendData/interfaceFlatform'

export const CreateAPromotionRule = (data: { promotion_rule: PromotionActionRule }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/promotion_rules?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAPromotionRule = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/promotion_rules/${id}`);
}
export const ReturnAListOfPromotionRules = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_type_eq?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_type_eq) params.append("filter[type_eq]", filter_type_eq);

    return api.get(`/platform/promotion_rules?${decodeURIComponent(params.toString())}`);
}
export const ReturnAPromotionRule = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/promotion_rules/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAPromotionRule = (data: { promotion_rule: PromotionActionRuleUpdate }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/promotion_rules/${id}?${decodeURIComponent(params.toString())}`, data);
}