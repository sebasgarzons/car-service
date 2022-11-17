import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { auth } from "../components/firebase.js"
import { show_message } from '../components/show_messages.js'
import { saveDataUser } from "../components/firebase.js";
import { get_data_user } from "../components/get_user_data.js";

const signup_form = document.querySelector('#sign_up_form');

let user_perf;

signup_form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let sign_id = '0';
    const sign_name = signup_form['username'].value;
    const sign_mail = signup_form['signup_mail'].value
    const sign_pass = signup_form['signup_password'].value
    const sign_pass_conf = signup_form['confpassword'].value;
    const sign_perf = signup_form['perfiles'].value;
    
    // Sign Up
    try{
        const user_credential = await createUserWithEmailAndPassword(auth, sign_mail, sign_pass)

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
        
        sign_id = user_id

        saveDataUser(sign_id, sign_name, sign_mail, sign_perf, sign_pass, sign_pass_conf)

        show_message('En un momento serás redirigido a la página principal.', 'Success')

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