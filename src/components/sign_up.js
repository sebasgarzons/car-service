import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { auth } from "../components/firebase.js"
import { show_message } from '../components/show_messages.js'

const signup_form = document.querySelector('#sign_up_form');

signup_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const sign_mail = signup_form['signup_mail'].value
    const sign_pass = signup_form['signup_password'].value

    console.log(sign_mail, sign_pass);

    // Sign Up
    try{
        const user_credential = await createUserWithEmailAndPassword(auth, sign_mail, sign_pass)
        console.log(user_credential);


        // Cerrar Modal
/*         const signup_modal = document.querySelector('#signup_modal');
        const modal = bootstrap.Modal.getInstance(signup_modal)
        modal.hide() */
        $('#signup_modal, .modal-backdrop.show').fadeOut();

        show_message('Bienvenido' + user_credential.user.email, 'Success')
    }catch(error){
        console.log(error.message)
        console.log(error.code)

        if (error.code === 'auth/email-already-in-use'){
            show_message('El correo ya está en uso', 'error') 
        }else if (error.code === 'auth/invalid-email'){
            show_message('El correo no es válido', 'error') 
        }else if (error.code === 'auth/weak-password'){
            show_message('La contraseña es demasiado débil', 'error') 
        }else if (error.code){
            show_message('Algo falla, pero no te preocupes, no es tú culpa, es nuestra', 'error') 
        }
    }
    
})