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
  "msg":"Registered Successfully",
  "data":{
    "id": 2,
    "qr_key": "aLFO1AlBdL.2",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
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
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
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
  "oldPassword": "this_is_a_password_12",
  "newPassword": "this_is_a_password_13"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Password successfully changed!"
}
```


# Refresh the access token of a user

**URL** : `https://api.fidelight.fr/v1/user/token/`

**Method** : `POST`

**Auth required** : NO

## Request Format

**Content example**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  },
  "msg": "success"
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
  "status":200,
  "msg":"Login Successfully",
  "data":{
      "id": 2,
      "qrCode": "aLFO1AlBdL.2",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
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
  "data":{
    "surname": "Jeff",
    "name": "Dos Santos",
    "phone": "0605040302",
    "email": "jeff.dos-santos@gmail.com",
    "birthdate": 1995-05-21
  },
  "msg": "success"
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

**Content example**

```json
{
  "msg": "Profile successfully edited!"
}
```


# Get the balance of a user in a company

**URL** : `https://api.fidelight.fr/v1/user/balance/$company_id`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "balance": 650
  },
  "msg": "success"
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
  },
  "msg": "success"
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

**Content example**

```json
{
  "msg": "Company successfully added to likes!"
}
```


# Get all liked companies

**URL** : `https://api.fidelight.fr/v1/user/like/`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "companies":[
      {
        "company": 10
      },
      {
        "company": 117
      }
    ]
  },
  "msg": "success"
}
```


# Remove a company from likes

**URL** : `https://api.fidelight.fr/v1/user/like/$company.id`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Company successfully removed from likes!"
}
```


# Get company types

**URL** : `https://api.fidelight.fr/v1/company/type`

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
        "title": "Bakery",
        "description": "A place that sells some nice bread."
      },
      {
        "id": 2,
        "title": "Restaurant",
        "description": "A shop where food is cooked and sold to feast."
      }
    ]
  },
  "msg": "success"
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
  "companyType": 5,
  "country": "France",
  "city": "Paris",
  "streetName": "Rue du Paprika",
  "streetNumber": 357
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg":"Registered Successfully",
  "data":{
    "id": 7,
    "login": "coffeeshop12",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
```


# Unregister a company

**URL** : `https://api.fidelight.fr/v1/company/register`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Account successfully deleted!"
}
```


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
  "msg":"Login Successfully",
  "data":{
    "id": 7,
    "login": "coffeeshop12",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
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
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  },
  "msg": "success"
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
  "oldPassword": "this_is_a_password_12",
  "newPassword": "this_is_a_password_13"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Password successfully edited!"
}
```


# Add / Edit the logo of a company

**URL** : `https://api.fidelight.fr/v1/company/logo`

**Method** : `POST`

**Auth required** : YES

## Request Format

Puth the file in a form, with "logo" as key.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Logo successfully added!"
}
```


# Delete the logo of a company

**URL** : `https://api.fidelight.fr/v1/company/logo`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Logo successfully deleted!"
}
```


# Add / Edit the background picture of a company

**URL** : `https://api.fidelight.fr/v1/company/background`

**Method** : `POST`

**Auth required** : YES

## Request Format

Puth the file in a form, with "backgroundPicture" as key.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Background picture successfully added!"
}
```


# Delete the background picture of a company

**URL** : `https://api.fidelight.fr/v1/company/background`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Background picture successfully deleted!"
}
```


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
  "data":{
    "name": "Coffee Shop Petunia",
    "description": "Perfect Coffee is your coffee shop since 1989 ...",
    "phone": "0605040302",
    "companyType": 5,
    "country": "France",
    "city": "Paris",
    "streetName": "Rue du Paprika",
    "streetNumber": 357,
    "logo": "/company/cofee_shop_petunia_16515.jpg",
    "backgroundPicture": "/company/cofee_shop_petunia_16514.jpg"
  },
  "msg": "success"
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
  "companyType": 5,
  "country": "France",
  "city": "Lyon",
  "streetName": "Rue du Chameau",
  "streetNumber": 15
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Profile successfully edited!"
}
```


# Add or edit the opening time of one or multiple days of a company

**URL** : `https://api.fidelight.fr/v1/company/schedule/`

**Method** : `POST`

**Auth required** : YES

**Details** : if "closeAm" (and "closePm") equals to null, then the company is open for a whole day. "day" values from 1 to 7 (monday : 1, ..., sunday : 7).

## Request Format

**Content example**

```json
{
  "schedule":[
    {
      "day": 1,
      "openAm": "08:00:00",
      "closeAm": "12:00:00",
      "openPm": "14:30:00",
      "closePm": "20:00:00"
    },
    {
      "day": 3,
      "openAm": "09:00:00",
      "closeAm": null,
      "openPm": null,
      "closePm": "18:00:00"
    }
  ]
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Schedule successfully edited!"
}
```


# Remove the opening time of one day of a company

**URL** : `https://api.fidelight.fr/v1/company/schedule/$day`

**Method** : `DELETE`

**Auth required** : YES

**Details** : "day" values from 1 to 7.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg": "Schedule successfully edited!"
}
```


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
    "value": 15
  },
  "msg": "success"
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
  "data":{
    "transaction": 56464
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
