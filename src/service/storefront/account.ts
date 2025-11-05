import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type User, UserUpdate } from '../../interface/sendData/interfaceStorefront'

export const CreateAnAccount = (data: { user: User }): Promise<AxiosResponse> => {
    return api.post(`/return api/v2/storefront/account`, data);
}
export const RetrieveAnAccount = (
    include?: string,
    fields_user?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_user) params.append("fields[user]", fields_user);

    return api.get(`/return api/v2/storefront/account?${params.toString()}`);
}
export const UpdateAnAccount = (data: { user: UserUpdate }): Promise<AxiosResponse> => {
    return api.patch(`/return api/v2/storefront/account`, data);
}
