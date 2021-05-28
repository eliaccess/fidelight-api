# To know before using the API

Please use HTTPS to communicate with the API.

The domain name `api.fidelight.fr` is redirecting (status 302) on `fidelightapp-314712.ew.r.appspot.com`. If you have issues using the first one you can use the second.

These functions are not supported yet :
- Connect with facebook
- Forgot password
- Upload logos and background pictures (coming soon)

Error codes are at the end of the file.

# Register a user

**URL** : `https://api.fidelight.fr/v1/user/register`

**Method** : `POST`

**Auth required** : NO

## Request Format

**Content example**

```json
{
  "surname": "Jeff",
  "name": "Dos Santos",
  "phone": "0605040302",
  "password": "this_is_a_password_12",
  "email": "jeff.dos-santos@gmail.com",
  "birthdate": "1995-05-21"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "id": 2,
  "qr_key": "aLFO1AlBdL.2",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```


# Unregister a user

**URL** : `https://api.fidelight.fr/v1/user/register`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`


# Register / login a user through Google OAuth2.0

**URL** : `https://api.fidelight.fr/v1/user/register/gauth`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

Answers with a link to authentify with google. Redirecting on `https://api.fidelight.fr/v1/user/register/gauth/authenticate` to get this :

```json
{
  "id": 2,
  "qrCode": "aLFO1AlBdL.2",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```


# Register / login a user through Facebook OAuth2.0 (unsupported yet, do not work with it)

**URL** : `https://api.fidelight.fr/v1/user/register/fauth`

**Method** : `GET`

**Auth required** : NO

## Request Format

**Content example**
To define

## Success Response

**Code** : `200 OK`


# Change the password of a user

**URL** : `https://api.fidelight.fr/v1/user/password/`

**Method** : `PUT`

**Auth required** : YES

## Request Format

**Content example**

```json
{
  "previous_password": "this_is_a_password_12",
  "password": "this_is_a_password_13"
}
```

## Success Response

**Code** : `200 OK`


# Refresh the access token of a user

**URL** : `https://api.fidelight.fr/v1/user/token/`

**Method** : `POST`

**Auth required** : NO

## Request Format

**Content example**

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```


# Login a user

**URL** : `https://api.fidelight.fr/v1/user/login/`

**Method** : `POST`

**Auth required** : NO

## Request Format

**Content example**

```json
{
  "email": "jeff.dos-santos@gmail.com",
  "password": "this_is_a_password_13",
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "id": 2,
  "qrCode": "aLFO1AlBdL.2",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```


# Get the profile of a user

**URL** : `https://api.fidelight.fr/v1/user/profile/`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "surname": "Jeff",
  "name": "Dos Santos",
  "phone": "0605040302",
  "email": "jeff.dos-santos@gmail.com",
  "birthdate": 1995-05-21
}
```


# Edit the profile of a user

**URL** : `https://api.fidelight.fr/v1/user/profile/`

**Method** : `PUT`

**Auth required** : YES

## Request Format

**Content example**

```json
{
  "surname": "Jeff",
  "name": "Dos Santos",
  "phone": "0605040302",
  "email": "jeff.dos-santos@gmail.com",
  "birthdate": 1995-05-21
}
```

## Success Response

**Code** : `200 OK`


# Get the balance of a user in a company

**URL** : `https://api.fidelight.fr/v1/user/balance/$company_id`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "balance": 650
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
  "transactions": [
    {
      "transaction": 2,
      "company_id": 56,
      "company_name": "The Coffee",
      "discount": 654,
      "value": 800,
      "date": "2021-01-02T09:34:12.648Z"
    },
    {
      "transaction": 18,
      "company_id": 13,
      "company_name": "Pizza'Yolo",
      "discount": null,
      "value": 120,
      "date": "2021-01-01T10:39:14.698Z"
    }
  ]
}
```

**Content example for a company**

```json
{
  "transactions": [
    {
      "transaction": 2,
      "user": 264,
      "discount": 654,
      "value": 800,
      "date": "2021-01-02T09:34:12.648Z"
    },
    {
      "transaction": 18,
      "user": 25,
      "discount": null,
      "value": 120,
      "date": "2021-01-01T10:39:14.698Z"
    }
  ]
}
```


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
}
```


# Add a company to likes

**URL** : `https://api.fidelight.fr/v1/user/like/`

