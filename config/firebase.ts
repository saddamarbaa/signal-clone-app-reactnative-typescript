// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app'
import {
	updateProfile,
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'
const googleProvider = new GoogleAuthProvider()

import {
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
} from '@env'

const firebaseConfig = {
	apiKey: 'AIzaSyDmVpIn92XJcSdaZQLPwSpfDpYVx83DKLA',

	authDomain: 'signal-clone-app-reactnative.firebaseapp.com',

	projectId: 'signal-clone-app-reactnative',

	storageBucket: 'signal-clone-app-reactnative.appspot.com',

	messagingSenderId: '1068718271502',

	appId: '1:1068718271502:web:e70d419019f50c5ee0a05f',

	// apiKey: API_KEY,
	// authDomain: AUTH_DOMAIN,
	// projectId: PROJECT_ID,
	// storageBucket: STORAGE_BUCKET,
	// messagingSenderId: MESSAGING_SENDER_ID,
	// appId: APP_ID,
}

// Initialize Firebase
const app = getApps().length > 0 ? getApps() : initializeApp(firebaseConfig)

const auth = getAuth()
const db = getFirestore()

export {
	auth,
	db,
	GoogleAuthProvider,
	googleProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	updateProfile,
}
