import api from "../api";
import { type AxiosResponse } from "axios";
import { type  DataFeed} from '../../interface/interfaceSendData'


export const CreateADataFeed = (data: { data_feed: DataFeed }): Promise<AxiosResponse> => {
    return api.post(`/api/v2/platform/data_feeds`, data);
}
export const DeleteADataFeed = (id: string): Promise<AxiosResponse> => {
    return api.delete(`/api/v2/platform/data_feeds/${id}`);
}
export const ReturnADataFeed = (id: string): Promise<AxiosResponse> => {
    return api.get(`/api/v2/platform/data_feeds/${id}`);
}
export const ReturnAListOfDataFeeds = (
    page?: number,
    per_page?: number,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    return api.get(`/api/v2/platform/data_feeds?${params.toString()}`);
}
export const UpdateADataFeed = (data: { data_feed: DataFeed }, id: string): Promise<AxiosResponse> => {
    return api.patch(`/api/v2/platform/data_feeds/${id}`, data);
}