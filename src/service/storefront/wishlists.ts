import apiOrderToken from "../api/apiOrderToken";
import apiAuthorization from "../api/apiAuthorization";
import apiCreateAWishlist from "../api/apiCreateAWishlist"
import { type AxiosResponse } from "axios";
import { type WishlistCreate, WishlistCreateUpdate } from '../../interface/interfaceSendDataStorefront'

export const ListAllWishlists = (
    include?: string,
    fields_wishlist?: string,
    per_page?: number,
    is_variant_included?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_wishlist) params.append("fields[wishlist]", fields_wishlist);
    if (per_page) params.append("per_page", String(per_page));
    if (is_variant_included) params.append("is_variant_included", is_variant_included);

    return apiOrderToken.get(`/api/v2/storefront/wishlists?${params.toString()}`)
}

export const CreateAWishlist = (
    data: WishlistCreate,
    fields_wishlist?: string,
) => {
    const params = new URLSearchParams();
    if (fields_wishlist) params.append("fields[wishlist]", fields_wishlist);

    return apiCreateAWishlist.post(`/api/v2/storefront/wishlists?${params.toString()}`, data) //gom ca apiOrderToken, apiOrderToken
}
export const DeleteAWishlist = (token: string) => apiOrderToken.delete(`/api/v2/storefront/wishlists/${token}`)
export const RetrieveAWishlist = (
    token: string,
    include?: string,
    fields_wishlist?: string,
    per_page?: number,
    is_variant_included?: string
) => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_wishlist) params.append("fields[wishlist]", fields_wishlist);
    if (per_page) params.append("per_page", String(per_page));
    if (is_variant_included) params.append("is_variant_included", is_variant_included);

    return apiOrderToken.get(`/api/v2/storefront/wishlists/${token}?${params.toString()}`)
}
export const RetrieveTheDefaultWishlist = (
    include?: string,
    fields_wishlist?: string,
    is_variant_included?: string
) => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_wishlist) params.append("fields[wishlist]", fields_wishlist);
    if (is_variant_included) params.append("is_variant_included", is_variant_included);

    return apiOrderToken.get(`/api/v2/storefront/wishlists/default?${params.toString()}`)
}
export const UpdateAWishlist = (
    data: WishlistCreateUpdate,
    token: string,
    fields_wishlist?: string,
) => {
    const params = new URLSearchParams();
    if (fields_wishlist) params.append("fields[wishlist]", fields_wishlist);

    return apiAuthorization.patch(`/api/v2/storefront/wishlists/${token}?${params.toString()}`, data,
        {
            headers: {
                "Content-Type": "application/vnd.api+json"
            },
        }
    )
}
