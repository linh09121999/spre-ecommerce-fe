import api from "../api/apiOrderToken";

export const DownloadADigitalAsset = (token: string) => api.get(`/api/v2/storefront/digitals/${token}`)
