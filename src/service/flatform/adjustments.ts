import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type  Adjustment} from '../../interface/interfaceSendDataFlatform'

export const ReturnAListOfAdjustments = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_order_id?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_order_id) params.append("filter[order_id]", filter_order_id);
    return api.get(`/api/v2/platform/adjustments?${params.toString()}`)
}



export const CreateAnAdjustment = (data: { adjustment: Adjustment }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/adjustments?${params.toString()}`, data)
}

export const ReturnAnAdjustment = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/adjustments/${id}?${params.toString()}`)
}

export const DeleteAnAdjustment = (id: string): Promise<AxiosResponse> => api.delete(`/api/v2/platform/adjustments/${id}`)

export const UpdateAnAdjustment = (data: { adjustment: Adjustment }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/adjustments/${id}?${params.toString()}`, data)
}