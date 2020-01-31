# nodejs-lib-template

`yarn add next-firebase-login next firebase-admin`

## Usage

Put this code inside the **`pages/api/login.js`** file

```tsx
import admin from 'firebase-admin'
import { firebaseLoginWithCookie } from 'next-firebase-login'

const FIREBASE_COOKIE_KEY = 'firebaseCookie'

// initialize firebase
if (!admin.apps.length) {
    const serviceAccount = require('../../serviceAccount.json')
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

// serve the cookie
export default firebaseLoginWithCookie({
    cookieName: FIREBASE_COOKIE_KEY,
    cookieExpiresInDays: 5,
})
```

Then send a POST request with the idToken as the body

```tsx
import { GoogleButton } from 'firebase-react-components'
import firebase from 'firebase/app'
import { default as React } from 'react'

const firebaseConfig = {} // your firebase conf

export default () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    }

    return (
        <GoogleButton
            config={firebaseConfig}
            text='Start With Google'
            onLogin={async (user) => {
                const idToken = await user.getIdToken()
                const response = await fetch('/api/login', {
                    method: 'POST',
                    credentials: 'include',
                    body: idToken,
                })
                if (!response.ok) {
                    alert(response.statusText)
                    return
                }
                console.log(JSON.stringify(user, null, 4))
                Router.push('/')
            }}
        />
    )
}
```

Then you can know on any page if a user is authenticated using `next-cookie` and get the user claim and uid using `jwt-decode`

```tsx
import nextCookies from 'next-cookies'
import decode from 'jwt-decode'
import React from 'react'

const Page = ({ loggedIn }) => {
    return <div>loggedIn = {loggedIn}</div>
}

const FIREBASE_COOKIE_KEY = 'firebaseCookie'

Page.getInitialProps = ({ ctx }) => {
    // nextCookies gets the cookies both in client and server
    const jwt = nextCookies(ctx)[FIREBASE_COOKIE_KEY]
    if (!jwt) {
        return { loggedIn: false, isAdmin: false }
    }
    // the cookie is basically a jwt containing some firebase information, like uid
    // you can also get the user claim from the cookie
    const { uid, isAdmin } = decode(jwt)
    return {
        loggedIn: !!jwt,
        isAdmin,
    }
}
```
