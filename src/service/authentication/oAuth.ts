import api from "../api/apiAuthorization";

export const GeneratingOAuthToken = (
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

export const RefreshingOAuthToken = (
    data: {
        grant_type: 'refresh_token',
        refresh_token: string
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
