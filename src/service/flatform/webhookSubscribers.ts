import api from "../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Subscriber } from '../../interface/sendData/interfaceFlatform'

export const CreateAWebhookSubscriber = (data: { subscriber: Subscriber }): Promise<AxiosResponse> => {
    return api.post(`/api/v2/platform/webhooks/subscribers`, data);
}
export const DeleteAWebhookSubscriber = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/webhooks/subscribers/${id}`);
}
export const ReturnAListOfWebhookSubscribers = (
    page?: number,
    per_page?: number,
    filter_active_eq?: string,
    filter_url_cont?: string
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (filter_active_eq) params.append("filter[active_eq]", filter_active_eq);
    if (filter_url_cont) params.append("filter[url_cont]", filter_url_cont);

    return api.get(`/api/v2/platform/webhooks/subscribers?${params.toString()}`);
}
export const ReturnAWebhookSubscriber = (id: string): Promise<AxiosResponse> => {
    return api.get(`/api/v2/platform/webhooks/subscribers/${id}`);
}
export const UpdateAWebhookSubscriber = (data: { subscriber: Subscriber }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/api/v2/platform/webhooks/subscribers/${id}`, data);
}