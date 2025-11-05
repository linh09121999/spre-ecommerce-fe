import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type StoreCredit } from '../../interface/interfaceSendDataFlatform'

export const CreateAStoreCredit = (
    data: { store_credit: StoreCredit },
    include?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/store_credits?${params.toString()}`, data);
}
export const DeleteAStoreCredit = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/store_credits/${id}`);
}
export const ReturnAListOfStoreCredits = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_user_id_eq?: string,
    filter_created_by_id_eq?: string,
    filter_amount_gteq?: string,
    filter_currency_eq?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_user_id_eq) params.append("filter[user_id_eq]", filter_user_id_eq);
    if (filter_created_by_id_eq) params.append("filter[created_by_id_eq]", filter_created_by_id_eq);
    if (filter_amount_gteq) params.append("filter[amount_gteq]", filter_amount_gteq);
    if (filter_currency_eq) params.append("filter[currency_eq]", filter_currency_eq);

    return api.get(`/api/v2/platform/store_credits?${params.toString()}`);
}
export const ReturnAStoreCredit = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/store_credits/${id}?${params.toString()}`);
}
export const UpdateAStoreCredit = (data: { store_credit: StoreCredit }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/store_credits/${id}?${params.toString()}`, data);
}