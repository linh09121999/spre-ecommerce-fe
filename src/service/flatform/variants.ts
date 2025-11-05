import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const DeleteAVariant = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/variants/${id}`);
}
export const ReturnAListOfVariants = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_product_id_eq?: string,
    filter_sku_i_cont?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_product_id_eq) params.append("filter[product_id_eq]", filter_product_id_eq);
    if (filter_sku_i_cont) params.append("filter[sku_i_cont]", filter_sku_i_cont);

    return api.get(`/api/v2/platform/variants?${params.toString()}`);
}
export const ReturnAVariant = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/variants/${id}?${params.toString()}`);
}