**Method** : `POST`

**Auth required** : YES

**Content example**

```json
{
  "company": 31
}
```

## Success Response

**Code** : `200 OK`


# Get all liked companies

**URL** : `https://api.fidelight.fr/v1/user/like/`

**Method** : `GET`

**Auth required** : YES

**Content example**

```json
{
  "companies":[
    {
      "company": 10
    },
    {
      "company": 117
    }
  ]
}
```

## Success Response

**Code** : `200 OK`


# Remove a company from likes

**URL** : `https://api.fidelight.fr/v1/user/like/$company.id`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`


# Get company types

**URL** : `https://api.fidelight.fr/v1/company/type`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "types": [
    {
      "id": 1,
      "title": "Bakery",
      "description": "A place that sells some nice bread."
    },
    {
      "id": 2,
      "title": "Restaurant",
      "description": "A shop where food is cooked and sold to feast."
    }
  ]
}
```


# Register a company

**URL** : `https://api.fidelight.fr/v1/company/register`

**Method** : `POST`

**Auth required** : NO

## Request Format

**Content example**

```json
{
  "name": "Coffee Shop Petunia",
  "password": "this_is_a_password_12",
  "email": "jeff.dos-santos@gmail.com",
  "description": "Perfect Coffee is your coffee shop since 1989 ...",
  "phone": "0605040302",
  "company_type": 5,
  "country": "France",
  "city": "Paris",
  "street_name": "Rue du Paprika",
  "street_number": 357
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "id": 7,
  "login": "coffeeshop12",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```


# Unregister a company

**URL** : `https://api.fidelight.fr/v1/company/register`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`


# Login as a company

**URL** : `https://api.fidelight.fr/v1/company/login`

**Method** : `POST`

**Auth required** : NO

## Request Format

**Content example**

```json
{
  "password": "this_is_a_password_12",
  "email": "jeff.dos-santos@gmail.com"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "id": 7,
  "login": "coffeeshop12",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```


# Refresh the access token of a company

**URL** : `https://api.fidelight.fr/v1/company/token/`

**Method** : `POST`

**Auth required** : NO

## Request Format

**Content example**

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```


# Change the password of a company

**URL** : `https://api.fidelight.fr/v1/company/password`

**Method** : `PUT`

**Auth required** : YES

## Request Format

**Content example**

```json
{
  "previous_password": "this_is_a_password_12",
  "password": "this_is_a_password_13"
}
```

## Success Response

**Code** : `200 OK`


# Add / Edit the logo of a company

**URL** : `https://api.fidelight.fr/v1/company/logo`

**Method** : `POST`

**Auth required** : YES

## Request Format

Puth the file in a form, with "logo" as key.

## Success Response

**Code** : `200 OK`


# Delete the logo of a company

**URL** : `https://api.fidelight.fr/v1/company/logo`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`


# Add / Edit the background picture of a company

**URL** : `https://api.fidelight.fr/v1/company/background`

**Method** : `POST`

**Auth required** : YES

## Request Format

Puth the file in a form, with "background_picture" as key.

## Success Response

**Code** : `200 OK`


# Delete the background picture of a company

**URL** : `https://api.fidelight.fr/v1/company/background`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`


# Get the profile of a company

**URL** : `https://api.fidelight.fr/v1/company/profile/$company.id`

**Method** : `GET`

**Auth required** : YES, as a user or as a company.

**Details** : to get the private profile of a company, put "me" as the company id in the URL (adds the email).

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "name": "Coffee Shop Petunia",
  "description": "Perfect Coffee is your coffee shop since 1989 ...",
  "phone": "0605040302",
  "company_type": 5,
  "country": "France",
  "city": "Paris",
  "street_name": "Rue du Paprika",
  "street_number": 357,
  "logo": "/company/cofee_shop_petunia_16515.jpg",
  "background_picture": "/company/cofee_shop_petunia_16514.jpg"
}
```


# Edit the profile of a company

**URL** : `https://api.fidelight.fr/v1/company/profile`

**Method** : `PUT`

**Auth required** : YES

## Request Format

**Content example**

```json
{
  "email": "jeff.dos-santos@gmail.com",
  "description": "Perfect Coffee is your coffee shop since 1989 ...",
  "phone": "0605040302",
  "company_type": 5,
  "country": "France",
  "city": "Lyon",
  "street_name": "Rue du Chameau",
  "street_number": 15
}
```

