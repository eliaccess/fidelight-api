'use strict'

const { google } = require('googleapis');
const { oauth2, oauth2_v2 } = require('googleapis/build/src/apis/oauth2');
//const credentials = require('../modules/google').google

class googleApi {
    constructor(){
        const {client_id, client_secret, redirectUri } = {
            client_id: "385935001269-vmeirtcck4u6gcur3ln4688pi4ap1rdh.apps.googleusercontent.com",
            client_secret: "6Aa6X1S5ULfDi5uwPbNagdBV",
            redirectUri: "http://localhost:8000/api/user/gauth/authenticate/"
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