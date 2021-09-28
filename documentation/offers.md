# Get discount types

**URL** : `https://api.fidelight.fr/v1/discount/type/`

**Method** : `GET`

**Auth required** : YES, as a user or a company.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "types": [
      {
        "id": 1,
        "title": "Free ticket",
        "description": "The custommer will have a free prestation next time he will be visiting your shop!"
      },
      {
        "id": 2,
        "title": "Percentage of the price",
        "description": "The custommer will have a discount that values a percent (that your can define) of the price."
      }
    ]
  },
  "msg": "success"
}
```


# Post an offer or a discount

**URL** : `https://api.fidelight.fr/v1/discount/`

**Method** : `POST`

**Auth required** : YES

## Request format

**Content example**

```json
{
  "company": 9,
  "discountType": 2,
  "nbMax": null,
  "cost": 200,
  "name": "-4€ on the kebabs",
  "description": "Pay your kebab 3 euros instead of 7 in your Perfect Coffee shop !",
  "product": "Kebab",
  "startDate": null,
  "expirationDate": null,
  "perDay": {
    "monday": 0,
    "tuesday": 1,
    "wednesday": 0,
    "thursday": 1,
    "friday": 0,
    "saturday": 1,
    "sunday": 1
  },
  "value": 5.0
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Discount successfully created!"
}
```


# Edit an offer or a discount

**URL** : `https://api.fidelight.fr/v1/discount/$discount.id`

**Method** : `PUT`

**Auth required** : YES

## Request format

**Content example**

```json
{
  "discount_type": 3,
  "nbMax": null,
  "cost": 250,
  "name": "-4€ on the tacos",
  "description": "Pay your tacos 3 euros instead of 7 in your Perfect Coffee shop !",
  "product": "Tacos",
  "startDate": null,
  "expirationDate": null,
  "perDay": {
    "monday": 1,
    "tuesday": 1,
    "wednesday": 0,
    "thursday": 1,
    "friday": 0,
    "saturday": 1,
    "sunday": 1
  },
  "value": 5.10
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Discount successfully edited!"
}
```


# Delete an offer or a discount

**URL** : `https://api.fidelight.fr/v1/discount/$discount.id`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Discount successfully deleted!"
}
```


# List all offers or discounts of a company

**URL** : `https://api.fidelight.fr/v1/discount/company/$company.id`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "discounts": [
      {
        "id": 5896,
        "discountType": 3,
        "cost": 250,
        "name": "-4€ on the tacos",
        "perDay": ["monday", "tuesday", "thursday"],
        "value": 5.1
      },
      {
        "id": 8955,
        "discountType": 2,
        "cost": 50,
        "name": "-50% on the tea",
        "value": 25
      }
    ]
  },
  "msg": "success"
}
```


# Get details about a discount or an offer

**URL** : `https://api.fidelight.fr/v1/discount/$discount.id`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "id": 5896,
    "company": 9,
    "discountType": 3,
    "name": "-4€ on the tacos",
    "description": "Pay your kebab 3 euros instead of 7 in your Perfect Coffee shop !",
    "product": "Kebab",
    "cost": 250,
    "nbMax": null,
    "startDate": null,
    "expirationDate": null,
    "perDay": {
      "monday": 1,
      "tuesday": 1,
      "wednesday": 0,
      "thursday": 1,
      "friday": 0,
      "saturday": 1,
      "sunday": 1
    },
    "value": 3
  },
  "msg": "success"
}
```


# Use an offer on a user

**URL** : `https://api.fidelight.fr/v1/discount/use/$user.id`

**Method** : `GET`

**Auth required** : YES

## Request Format

**Content example**

```json
{
  "user": "aLFO1AlBdL.5",
  "discount": 164
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "transaction": 56464
  },
  "msg": "success"
}
```


# Get the hot deals in a city

**URL** : `https://api.fidelight.fr/v1/discount/hotdeals/$city`

**Method** : `GET`

**Auth required** : YES

**Details** : Giving a maximum of 6 most used active discounts.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "topDiscounts": [
      {
        "discount": 9,
      },
      {
        "discount": 12,
      },
    ]
  },
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
