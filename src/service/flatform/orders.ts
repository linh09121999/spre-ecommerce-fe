import api from "../api";
import { type AxiosResponse } from "axios";
import { type Order } from '../../interface/interfaceSendData'

export const AdvancesAnOrder = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/orders/${id}/advance?${params.toString()}`);
}
export const ApplyCouponCodeForAnOrder = (data: { coupon_code: string }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/orders/${id}/apply_coupon_code?${params.toString()}`, data);
}
export const ApprovesAnOrder = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/orders/${id}/approve?${params.toString()}`);
}
export const CancelsAnOrder = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/orders/${id}/cancel?${params.toString()}`);
}
export const CompletesAnOrder = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/orders/${id}/complete?${params.toString()}`);
}

export const CreatesAnOrder = (data: { order: Order }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/orders?${params.toString()}`);
}
export const DeleteAnOrder = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/orders/${id}`);
}
export const EmptiesAnOrder = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/orders/${id}/empty?${params.toString()}`);
}
export const NextAnOrder = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/orders/${id}/next?${params.toString()}`);
}
export const ReturnAListOfOrders = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_state_eq?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_state_eq) params.append("filter[state_eq]]", filter_state_eq);

    return api.get(`/api/v2/platform/orders?${params.toString()}`);
}
export const ReturnAnOrder = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/orders/${id}?${params.toString()}`);
}
export const UpdateAnOrder = (data: { order: Order }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/orders/${id}?${params.toString()}`, data);
}
export const UseStoreCreditForAnOrder = (data: { amount: number }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/orders/${id}/use_store_credit?${params.toString()}`, data);
}