import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type WishedItem } from '../../interface/sendData/interfaceFlatform'

export const CreateAWishedItem = (data: { wished_item: WishedItem }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/wished_items?${params.toString()}`, data);
}
export const DeleteAWishedItem = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/wished_items/${id}`);
}
export const ReturnAListOfWishedItems = (
    page?: number,
    per_page?: number,
    include?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);

    return api.get(`/api/v2/platform/wished_items?${params.toString()}`);
}
export const ReturnAWishedItem = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/wished_items/${id}?${params.toString()}`);
}
export const UpdateAWishedItem = (data: { wished_item: WishedItem }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/wished_items/${id}?${params.toString()}`, data);
}