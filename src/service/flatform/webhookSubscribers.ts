import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";
import { type Subscriber } from '../../interface/sendData/interfaceFlatform'

export const CreateAWebhookSubscriber = (data: { subscriber: Subscriber }): Promise<AxiosResponse> => {
    return api.post(`/platform/webhooks/subscribers`, data);
}
export const DeleteAWebhookSubscriber = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/platform/webhooks/subscribers/${id}`);
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

    return api.get(`/platform/webhooks/subscribers?${params.toString()}`);
}
export const ReturnAWebhookSubscriber = (id: string): Promise<AxiosResponse> => {
    return api.get(`/platform/webhooks/subscribers/${id}`);
}
export const UpdateAWebhookSubscriber = (data: { subscriber: Subscriber }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/platform/webhooks/subscribers/${id}`, data);
}