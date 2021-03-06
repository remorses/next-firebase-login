import { NextApiRequest, NextApiResponse } from 'next/types'
import admin from 'firebase-admin'
import { serialize } from 'cookie'

export function firebaseLoginWithCookie({
    cookieExpiresInDays = 5,
    cookieName,
    verbose = false,
}) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const idToken = await req.body
        if (!idToken) {
            console.log('received request without idToken')
            res.status(401).send('unauthorized')
            return
        }
        const expiresIn = 60 * 60 * 24 * cookieExpiresInDays * 1000
        await admin
            .auth()
            .createSessionCookie(idToken, { expiresIn })
            .then(
                (sessionCookie) => {
                    // Set cookie policy for session cookie.
                    res.setHeader(
                        'Set-Cookie',
                        serialize(cookieName, sessionCookie, {
                            maxAge: expiresIn,
                            path: '/',
                            // httpOnly: true,
                            // secure: true
                        }),
                    )
                    if (verbose) {
                        console.log('generated cookie for idToken', idToken)
                    }
                    res.send(sessionCookie)
                },
                (error) => {
                    if (verbose) {
                        console.log('cannot create session cookie ' + error)
                    }
                    res.status(500).send(error.message)
                },
            )
    }
}
