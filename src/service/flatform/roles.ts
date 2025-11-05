import api from "../api";
import { type AxiosResponse } from "axios";
import { type Name } from '../../interface/interfaceSendData'

export const CreateARole = (data: { role: Name }): Promise<AxiosResponse> => {
    return api.post(`/api/v2/platform/roles`, data);
}
export const DeleteARole = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/roles/${id}`);
}
export const ReturnAListOfRoles = (
    page?: number,
    per_page?: number,
    filter_name_eq?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (filter_name_eq) params.append("filter[name_eq]", filter_name_eq);

    return api.get(`/api/v2/platform/roles?${params.toString()}`);
}
export const ReturnARole = (id: string): Promise<AxiosResponse> => {
    return api.get(`/api/v2/platform/roles/${id}`);
}
export const UpdateARole = (data: { role: Name }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/api/v2/platform/roles/${id}`, data);
}