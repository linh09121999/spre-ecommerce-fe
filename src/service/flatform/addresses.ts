import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type  Address} from '../../interface/interfaceSendDataFlatform'

export const ReturnAListOfAddresses = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_user_id_eq?: string,
    filter_firstname_cont?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_user_id_eq) params.append("filter[user_id_eq]", filter_user_id_eq);
    if (filter_firstname_cont) params.append("filter[firstname_cont]", filter_firstname_cont);

    return api.get(`/api/v2/platform/addresses?${params.toString()}`);
}

export const CreateAnAddress = (
    data: { address: Address },
    include?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/addresses?${params.toString()}`, data);
};

export const ReturnAnAddress = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/addresses/${id}?${params.toString()}`)
}

export const DeleteAnAddress = (id: string): Promise<AxiosResponse> => api.delete(`/api/v2/platform/addresses/${id}`)

export const UpdateAnAddress = (data: { address: Address }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/addresses/${id}?${params.toString()}`, data)
}