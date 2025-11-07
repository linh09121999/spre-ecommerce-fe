import api from "../../api/apiOrderToken";

export const ListAllPostCategories = (
    filter_ids?: string,
    filter_title?: string,
    page?: number,
    per_page?: number,
    sort?: string,
) => {
    const params = new URLSearchParams();
    if (filter_ids) params.append("filter[ids]", filter_ids);
    if (filter_title) params.append("filter[title]", filter_title);
    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (sort) params.append("sort", sort);

    return api.get(`/storefront/post_categories?${params.toString()}`)
}
export const RetrieveAPostCategory = (id: number, include?: string) => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);

    return api.get(`/storefront/post_categories/${id}?${params.toString()}`)
}
