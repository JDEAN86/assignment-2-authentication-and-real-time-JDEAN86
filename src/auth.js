import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {auth, db} from "./config";
import { doc, getDocs, setDoc, collection, getFirestore } from "firebase/firestore";


onAuthStateChanged(auth, async (user)=>{
    if (user){
        console.log("Logged In User:", user.email)
        await fetchUserData(user.uid)
    } else{
        console.log("No User is signed in")
    }
})

async function fetchUserData(userID){
    try{
        const UserDoc = await getDocs(collection(db, "users"))
        const userData = UserDoc.docs.find(doc => doc.id===userID)?.data()
        console.log("User data:", userData)
        document.getElementById("greeting").innerHTML = "<h1> Hi, "+userData.firstname +"</h1>"
    }catch(error){
        console.error("Error getting user data", error)
    }
}

export async function signUp(firstName, lastName, email, password){
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log("User signed up:", userCredential.user.email)
        console.log("User ID:", userCredential.user.uid)
        const userRef = doc(db, "users", userCredential.user.uid)

        await setDoc(userRef,{
            firstname:firstName,
            lastname:lastName,
            timestamp: new Date()
        })
    }catch(error){
        console.error("Error fetching User data",error)
    }
}

    export async function login(email, password){
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "songmanager.html"
        }catch(error){
            console.error("Login Error",error.message)
        }
}

export async function logout(){
    try{
        await signOut(auth)
        console.log("User Logged Out")
    }catch(error){
        console.error("Logout Error",error.message)
    }
}
