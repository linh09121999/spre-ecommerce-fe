import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Taxon, TaxonReposition } from '../../interface/sendData/interfaceFlatform'

export const CreateATaxon = (data: { taxon: Taxon }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/taxons?${params.toString()}`, data);
}
export const DeleteATaxon = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/taxons/${id}`);
}
export const repositionATaxon = (data: { taxon: TaxonReposition }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/platform/taxons/${id}/reposition`, data);
}
export const ReturnAListOfTaxons = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_taxonomy_id_eq?: string,
    filter_name_cont?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_taxonomy_id_eq) params.append("filter[taxonomy_id_eq]", filter_taxonomy_id_eq);
    if (filter_name_cont) params.append("filter[name_cont]", filter_name_cont);

    return api.get(`/platform/taxons?${params.toString()}`);
}
export const ReturnATaxon = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/taxons/${id}?${params.toString()}`);
}
export const UpdateATaxon = (data: { taxon: Taxon }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/taxons/${id}?${params.toString()}`, data);
}
