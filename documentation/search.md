# To know before using the API

Please use HTTPS to communicate with the API.

The domain name `api.fidelight.fr` is redirecting (status 302) on `fidelightapp-314712.ew.r.appspot.com`. If you have issues using the first one you can use the second.

These functions are not supported yet :
- Connect with facebook
- Forgot password
- Upload logos and background pictures (coming soon)

Error codes are at the end of the file.


# Search one or more companies

**URL** : `https://api.fidelight.fr/v1/discount/hotdeals/$parameters?`

**Method** : `GET`

**Auth required** : YES

**Details** : Route to search companies using one or more parameters:

Parameter | Usage
--- | ---
city | Used to search companies in a precise city.
name | Used to search using the name of a company, or a part of its name.
type | Pass company type here to search companies by category.
page | If there are more than 10 results, this parameter is used to get the first 10 results if equals to 1, the 10 next if equals to 2 etc. Default value is 1.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": [
    {
      "id": 1523,
      "name": "Coffee Shop Petunia",
      "description": "Perfect Coffee is your coffee shop since 1989 ...",
      "company_type": 5,
      "city": "Paris",
      "street_name": "Rue du Paprika",
      "street_number": 357,
      "logo": "/company/cofee_shop_petunia_16515.jpg"
    }
  ],
  "msg": "success"
}
```


# Error Response

Code | Solution
--- | ---
`500 Internal server error` | Something happened on the server side. Try again later.
`400 Bad request` | Verify the format of the query.
`401 Unauthorized` | Provide an access token or refresh it using the refreshing route and the refrresh token.
`403 Forbidden` | The access token does not allow you to do this action
`409 Conflict` | The email is already registered. Try with another one.
`410 Gone` | Verify the logs, usually happens when db query fails.
