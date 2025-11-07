import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const ListAllCreditCards = (
    filter_payment_method_id?: string,
    include?: string,
    filter_credit_card?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (filter_payment_method_id) params.append("filter[payment_method_id]", filter_payment_method_id);
    if (include) params.append("include", include);
    if (filter_credit_card) params.append("filter[credit_card]", filter_credit_card);

    return api.get(`/storefront/account/credit_cards?${params.toString()}`);
}
export const RemoveACreditCard = (id: number): Promise<AxiosResponse> => {
    return api.delete(`/storefront/account/credit_cards/${id}`);
}
export const RetrieveTheDefaultCreditCard = (
    include?: string,
    filter_credit_card?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (filter_credit_card) params.append("filter[credit_card]", filter_credit_card);

    return api.get(`/storefront/account/credit_cards/default?${params.toString()}`);
}
