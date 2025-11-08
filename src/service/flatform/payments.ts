

import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

// payments
export const DeleteAPayment = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/payments/${id}`);
}
export const ReturnAListOfPayments = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_payment_method_id_eq?: string,
    filter_amount_gteq?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_payment_method_id_eq) params.append("filter[payment_method_id_eq]", filter_payment_method_id_eq);
    if (filter_amount_gteq) params.append("filter[amount_gteq]", filter_amount_gteq);

    return api.get(`/platform/payments?${decodeURIComponent(params.toString())}`);
}
export const ReturnAPayment = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/payments/${id}?${decodeURIComponent(params.toString())}`);
}