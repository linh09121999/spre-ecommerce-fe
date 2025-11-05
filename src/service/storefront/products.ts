import api from "../api/apiOrderToken";

export const ListAllProducts = (
    filter_ids?: string,
    filter_skus?: string,
    filter_price?: string,
    filter_taxons?: string,
    filter_vendor_ids?: string,
    filter_name?: string,
    filter_options_tshirt_color?: string,
    filter_properties_brand_name?: string,
    filter_show_deleted?: boolean,
    filter_show_discontinued?: boolean,
    filter_in_stock?: boolean,
    filter_backorderable?: boolean,
    filter_purchasable?: boolean,
    sort?: string,
    page?: number,
    per_page?: number,
    include?: string,
    fields_product?: string,
    image_transformation_size?: string,
    image_transformation_quality?: string,
) => {
    const params = new URLSearchParams();
    if (filter_ids) params.append("filter[ids]", filter_ids);
    if (filter_skus) params.append("filter[skus]", filter_skus);
    if (filter_price) params.append("filter[price]", filter_price);
    if (filter_taxons) params.append("filter[taxons]", filter_taxons);
    if (filter_vendor_ids) params.append("filter[vendor_ids]", filter_vendor_ids);
    if (filter_name) params.append("filter[name]", filter_name);
    if (filter_options_tshirt_color) params.append("filter[options][tshirt-color]", filter_options_tshirt_color);
    if (filter_properties_brand_name) params.append("filter[properties][brand-name]", filter_properties_brand_name);
    if (filter_show_deleted) params.append("filter[show_deleted]", String(filter_show_deleted));
    if (filter_show_discontinued) params.append("filter[show_discontinued]", String(filter_show_discontinued));
    if (filter_in_stock) params.append("filter[in_stock]", String(filter_in_stock));
    if (filter_backorderable) params.append("filter[backorderable]", String(filter_backorderable));
    if (filter_purchasable) params.append("filter[purchasable]", String(filter_purchasable));
    if (sort) params.append("sort", sort);
    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (include) params.append("include", include);
    if (fields_product) params.append("fields[product]", fields_product);
    if (image_transformation_size) params.append("image_transformation[size]", image_transformation_size);
    if (image_transformation_quality) params.append("image_transformation[quality]", image_transformation_quality);

    return api.get(`/api/v2/storefront/products?${params.toString()}`)
}
export const RetrieveAProduct = (
    product_slug: string,
    include?: string,
    fields_product?: string,
    image_transformation_size?: string,
    image_transformation_quality?: string,
) => {
    const params = new URLSearchParams();
    if (include) params.append("include", include);
    if (fields_product) params.append("fields[product]", fields_product);
    if (image_transformation_size) params.append("image_transformation[size]", image_transformation_size);
    if (image_transformation_quality) params.append("image_transformation[quality]", image_transformation_quality);

    return api.get(`/api/v2/storefront/products/${product_slug}?${params.toString()}`)
}
