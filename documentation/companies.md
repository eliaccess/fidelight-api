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


# Get the opening time (schedule) of one or multiple days of a company

**URL** : `https://api.fidelight.fr/v1/company/schedule/$companyId`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

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


# Error Response

Code | Solution
--- | ---
`500 Internal server error` | Something happened on the server side. Try again later.
`400 Bad request` | Verify the format of the query.
`401 Unauthorized` | Provide an access token or refresh it using the refreshing route and the refrresh token.
`403 Forbidden` | The access token does not allow you to do this action
`409 Conflict` | The email is already registered. Try with another one.
`410 Gone` | Verify the logs, usually happens when db query fails.
