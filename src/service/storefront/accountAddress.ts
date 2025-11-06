import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Address } from '../../interface/sendData/interfaceStorefront'

export const ListAccountAddress = (
    fields_address?: string,
    filter_exclude_quick_checkout?: boolean
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (fields_address) params.append("fields[address]", fields_address);
    if (filter_exclude_quick_checkout) params.append("filter[exclude_quick_checkout]", String(filter_exclude_quick_checkout));

    return api.get(`/api/v2/storefront/account/addresses?${params.toString()}`);
}
export const CreateAccountAddress = (data: { address: Address }, fields_address?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (fields_address) params.append("fields[address]", fields_address);
    return api.post(`/api/v2/storefront/account/addresses?${params.toString()}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    );
}
export const RemoveAnAddress = (id: number): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/storefront/account/addresses/${id}`);
}
export const UpdateAnAddress = (data: { address: Address }, id: number, fields_address?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (fields_address) params.append("fields[address]", fields_address);
    return api.patch(`/api/v2/storefront/account/addresses/${id}?${params.toString()}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    );
}
