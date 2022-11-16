import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { auth } from '../components/firebase.js'
import {logincheck} from '../components/logincheck.js';

import '../components/firebase.js';
import '../components/sign_up.js';
import '../components/sign_in.js';
import '../components/log_out.js';

/* import './googleLogin.js'; */

console.log('HOLA')

onAuthStateChanged(auth, async (user) => {

    if (user) {
      const querySnapshot = await getDocs(collection(db, 'posts'))
      console.log(querySnapshot)
    }else{
      logincheck(user)
    }
    logincheck(user)
})

try{
    console.log('Hola')
}catch(error){
    console.log(error)
}



