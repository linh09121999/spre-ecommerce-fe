import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type User } from '../../interface/sendData/interfaceFlatform'

export const CreateAUser = (data: { user: User }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/users?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAUser = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/users/${id}`);
}
export const ReturnAListOfUsers = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_user_id_eq?: string,
    filter_email_cont?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_user_id_eq) params.append("filter[user_id_eq]", filter_user_id_eq);
    if (filter_email_cont) params.append("filter[email_cont]", filter_email_cont);

    return api.get(`/platform/users?${decodeURIComponent(params.toString())}`);
}
export const ReturnAUser = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/users/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAUser = (data: { user: User }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/users/${id}?${decodeURIComponent(params.toString())}`, data);
}