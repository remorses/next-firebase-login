// import { GoogleButton } from 'firebase-react-components'
// import firebase from 'firebase/app'
// import Router from 'next/router'
// import { default as React } from 'react'
// import { render } from 'react-dom'

// const firebaseConfig = {}

// const App = () => {
//     if (!firebase.apps.length) {
//         firebase.initializeApp(firebaseConfig)
//         firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
//     }

//     return (
//         <GoogleButton
//             config={firebaseConfig}
//             text='Start With Google'
//             onLogin={async (user) => {
//                 const idToken = await user.getIdToken()
//                 const response = await fetch('/api/login', {
//                     method: 'POST',
//                     credentials: 'include',
//                     body: idToken,
//                 })
//                 if (!response.ok) {
//                     alert(response.statusText)
//                     return
//                 }
//                 console.log(JSON.stringify(user, null, 4))
//                 Router.push('/')
//             }}
//         />
//     )
// }

// export default App

// render(<App />, document.getElementById('root'))

// // @ts-ignore
// if (module.hot) {
//     // @ts-ignore
//     module.hot.accept()
// }
