import api from "../api/apiAuthorization";

export const OAuthToken = (
    data: {
        grant_type: 'password',
        username: string,
        password: string
    }
) => {
    return api.post(`/spree_oauth/token`, data,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }
    )
}
