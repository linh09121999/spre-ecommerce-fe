import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type  Classification} from '../../interface/sendData/interfaceFlatform'

export const ReturnAListOfClassifications = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_taxon_id_eq?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_taxon_id_eq) params.append("filter[taxon_id_eq]", filter_taxon_id_eq);

    return api.get(`/platform/classifications?${params.toString()}`)
}



export const CreateAClassification = (data: { classification: Classification }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/classifications?${params.toString()}`, data)
}


export const ReturnAClassification = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/classifications/${id}?${params.toString()}`)
}

export const DeleteAClassification = (id: string): Promise<AxiosResponse> => api.delete(`/platform/classifications/${id}`)

export const UpdateAClassification = (data: { classification: Classification }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/classifications/${id}?${params.toString()}`, data)
}