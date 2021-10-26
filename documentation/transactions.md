# Get the details of a transaction

**URL** : `https://api.fidelight.fr/v1/transaction/$transaction.id`

**Method** : `GET`

**Auth required** : YES

**Details** : Of the transaction is a discount, discount id and discount name are sent. If not, then only the other data are sent.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "transaction": 256,
    "discount_id": 30,
    "discount_name": "50 cts off on the croissants",
    "company_id": 56,
    "company_name": "The Coffee",
    "user_id": 31,
    "user_surname": "Peter",
    "user_name": "Jackson",
    "value": 800,
    "date": "2021-01-02T09:34:12.648Z"
  },
  "msg": "success"
}
```


# Delete a transaction

**URL** : `https://api.fidelight.fr/v1/transaction/$transaction.id`

**Method** : `DELETE`

**Auth required** : YES, as a company

**Details** : It is impossible to delete a transaction that was done more than 10 minutes ago (will return a status with a message).

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Transaction successfully deleted!"
}
```


# Get the last 20 transactions of a user or a company

**URL** : `https://api.fidelight.fr/v1/transaction`

**Method** : `GET`

**Auth required** : YES

**Details** : The transactions are limited to 20 and are ordered from the most to the least recent.

## Success Response

**Code** : `200 OK`

**Content example for a user**

```json
{
  "data":{
    "transactions": [
      {
        "id": 2,
        "companyId": 56,
        "companyName": "The Coffee",
        "companyLogoLink": "https://storage.google.com/company/logo/the_coffe_azeaze.png",
        "discountId": 654,
        "discountName": "-4 euros on the Kebabs",
        "value": 800,
        "date": "2021-01-02T09:34:12.648Z"
      },
      {
        "id": 18,
        "companyId": 13,
        "companyName": "Pizza'Yolo",
        "companyLogoLink": "https://storage.google.com/company/logo/pizza_yolo_azeojn6.png",
        "discount": null,
        "value": 120,
        "date": "2021-01-01T10:39:14.698Z"
      }
    ]
  },
  "msg": "success"
}
```

**Content example for a company**

```json
{
  "data":{
    "transactions": [
      {
        "id": 2,
        "discountId": 654,
        "discountName": "-4 euros on kebabs",
        "userSurname": "Jeff",
        "value": 800,
        "date": "2021-01-02T09:34:12.648Z"
      },
      {
        "id": 18,
        "userSurname": "Jeff",
        "discount": null,
        "value": 120,
        "date": "2021-01-01T10:39:14.698Z"
      }
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
