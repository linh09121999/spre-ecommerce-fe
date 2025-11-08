import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const ReturnsAListOfStates = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_country_id_eq?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_country_id_eq) params.append("filter[country_id_eq]", filter_country_id_eq);
    
    return api.get(`/platform/states?${decodeURIComponent(params.toString())}`);
}
export const ReturnsAState = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/states/${id}`);
}