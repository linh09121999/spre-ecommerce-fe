import api from "../api/apiOrderToken";
import { type AxiosResponse } from "axios";

export const ApplyACouponCode = (
    data: { coupon_code: string },
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.patch(`/api/v2/storefront/cart/apply_coupon_code?${params.toString()}`, data)
}
export const RemoveACoupon = (coupon_code: number): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/storefront/cart/remove_coupon_code/${coupon_code}`)
}
export const RemoveAllCoupon = (
    include?: string,
    fields_cart?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_cart) params.append("fields[cart]", fields_cart);
    return api.delete(`/api/v2/storefront/cart/remove_coupon_code?${params.toString()}`)
}
