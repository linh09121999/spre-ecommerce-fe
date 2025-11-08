import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type TaxRate } from '../../interface/sendData/interfaceFlatform'

export const CreateATaxRate = (data: { tax_rate: TaxRate }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/tax_rates?${decodeURIComponent(params.toString())}`, data);
}
export const DeleteATaxRate = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/tax_rates/${id}`);
}
export const ReturnAListOfTaxRates = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_zone_id_eq?: string,
    filter_amount_gt?: string,
    filter_tax_category_id_eq?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_zone_id_eq) params.append("filter[zone_id_eq]", filter_zone_id_eq);
    if (filter_amount_gt) params.append("filter[amount_gt]", filter_amount_gt);
    if (filter_tax_category_id_eq) params.append("filter[tax_category_id_eq]", filter_tax_category_id_eq);

    return api.get(`/platform/tax_rates?${decodeURIComponent(params.toString())}`);
}
export const ReturnATaxRate = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/tax_rates/${id}?${decodeURIComponent(params.toString())}`);
}
export const UpdateATaxRate = (data: { tax_rate: TaxRate }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/tax_rates/${id}?${decodeURIComponent(params.toString())}`, data);
}