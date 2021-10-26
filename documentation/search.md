# Search one or more companies

**URL** : `https://api.fidelight.fr/v1/v1/search/company/$parameters?`

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
      "companyId": 56,
      "name": "Kebab Flowerish",
      "description": "Best kebab of Paris since 1958",
      "companyTypeId": 3,
      "city": "Paris",
      "streetName": "Rue du Poulet",
      "streetNumber": 22,
      "logo": "https://storage.google.com/company/kebab_flowerish_16515.jpg"
    },
    {
      "companyId": 1523,
      "name": "Coffee Shop Petunia",
      "description": "Perfect Coffee is your coffee shop since 1989 ...",
      "companyTypeId": 5,
      "city": "Paris",
      "streetName": "Rue du Paprika",
      "streetNumber": 357,
      "logo": "https://storage.google.com/company/cofee_shop_petunia_16515.jpg"
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
