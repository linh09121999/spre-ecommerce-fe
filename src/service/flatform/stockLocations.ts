import api from "../api";
import { type AxiosResponse } from "axios";
import { type StockLocation } from '../../interface/interfaceSendData'

export const CreateAStockLocation = (
    data: { stock_location: StockLocation },
    include?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/stock_locations?${params.toString()}`, data);
}
export const DeleteAStockLocation = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/stock_locations/${id}`);
}
export const ReturnAListOfStockLocations = (
    page?: number,
    per_page?: number,
    include?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);

    return api.get(`/api/v2/platform/stock_locations?${params.toString()}`);
}
export const ReturnAStockLocation = (
    id: string,
    include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/stock_locations/${id}?${params.toString()}`);
}
export const UpdateAStockLocation = (
    data: { stock_location: StockLocation },
    id: string,
    include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/stock_locations/${id}?${params.toString()}`, data);
}