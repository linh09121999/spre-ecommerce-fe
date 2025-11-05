import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Wishlist } from '../../interface/sendData/interfaceFlatform'

export const CreateAWishlist = (data: { wishlist: Wishlist }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/wishlists?${params.toString()}`, data);
}
export const DeleteAWishlist = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/wishlists/${id}`);
}
export const ReturnAListOfWishlists = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_name_cont?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_name_cont) params.append("filter[name_cont]", filter_name_cont);

    return api.get(`/api/v2/platform/wishlists?${params.toString()}`);
}
export const ReturnAWishlist = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/wishlists/${id}?${params.toString()}`);
}
export const UpdateAWishlist = (data: { wishlist: Wishlist }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/wishlists/${id}?${params.toString()}`, data);
}