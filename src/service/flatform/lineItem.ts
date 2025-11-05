import api from "../api";
import { type AxiosResponse } from "axios";
import { type LineItem, LineItemPost } from '../../interface/interfaceSendData'

export const CreateALineItem = (data: { line_item: LineItemPost }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/line_items?${params.toString()}`, data);
}
export const DeleteALineItem = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/line_items/${id}`);
}
export const ReturnALineItem = (
    id: string,
    include?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/line_items/${id}?${params.toString()}`);
}
export const ReturnAListOfLineItems = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_order_id_eq?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_order_id_eq) params.append("filter[order_id_eq]", filter_order_id_eq);

    return api.get(`/api/v2/platform/line_items?${params.toString()}`);
}
export const UpdateALineItem = (data: { line_item: LineItem }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/line_items/${id}?${params.toString()}`, data);
}
