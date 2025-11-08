import api from "../../api/apiOrderToken";

export const ListAllPost = (
    filter_ids?: string,
    filter_title?: string,
    filter_post_category_id?: string,
    filter_post_category_slug?: string,
    page?: number,
    per_page?: number,
    sort?: string,
    include?: string,
) => {
    const params = new URLSearchParams();
    if (filter_ids) params.append("filter[ids]", filter_ids);
    if (filter_title) params.append("filter[title]", filter_title);
    if (filter_post_category_id) params.append("filter[post_category_id]", filter_post_category_id);
    if (filter_post_category_slug) params.append("filter[post_category_slug]", filter_post_category_slug);
    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (sort) params.append("sort", sort);
    if (include) params.append("include", include);

    return api.get(`/storefront/posts?${decodeURIComponent(params.toString())}`)
}
export const RetrieveAPost = (
    id: number,
    include?: string,
) => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);

    return api.get(`/storefront/posts/${id}?${decodeURIComponent(params.toString())}`)
}
