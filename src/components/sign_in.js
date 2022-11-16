import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { auth } from "../components/firebase.js"
import { show_message } from '../components/show_messages.js'

const signin_form = document.querySelector('#sign_in_form');

signin_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const sign_mail = signin_form['signin_mail'].value
    const sign_pass = signin_form['signin_password'].value

    console.log(sign_mail, sign_pass);

    // Sign Up
    try{
        const user_credential = await signInWithEmailAndPassword(auth, sign_mail, sign_pass)
        console.log(user_credential);


        // Cerrar Modal
/*         const signup_modal = document.querySelector('#signup_modal');
        const modal = bootstrap.Modal.getInstance(signup_modal)
        modal.hide() */
        $('#signin_modal, .modal-backdrop.show').fadeOut();

        show_message('Bienvenido' + user_credential.user.email, 'Success')
        location.assign('user.html')
    }catch(error){
        console.log(error)
        console.log(error.code)

        if (error.code === 'auth/wrong-password'){
            show_message('La contraseña es incorrecta', 'error')
        }else if (error.code === 'auth/user-not-found'){
            show_message('No se ha encontrado el usuario', 'error')
        }else if (error.code){
            show_message('Algo falla, pero no te preocupes, no es tú culpa, es nuestra', 'error') 
        }
    }
    
})