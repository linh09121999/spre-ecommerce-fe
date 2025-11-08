import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Vendor } from '../../interface/sendData/interfaceFlatform'


export const ReturnAListOfVendors = (
    page?: number,
    per_page?: number,
    include?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    return api.get(`/platform/vendors?${decodeURIComponent(params.toString())}`);
}

export const CreateAVendor = (data: Vendor, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/platform/vendors?${decodeURIComponent(params.toString())}`, data);
}

export const DeleteAVendor = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/vendors/${id}`);
}

export const UpdateAVendor = (data: Vendor, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/vendors/${id}?${decodeURIComponent(params.toString())}`, data);
}

export const ApprovesVendor = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/vendors/${id}/approve?${decodeURIComponent(params.toString())}`);
}
export const completesOnboardingProcess = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/vendors/${id}/complete_onboarding?${decodeURIComponent(params.toString())}`);
}

export const InvitesVendorToThePlatform = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/vendors/${id}/invite?${decodeURIComponent(params.toString())}`);
}
export const rejectsVendor = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/vendors/${id}/reject?${decodeURIComponent(params.toString())}`);
}

export const ReturnAVendor = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/platform/vendors/${id}?${decodeURIComponent(params.toString())}`);
}
export const StartOnboardingProcess = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/vendors/${id}/start_onboarding?${decodeURIComponent(params.toString())}`);
}
export const suspendsVendor = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/platform/vendors/${id}/suspend?${decodeURIComponent(params.toString())}`);
}
