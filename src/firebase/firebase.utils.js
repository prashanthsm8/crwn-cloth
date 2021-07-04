import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
        apiKey: "AIzaSyAPFtebkbvel4n1EygM__GSlPbv6V7vgfc",
        authDomain: "crown-db-fe730.firebaseapp.com",
        projectId: "crown-db-fe730",
        storageBucket: "crown-db-fe730.appspot.com",
        messagingSenderId: "1077493820284",
        appId: "1:1077493820284:web:a98b32c00a9d90c78012f9",
        measurementId: "G-EYSCR3ER8X"
}

firebase.initializeApp(config);

//give access to db and auth

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDoc = async (userAuth,additionaldata) =>{
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapshot = await userRef.get();
        if(!snapshot.exists)
        {
                const {displayName, email} = userAuth;
                const createdAt = new Date();
                try{
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...additionaldata
                        })
                }
                catch(e){
                        console.log('error', e.message);
                }
        }

        return userRef;
}

export default firebase;