import api from "../api/apiOrderToken";

export const ListAllTaxons = (
    filter_ids?: string,
    filter_name?: string,
    filter_parent_id?: string,
    filter_parent_permalink?: string,
    filter_taxonomy_id?: string,
    filter_roots?: boolean,
    filter_vendor_id?: string,
    page?: number,
    per_page?: number,
    include?: string,
    fields_taxon?: string
) => {
    const params = new URLSearchParams();
    if (filter_ids) params.append("filter[ids]", filter_ids);
    if (filter_name) params.append("filter[name]", filter_name);
    if (filter_parent_id) params.append("filter[parent_id]", filter_parent_id);
    if (filter_parent_permalink) params.append("filter[parent_permalink]", filter_parent_permalink);
    if (filter_taxonomy_id) params.append("filter[taxonomy_id]", filter_taxonomy_id);
    if (filter_roots) params.append("filter[roots]", String(filter_roots));
    if (filter_vendor_id) params.append("filter[vendor_id]", filter_vendor_id);
    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (fields_taxon) params.append("fields[taxon]", fields_taxon);

    return api.get(`/api/v2/storefront/taxons?${params.toString()}`)
}
export const RetrieveATaxon = (
    taxon_permalink: string,
    include?: string,
    fields_taxon?: string
) => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_taxon) params.append("fields[taxon]", fields_taxon);

    return api.get(`/api/v2/storefront/taxons/${taxon_permalink}?${params.toString()}`)
}
