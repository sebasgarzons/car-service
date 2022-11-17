import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { auth } from '../components/firebase.js'
import {logincheck} from '../components/logincheck.js';
import { get_data_user } from "../components/get_user_data.js"; 

import '../components/firebase.js';
import '../components/sign_up.js';
import '../components/sign_in.js';
import '../components/log_out.js';

onAuthStateChanged(auth, async (user) => {

    if (user) {
      const querySnapshot = await getDocs(collection(db, 'posts'))
    }else{
      logincheck(user)
    }
    logincheck(user)
    
})

$('#sign_up, .close_sign_up').click(function (){
  /* location.assign('register.html') */
  $('.cont_sign_up').fadeToggle();
})
