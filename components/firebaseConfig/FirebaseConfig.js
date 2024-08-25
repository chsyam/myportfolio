import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfigFirestore = {
    apiKey: "AIzaSyAvxrScty6lzwbsmd-qfmBE9y3ery_Spr0",
    authDomain: "educationforjobs-storage.firebaseapp.com",
    projectId: "educationforjobs-storage",
    storageBucket: "educationforjobs-storage.appspot.com",
    messagingSenderId: "1040110668208",
    appId: "1:1040110668208:web:95fdbdf0a22bcbbe7bee75",
    measurementId: "G-MG8Y4FZ235"
};

const firebaseConfigRealtimeDB = {
    apiKey: "AIzaSyD-1DwG0sJV8IHP5TRDmC6THSUYN1vQ9Rg",
    authDomain: "db-educationforjobs.firebaseapp.com",
    databaseURL: "https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "db-educationforjobs",
    storageBucket: "db-educationforjobs.appspot.com",
    messagingSenderId: "224997803899",
    appId: "1:224997803899:web:bd7db4e195096080e75fde",
    measurementId: "G-4ZS71LMRBS"
};
const appFirestore = initializeApp(firebaseConfigFirestore, 'firestoreApp');
const storage = getStorage(appFirestore);

const appRealtimeDB = initializeApp(firebaseConfigRealtimeDB, 'realtimeDBApp');
const realtimeDB = getDatabase(appRealtimeDB);

export { realtimeDB, storage };