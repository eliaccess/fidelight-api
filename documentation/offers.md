# Get discount types

**URL** : `https://api.fidelight.fr/v1/discount/type/`

**Method** : `GET`

**Auth required** : YES, as a user or a company.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":[
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
  ],
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


# Add / Edit the picture of a discount

**URL** : `https://api.fidelight.fr/v1/discount/picture`

**Method** : `POST`

**Auth required** : YES

## Request Format

Put the file in a form, with "picture" as key.

**Content example**

```json
{
  "discount": 7
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Picture successfully added!",
  "data":{
    "pictureUrl": "https://storage.googleapis.com/fidelight-api/discount/kebab44_picture.jpeg"
  }
}
```


# Delete the logo of a discount

**URL** : `https://api.fidelight.fr/v1/discount/picture`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Picture successfully deleted!"
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
    "rewards": [
      {
        "id": 5896,
        "discountType": 3,
        "cost": 250,
        "name": "-4€ on the tacos",
        "perDay": {
          "monday": 0,
          "tuesday": 1,
          "wednesday": 1,
          "thursday": 0,
          "friday": 0,
          "saturday": 1,
          "sunday": 0
        },
        "value": 5.1
      },
      {
        "id": 8955,
        "discountType": 2,
        "cost": 50,
        "name": "-50% on the tea",
        "perDay": {
          "monday": 1,
          "tuesday": 1,
          "wednesday": 1,
          "thursday": 1,
          "friday": 1,
          "saturday": 1,
          "sunday": 0
        },
        "value": 25
      }
    ],
    "offers": [
      {
        "id": 5896,
        "discountType": 3,
        "cost": 0,
        "name": "40% off on the kebab sandwich",
        "perDay": {
          "monday": 1,
          "tuesday": 1,
          "wednesday": 0,
          "thursday": 0,
          "friday": 0,
          "saturday": 1,
          "sunday": 0
        },
        "value": 2.5
      },
      {
        "id": 8955,
        "discountType": 2,
        "cost": 0,
        "name": "-10% on the tea",
        "perDay": {
          "monday": 0,
          "tuesday": 0,
          "wednesday": 1,
          "thursday": 0,
          "friday": 0,
          "saturday": 1,
          "sunday": 1
        },
        "value": 5
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

**URL** : `https://api.fidelight.fr/v1/discount/use/`

**Method** : `POST`

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
  "data":[
    {
      "id": 9,
      "timesUsed": 25,
      "name": "-25% on every tacos",
      "description": "Eat your tacos for only 6 euros !",
      "cost": 25,
      "pictureLink": "https://storage.google.com/discount/miam_miam.png"
    },
    {
      "id": 4,
      "timesUsed": 12,
      "name": "Your free haircut !",
      "description": "Come and get a new style for only 25 fidelity points!",
      "cost": 25,
      "pictureLink": "https://storage.google.com/discount/haircut_design_free.png"
    },
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
