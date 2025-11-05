import api from "../api";
import { type AxiosResponse } from "axios";

export const ReturnsACountry = (id: string): Promise<AxiosResponse> => {
    return api.get(`/api/v2/platform/countries/${id}`);
}
export const ReturnsAListOfCountries = (): Promise<AxiosResponse> => {
    return api.get(`/api/v2/platform/countries`);
}