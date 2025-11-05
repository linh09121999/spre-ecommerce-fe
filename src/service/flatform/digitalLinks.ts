import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type  DigitalLink} from '../../interface/interfaceSendDataFlatform'

export const CreateADigitalLink = (
    data: { digital_link: DigitalLink }
): Promise<AxiosResponse> => {
    return api.post(`/api/v2/platform/digital_links`, data);
}
export const DeleteADigitalLink = (
    id: string
): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/digital_links/${id}`);
}
export const ReturnADigitalLink = (
    id: string
): Promise<AxiosResponse> => {
    return api.get(`/api/v2/platform/digital_links/${id}`);
}
export const ReturnAListOfDigitalLinks = (
    page?: number,
    per_page?: number,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    return api.get(`/api/v2/platform/digital_links?${params.toString()}`);
}
export const UpdateADigitalLink = (
    data: { digital_link: DigitalLink },
    id: string
): Promise<AxiosResponse> => {
    return api.patch(`/api/v2/platform/digital_links/${id}`, data);
}

export const ResetADigitalAsset = (
    id: string
): Promise<AxiosResponse> => {
    return api.patch(`/api/v2/platform/digital_links/${id}/reset`);
}