## Success Response

**Code** : `200 OK`


# Add or edit the opening time of one or multiple days of a company

**URL** : `https://api.fidelight.fr/v1/company/schedule/`

**Method** : `POST`

**Auth required** : YES

**Details** : if "close_am" (and "close_pm") equals to null, then the company is open for a whole day. "day" values from 1 to 7.

## Request Format

**Content example**

```json
{
  "schedule":[
    {
      "day": 1,
      "open_am": "08:00:00",
      "close_am": "12:00:00",
      "open_pm": "14:30:00",
      "close_pm": "20:00:00"
    },
    {
      "day": 3,
      "open_am": "09:00:00",
      "close_am": null,
      "open_pm": null,
      "close_pm": "18:00:00"
    }
  ]
}
```

## Success Response

**Code** : `200 OK`


# Remove the opening time of one day of a company

**URL** : `https://api.fidelight.fr/v1/company/schedule/$day`

**Method** : `DELETE`

**Auth required** : YES

**Details** : "day" values from 1 to 7.

## Success Response

**Code** : `200 OK`


# Get earning policy types

**URL** : `https://api.fidelight.fr/v1/points/type`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
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
  "type": 1,
  "value": 15
}
```


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


# Give points to a user

**URL** : `https://api.fidelight.fr/v1/company/points/use/`

**Method** : `POST`

**Auth required** : YES

## Request Format

**Content example**

```json
{
  "user": "aLFO1AlBdL.2", //Scanned from User's QR code
  "points": 100
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "transaction": 56464
}
```


# Delete a transaction

**URL** : `https://api.fidelight.fr/v1/transaction/$transaction.id`

**Method** : `DELETE`

**Auth required** : YES, as a company

**Details** : It is impossible to delete a transaction that was done more than 10 minutes ago.

## Success Response

**Code** : `200 OK`


# Get discount types

**URL** : `https://api.fidelight.fr/v1/discount/type/`

**Method** : `GET`

**Auth required** : YES, as a user or a company.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
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
  "discount_type": 2,
  "nb_max": null,
  "cost": 200,
  "name": "-4€ on the kebabs",
  "description": "Pay your kebab 3 euros instead of 7 in your Perfect Coffee shop !",
  "product": "Kebab",
  "start_date": null,
  "expiration_date": null,
  "per_day": {
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


# Edit an offer or a discount

**URL** : `https://api.fidelight.fr/v1/discount/$discount.id`

**Method** : `PUT`

**Auth required** : YES

## Request format

**Content example**

```json
{
  "discount_type": 3,
  "nb_max": null,
  "cost": 250,
  "name": "-4€ on the tacos",
  "description": "Pay your tacos 3 euros instead of 7 in your Perfect Coffee shop !",
  "product": "Tacos",
  "start_date": null,
  "expiration_date": null,
  "per_day": {
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


# Delete an offer or a discount

**URL** : `https://api.fidelight.fr/v1/discount/$discount.id`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`


# List all offers or discounts of a company

**URL** : `https://api.fidelight.fr/v1/discount/company/$company.id`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "discounts": [
    {
      "id": 5896,
      "discount_type": 3,
      "cost": 250,
      "name": "-4€ on the tacos",
      "per_day": ["monday", "tuesday", "thursday"],
      "value": 5.1
    },
    {
      "id": 8955,
      "discount_type": 2,
      "cost": 50,
      "name": "-50% on the tea",
      "value": 25
    }
  ]
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
  "id": 5896,
  "company": 9,
  "discount_type": 3,
  "name": "-4€ on the tacos",
  "description": "Pay your kebab 3 euros instead of 7 in your Perfect Coffee shop !",
  "product": "Kebab",
  "cost": 250,
  "nb_max": null,
  "start_date": null,
  "expiration_date": null,
  "per_day": {
    "monday": 1,
    "tuesday": 1,
    "wednesday": 0,
    "thursday": 1,
    "friday": 0,
    "saturday": 1,
    "sunday": 1
  },
  "value": 3
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
  "transaction": 56464
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
  "topDiscounts": [
    {
      "discount": 9,
    },
    {
      "discount": 12,
    },
  ]
}
```


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
  "res": [
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
  ]
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