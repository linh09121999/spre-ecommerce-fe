import api from "../api";
import { type AxiosResponse } from "axios";
import { type  OptionType} from '../../interface/interfaceSendData'

export const CreateAnOptionType = (data: { option_type: OptionType }): Promise<AxiosResponse> => {
    return api.post(`/api/v2/platform/option_types`, data);
}
export const DeleteAnOptionType = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/option_types/${id}`);
}
export const ReturnAListOfOptionTypes = (
    page?: number,
    per_page?: number,
    filter_option_type_id_eq?: string,
    filter_name_cont?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (filter_option_type_id_eq) params.append("filter[option_type_id_eq]", filter_option_type_id_eq);
    if (filter_name_cont) params.append("filter[name_cont]", filter_name_cont);
    return api.get(`/api/v2/platform/option_types?${params.toString()}`);
}
export const ReturnAnOptionType = (id: string): Promise<AxiosResponse> => {
    return api.get(`/api/v2/platform/option_types/${id}`);
}
export const UpdateAnOptionType = (data: { option_type: OptionType }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/api/v2/platform/option_types/${id}`, data);
}