import React, { createContext, useState } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { useEffect } from 'react';
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log('user observing', currentUser)
            setUser(currentUser)
            setLoading(false)
        });
        return () => unsubscribe();
    }, [])


    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         //get and set jwt token in local storage

    //         if (currentUser) {
    //             axios.post('http://localhost:5000/jwt', { email: currentUser.email })
    //                 .then(data => {
    //                     // console.log(data.data.token)
    //                     localStorage.setItem('access-token', data.data.token);
    //                     setLoading(false)
    //                 })
    //         }
    //         else {
    //             localStorage.removeItem('access-token')
    //         }

    //     });
    //     return () => {
    //         return unsubscribe()
    //     }
    // }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        updateUserProfile,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;