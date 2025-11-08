import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type  OptionType} from '../../interface/sendData/interfaceFlatform'

export const CreateAnOptionValue = (data: { option_value: OptionType }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/option_values?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteAnOptionValue = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/option_values/${id}`);
}
export const ReturnAListOfOptionValues = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_option_type_id_eq?: string,
    filter_name_cont?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_option_type_id_eq) params.append("filter[option_type_id_eq]", filter_option_type_id_eq);
    if (filter_name_cont) params.append("filter[name_cont]", filter_name_cont);
    return api.get(`/platform/option_values?${decodeURIComponent(params.toString())}`);
}
export const ReturnAnOptionValue = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/option_values/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateAnOptionValue = (data: { option_value: OptionType }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/option_values/${id}?${decodeURIComponent(params.toString())}`,data);
}