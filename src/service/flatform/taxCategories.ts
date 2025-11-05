import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type TaxCategory } from '../../interface/interfaceSendDataFlatform'

export const CreateATaxCategory = (data: { tax_category: TaxCategory }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/tax_categories?${params.toString()}`, data);
}
export const DeleteATaxCategory = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/tax_categories/${id}`);
}
export const ReturnAListOfTaxCategories = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_name_eq?: string,
    filter_is_default_true?: string,
    filter_tax_code_eq?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_name_eq) params.append("filter[name_eq]", filter_name_eq);
    if (filter_is_default_true) params.append("filter[is_default_true]", filter_is_default_true);
    if (filter_tax_code_eq) params.append("filter[tax_code_eq]", filter_tax_code_eq);

    return api.get(`/api/v2/platform/tax_categories?${params.toString()}`);
}
export const ReturnATaxCategory = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/tax_categories/${id}?${params.toString()}`);
}
export const UpdateATaxCategory = (data: { tax_category: TaxCategory }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/tax_categories/${id}?${params.toString()}`, data);
}