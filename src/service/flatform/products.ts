import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Product } from '../../interface/sendData/interfaceFlatform'

export const CreateAProduct = (data: { product: Product }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/products?${params.toString()}`, data);
}
export const DeleteAProduct = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/products/${id}`);
}
export const ReturnAListOfProducts = (
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

    return api.get(`/platform/products?${params.toString()}`);
}
export const ReturnAProduct = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/products/${id}?${params.toString()}`);
}
export const UpdateAProduct = (data: { product: Product }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/products/${id}?${params.toString()}`, data);
}
