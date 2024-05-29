const axios = require('axios');
const btoa = require('btoa');

class OAuthToken {
    constructor(client_id, client_secret) {
        this.client_id = client_id;
        this.client_secret = client_secret;
    }

    getBase64Encoding() {
        const credentials = `${this.client_id}:${this.client_secret}`;
        const base64String = btoa(credentials);
        return base64String;
    }

    async getApplicationToken() {
        const url = 'https://api.ebay.com/identity/v1/oauth2/token';

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${this.getBase64Encoding()}`
        };

        const data = new URLSearchParams();
        data.append('grant_type', 'client_credentials');
        data.append('scope', 'https://api.ebay.com/oauth/api_scope');

        try {
            const response = await axios.post(url, data, { headers });
            return response.data.access_token;
        } catch (error) {
            console.error('Error obtaining access token:', error);
            throw error;
        }
    }
}

// Usage example
const client_id = 'your_client_id';
const client_secret = 'your_client_secret';

const oauthToken = new OAuthToken(client_id, client_secret);

oauthToken.getApplicationToken()
    .then((accessToken) => {
        console.log('Access Token:', accessToken);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
