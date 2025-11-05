import api from "../api";
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
    return api.post(`/api/v2/platform/digitals?${params.toString()}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
export const DeleteADigitalAsset = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/digitals/${id}`);
}

export const ReturnADigitalAsset = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/digitals/${id}?${params.toString()}`);
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
    return api.get(`/api/v2/platform/digitals?${params.toString()}`);
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
    return api.patch(`/api/v2/platform/digitals/${id}?${params.toString()}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}