import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Taxonomy } from '../../interface/sendData/interfaceFlatform'

export const CreateATaxonomy = (data: { taxonomy: Taxonomy }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/taxonomies?${params.toString()}`, data);
}
export const DeleteATaxonomy = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/taxonomies/${id}`);
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

    return api.get(`/platform/taxonomies?${params.toString()}`);
}
export const ReturnATaxonomy = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/taxonomies/${id}?${params.toString()}`);
}
export const UpdateATaxonomy = (data: { taxonomy: Taxonomy }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/taxonomies/${id}?${params.toString()}`, data);
}