# To know before using the API

Please use HTTPS to communicate with the API.

The domain name `api.fidelight.fr` is redirecting (status 302) on `fidelightapp-314712.ew.r.appspot.com`. If you have issues using the first one you can use the second.

These functions are not supported yet :
- Connect with facebook
- Forgot password

Error codes are at the end of the file.

# Files

The different parts of the API are available here:
- companies [here](./companies.md)
- users [here](./users.md)
- searching functionnality [here](./search.md)
- offers / hot deals / discount [here](./offers.md)
- transactions [here](./transactions.md)
- earning policies of companies [here](./earningPolicies.md)

# Error Response

Code | Solution
--- | ---
`500 Internal server error` | Something happened on the server side. Try again later.
`400 Bad request` | Verify the format of the query.
`401 Unauthorized` | Provide an access token or refresh it using the refreshing route and the refrresh token.
`403 Forbidden` | The access token does not allow you to do this action
`409 Conflict` | The email is already registered. Try with another one.
`410 Gone` | Verify the logs, usually happens when db query fails.
