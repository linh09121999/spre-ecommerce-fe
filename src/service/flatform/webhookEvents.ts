import api from "../../api/apiAuthorization";
import { type AxiosResponse } from "axios";

export const ReturnAListOfWebhookEvents = (
    page?: number,
    per_page?: number,
    include?: string,
    filter_name_eq?: string,
    filter_request_errors_cont?: string,
    filter_response_code_eq?: string,
    filter_success_eq?: string,
    filter_url_cont?: string,
): Promise<AxiosResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (filter_name_eq) params.append("filter[name_eq]", filter_name_eq);
    if (filter_request_errors_cont) params.append("filter[request_errors_cont]", filter_request_errors_cont);
    if (filter_response_code_eq) params.append("filter[response_code_eq]", filter_response_code_eq);
    if (filter_success_eq) params.append("filter[success_eq]", filter_success_eq);
    if (filter_url_cont) params.append("filter[url_cont]", filter_url_cont);

    return api.get(`/platform/webhooks/events?${params.toString()}`);
}