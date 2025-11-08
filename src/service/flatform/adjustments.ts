import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type  Adjustment} from '../../interface/sendData/interfaceFlatform'

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
    return api.get(`/platform/adjustments?${decodeURIComponent(params.toString())}`)
}



export const CreateAnAdjustment = (data: { adjustment: Adjustment }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/adjustments?${decodeURIComponent(params.toString())}`, data)
}

export const ReturnAnAdjustment = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/adjustments/${id}?${decodeURIComponent(params.toString())}`)
}

export const DeleteAnAdjustment = (id: string): Promise<AxiosResponse> => api.delete(`/platform/adjustments/${id}`)

export const UpdateAnAdjustment = (data: { adjustment: Adjustment }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/adjustments/${id}?${decodeURIComponent(params.toString())}`, data)
}