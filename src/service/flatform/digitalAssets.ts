import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const CreateADigitalAsset = (
    variantId: number,
    file: string,
    include?: string,): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("digital[variant_id]", variantId.toString());
    formData.append("digital[attachment]", file);

    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/digitals?${decodeURIComponent(params.toString())}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
export const DeleteADigitalAsset = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/digitals/${id}`);
}

export const ReturnADigitalAsset = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/digitals/${id}?${decodeURIComponent(params.toString())}`);
}
export const ReturnAListOfDigitalAssets = (
    page?: number,
    per_page?: number,
    include?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    return api.get(`/platform/digitals?${decodeURIComponent(params.toString())}`);
}
export const UpdateADigitalAsset = (
    variantId: number,
    file: string,
    id: string,
    include?: string
): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("digital[variant_id]", variantId.toString());
    formData.append("digital[attachment]", file);

    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/digitals/${id}?${decodeURIComponent(params.toString())}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}