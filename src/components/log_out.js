import { signOut } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
import { auth } from '../components/firebase.js'
import { show_message } from "../components/show_messages.js"

const logout = document.querySelector('#log_out')
console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

function log_out(){
    logout.addEventListener('click', async () => {
        await signOut(auth)
        show_message('Has cerrado sesión éxitosamente')
        console.log('Has cerrado sesión')
        location.assign('index.html')
    })
}

log_out()
