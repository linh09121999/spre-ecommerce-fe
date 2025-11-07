import api from "../../api/apiOrderToken";

export const ListAllVendors = (
    page?: number,
    per_page?: number,
    fields_vendor?: string
) => {
    const params = new URLSearchParams();
    if (page) params.append("page", String(page));
    if (per_page) params.append("per_page", String(per_page));
    if (fields_vendor) params.append("fields[vendor]", fields_vendor);

    return api.get(`/storefront/vendors?${params.toString()}`)
}
export const RetrieveAVendor = (
    vendor_slug: string,
    fields_vendor?: string
) => {
    const params = new URLSearchParams();
    if (fields_vendor) params.append("fields[vendor]", fields_vendor);

    api.get(`/storefront/vendors/${vendor_slug}?${params.toString()}`)
}
