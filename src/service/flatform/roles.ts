import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Name } from '../../interface/sendData/interfaceFlatform'

export const CreateARole = (data: { role: Name }): Promise<AxiosResponse> => {
    return api.post(`/platform/roles`, data);
}
export const DeleteARole = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/roles/${id}`);
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

    return api.get(`/platform/roles?${params.toString()}`);
}
export const ReturnARole = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/roles/${id}`);
}
export const UpdateARole = (data: { role: Name }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/platform/roles/${id}`, data);
}