import api from "../api";
import { type AxiosResponse } from "axios";
import { type Taxonomy } from '../../interface/interfaceSendData'

export const CreateATaxonomy = (data: { taxonomy: Taxonomy }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/taxonomies?${params.toString()}`, data);
}
export const DeleteATaxonomy = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/taxonomies/${id}`);
}
export const ReturnAListOfTaxonomies = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_name_eq?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_name_eq) params.append("filter[name_eq]", filter_name_eq);

    return api.get(`/api/v2/platform/taxonomies?${params.toString()}`);
}
export const ReturnATaxonomy = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/taxonomies/${id}?${params.toString()}`);
}
export const UpdateATaxonomy = (data: { taxonomy: Taxonomy }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/taxonomies/${id}?${params.toString()}`, data);
}