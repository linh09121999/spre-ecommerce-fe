import api from "../../api/apiOrderToken";
import { type AxiosResponse } from "axios";
import { type LineItem, LineItemUpdate } from '../../interface/sendData/interfaceStorefront'

export const AddAnItemToCart = (
    data: LineItem,
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.post(`/storefront/cart/add_item?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        })
}
export const RemoveAnItemToCart = (id: number): Promise<AxiosResponse> => {
    return api.delete(`/storefront/cart/remove_line_item/${id}`)
}
export const SetLineItemQuantity = (
    data: LineItemUpdate,
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.patch(`/storefront/cart/set_quantity?${decodeURIComponent(params.toString())}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}
