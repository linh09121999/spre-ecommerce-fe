import api from "../api";
import { type AxiosResponse } from "axios";
import { type Shipment, ShipmentUpdate, ShipmentItem } from '../../interface/interfaceSendData'

export const ReturnAListOfShipments = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_state_eq?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_state_eq) params.append("filter[state_eq]", filter_state_eq);

    return api.get(`/api/v2/platform/shipments?${params.toString()}`);
}

export const CreateAShipment = (data: { shipment: Shipment }, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.post(`/api/v2/platform/shipments?${params.toString()}`, data);
}

export const ReturnAShipment = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.get(`/api/v2/platform/shipments/${id}?${params.toString()}`);
}

export const DeleteAShipment = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/shipments/${id}`);
}

export const UpdateAShipment = (data: { shipment: ShipmentUpdate }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/shipments/${id}?${params.toString()}`, data);
}

export const AddsItemVariantToAnExistingShipment = (data: { shipment: ShipmentItem }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/shipments/${id}/add_item?${params.toString()}`, data);
}

export const AarkShipmentAsReadyToBeShipped = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/shipments/${id}/ready?${params.toString()}`);
}

export const RemovesItemWariantFromShipment = (data: { shipment: ShipmentItem }, id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/shipments/${id}/remove_item?${params.toString()}`, data);
}

export const CancelsTheShipment = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/shipments/${id}/cancel?${params.toString()}`);
}

export const AarkShipmentAsShipped = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/shipments/${id}/ship?${params.toString()}`);
}
export const AovesShipmentBackToPendingState = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/shipments/${id}/pend?${params.toString()}`);
}

export const ResumesTheShipment = (id: string, include?: string): Promise<AxiosResponse> => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    return api.patch(`/api/v2/platform/shipments/${id}/resume?${params.toString()}`);
}


