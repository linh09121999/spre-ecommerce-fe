import api from "../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type LineItem, LineItemUpdate } from '../../interface/interfaceSendDataStorefront'

export const AddAnItemToCart = (
    data: LineItem,
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.post(`/api/v2/storefront/cart/add_item?${params.toString()}`, data)
}
export const RemoveAnItemToCart = (id: number): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/storefront/cart/remove_line_item/${id}`)
}
export const SetLineItemQuantity = (
    data: LineItemUpdate,
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.patch(`/api/v2/storefront/cart/set_quantity?${params.toString()}`, data)
}
