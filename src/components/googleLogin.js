import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js"
import { auth } from '../components/firebase.js'
import { show_message } from "../components/show_messages.js"

const googleButton = document.querySelector('#googleLogin')

googleButton.addEventListener('click', async() => {
    const provider = new GoogleAuthProvider()

    try {
        const credentials = await signInWithPopup(auth, provider)
        console.log(credentials)

        $('#signin_modal, .modal-backdrop.show').fadeOut();
        show_message('Welcome ' + credentials.user.displayName, 'success')
    }catch(error){
        console.log(error)
    }
})