# Get earning policy types

**URL** : `https://api.fidelight.fr/v1/points/type`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "types": [
      {
        "id": 1,
        "title": "Points per visit",
        "description": "Give the customer an amount of fidelity points every time he visits you!"
      },
      {
        "id": 2,
        "title": "Percentage of the price",
        "description": "Give back fidelity points to the customer based on the price he just paid."
      }
    ]
  },
  "msg": "success"
}
```


# Get the earning policy of a company

**URL** : `https://api.fidelight.fr/v1/company/points/$company.id`

**Method** : `GET`

**Auth required** : YES, as a user or a company.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "type": 1,
    "title": "Points per visit",
    "description": "Give the customer an amount of fidelity points every time he visits you!",
    "value": 15,
  },
  "msg": "success"
}
```

# Define the earning policy of a company

**URL** : `https://api.fidelight.fr/v1/company/points`

**Method** : `POST`

**Auth required** : YES

## Request Format

**Content example**

```json
{
  "type": 1,
  "value": 15
}
```

## Success Response

**Code** : `200 OK`


# Edit the earning policy of a company

**URL** : `https://api.fidelight.fr/v1/company/points`

**Method** : `PUT`

**Auth required** : YES

## Request Format

**Content example**

```json
{
  "type": 1,
  "value": 15
}
```

## Success Response

**Code** : `200 OK`


# Error Response

Code | Solution
--- | ---
`500 Internal server error` | Something happened on the server side. Try again later.
`400 Bad request` | Verify the format of the query.
`401 Unauthorized` | Provide an access token or refresh it using the refreshing route and the refrresh token.
`403 Forbidden` | The access token does not allow you to do this action
`409 Conflict` | The email is already registered. Try with another one.
`410 Gone` | Verify the logs, usually happens when db query fails.
