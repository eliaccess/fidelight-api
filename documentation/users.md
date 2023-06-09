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
  "msg":"Email sent to jeff.dos-santos@gmail.com. Please confirm your account.",
  "data":{
    "id": 2,
    "qrCode": "aLFO1AlBdL.2",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
```


# Unregister a user

**URL** : `https://api.fidelight.fr/v1/user/register`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`


# Register / login a user using Google or Facebook account

**URL** : `https://api.fidelight.fr/v1/user/social/`

**Method** : `POST`

**Auth required** : NO

## Request Format

**Content example**

```json
{
  "userId": "02564086521321",
  "name": "Dos Santos",
  "email": "jeff.dos-santos@gmail.com",
  "provider": "google"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg":"Email sent to jeff.dos-santos@gmail.com. Please confirm your account.",
  "data":{
    "id": 2,
    "qrCode": "aLFO1AlBdL.2",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gR9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
```

# Link a user social account (using Google or Facebook) to an existing Fidelight account

**URL** : `https://api.fidelight.fr/v1/user/connect/social/`

**Method** : `POST`

**Auth required** : YES

## Request Format

**Content example**

```json
{
  "userId": "02564086521321",
  "name": "Dos Santos",
  "email": "jeff.dos-santos@gmail.com",
  "provider": "google"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg":"Account successfully linked."
}
```

# Unlink a user social account (using Google or Facebook) from an existing Fidelight account

**URL** : `https://api.fidelight.fr/v1/user/connect/social/`

**Method** : `DELETE`

**Auth required** : YES

## Request Format

**Content example**

```json
{
  "provider": "google"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "msg":"Account successfully unlinked."
}
```

# Change / set the password of a user

**URL** : `https://api.fidelight.fr/v1/user/password/`

**Method** : `PUT`

**Auth required** : YES

## Request Format

Please set the `oldPassword` to `null` if it is a set up.

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
    "birthdate": 1995-05-21,
    "google": true,
    "facebook": false
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
        "id": 10,
        "name": "The Kebabos",
        "description":"The best Kebab of the year",
        "logoUrl" : "https://storage.google.com/company/logo/the_kebabos_a66azsds6.png",
        "isFavorite": true
      },
      {
        "id": 85,
        "name": "Tea Time",
        "description":"Since 1981",
        "logoUrl" : "https://storage.google.com/company/logo/tea_time_f65sqa.png",
        "isFavorite": true
      }
    ]
  },
  "msg": "success"
}
```


# Remove a company from likes

**URL** : `https://api.fidelight.fr/v1/user/like/`

**Method** : `DELETE`

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
  "msg": "Company successfully removed from likes!"
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
