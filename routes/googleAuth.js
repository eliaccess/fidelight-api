'use strict'

const { google } = require('googleapis');
const { oauth2, oauth2_v2 } = require('googleapis/build/src/apis/oauth2');
//const credentials = require('../modules/google').google

class googleApi {
    constructor(){
        const {client_id, client_secret, redirectUri } = {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_SECRET,
            redirectUri: process.env.GOOGLE_REDIRECT_URI
        };
        this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirectUri)
    }

    generateUrl(scopes){
        const url = this.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes.join(' ')
        })
        return url;
    }

    async getUserInfo(code){
        const credentials = await this.oAuth2Client.getToken(code);
        this.oAuth2Client.setCredentials(credentials.tokens);
        const plus = google.oauth2({
            version: 'v2',
            auth: this.oAuth2Client,
        });
        const data = await plus.userinfo.get();
        const full_data = {usrData: data.data, refresh_token: credentials.tokens.refresh_token};

        return full_data;
    }
}

module.exports = new googleApi();