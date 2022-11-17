import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { auth } from "../components/firebase.js"
import { show_message } from '../components/show_messages.js'
import { get_data_user } from "../components/get_user_data.js";

const signin_form = document.querySelector('#sign_in_form');

/* response_value = JSON.parse(window.localStorage.getItem('authenticate'))??{}; */
let user_perf;

signin_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const sign_mail = signin_form['signin_mail'].value
    const sign_pass = signin_form['signin_password'].value

    // Sign Up
    try{
        const user_credential = await signInWithEmailAndPassword(auth, sign_mail, sign_pass)
        
        let email_user = user_credential.user.email

        window.localStorage.setItem('email_user', JSON.stringify(email_user));
        

        let user_id = user_credential.user.uid

        window.localStorage.setItem('user_uid_id', JSON.stringify(user_id));
        setTimeout(function (){
            get_data_user();
        }, 500)

        setTimeout(function (){
            user_perf = JSON.parse(window.localStorage.getItem('perf_user'));
        }, 2000)


        // Cerrar Modal
        show_message('En un momento serás redirigido a la página principal.', 'Success')

        $('#signin_modal, .modal-backdrop.show').fadeOut();

        setTimeout(function (){
            if (user_perf == 'Cliente'){
                location.assign('user.html')
            }else if(user_perf == 'Mecánico'){
                location.assign('mecanico.html')
            }else if(user_perf == 'Lavandero'){
                location.assign('lavandero.html')
            }
        }, 4000)

        show_message('Bienvenido' + user_credential.user.email, 'Success')

        
        /* location.assign('user.html') */
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