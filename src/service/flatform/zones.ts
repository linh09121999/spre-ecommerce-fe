import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Zone } from '../../interface/interfaceSendDataFlatform'

export const CreateAZone = (data: { zone: Zone }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/zones?${params.toString()}`, data);
}
export const DeleteAZone = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/zones/${id}`);
}
export const ReturnAListOfZones = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_description_eq?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_description_eq) params.append("filter[description_eq]", filter_description_eq);

    return api.get(`/api/v2/platform/zones?${params.toString()}`);
}
export const ReturnAZone = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/zones/${id}?${params.toString()}`);
}
export const UpdateAZone = (data: { zone: Zone }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/zones/${id}?${params.toString()}`, data);
}