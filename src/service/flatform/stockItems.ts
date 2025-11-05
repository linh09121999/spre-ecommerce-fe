import api from "../api";
import { type AxiosResponse } from "axios";
import { type StockItem } from '../../interface/interfaceSendData'

export const CreateAStockItem = (data: { stock_item: StockItem }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/stock_items?${params.toString()}`, data);
}
export const DeleteAStockItem = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/stock_items/${id}`);
}
export const ReturnAListOfStockItems = (
    page?: number,
    per_page?: number,
    include?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/stock_items?${params.toString()}`);
}
export const ReturnAStockItem = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/stock_items/${id}?${params.toString()}`);
}
export const UpdateAStockItem = (data: { stock_item: StockItem }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/stock_items/${id}?${params.toString()}`, data);
}