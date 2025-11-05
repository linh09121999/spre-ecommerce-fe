import api from "../api";
import { type AxiosResponse } from "axios";
import { type Vendor } from '../../interface/interfaceSendData'


export const ReturnAListOfVendors = (
    page?: number,
    per_page?: number,
    include?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/vendors?${params.toString()}`);
}

export const CreateAVendor = (data: Vendor, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/vendors?${params.toString()}`, data);
}

export const DeleteAVendor = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/vendors/${id}`);
}

export const UpdateAVendor = (data: Vendor, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/vendors/${id}?${params.toString()}`, data);
}

export const ApprovesVendor = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/vendors/${id}/approve?${params.toString()}`);
}
export const completesOnboardingProcess = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/vendors/${id}/complete_onboarding?${params.toString()}`);
}

export const InvitesVendorToThePlatform = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/vendors/${id}/invite?${params.toString()}`);
}
export const rejectsVendor = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/vendors/${id}/reject?${params.toString()}`);
}

export const ReturnAVendor = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/vendors/${id}?${params.toString()}`);
}
export const StartOnboardingProcess = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/vendors/${id}/start_onboarding?${params.toString()}`);
}
export const suspendsVendor = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/vendors/${id}/suspend?${params.toString()}`);
}
