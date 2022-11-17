import '../components/log_out_in_service.js';
import {
    onGetAppointments
} from '../components/firebase.js'

const appointmentForm = document.getElementById('appointment_form')
const appointmentsContainer = document.getElementById('cont_cards')

window.addEventListener('DOMContentLoaded', async () => {

    let email_data = JSON.parse(window.localStorage.getItem('email_user'));
    document.getElementById('user_name_email').innerText = email_data

    onGetAppointments((querySnapshot) => {
        let html = ''

        querySnapshot.forEach(doc => {
            // Almacenar el objeto que tiene los datos de la DB y pasarlo a JS
            let price = '8000'
            const appointment = doc.data()
            if (appointment.type_of_service == 'lavandero') {
                html += `
                        <div class="card_service_user">
                        <div class="box_card">
                            <div>
                                <h2>Tipo de Servicio: <span>${appointment.type_of_service}</span></h2>
                                <h3>Precio: $<span>${price}</span></h3>
                            </div>
                            <div>
                                <div>
                                    <p><span>${appointment.appoint_hour}</span></p>
                                    <i class="fa-solid fa-clock"></i>
                                </div>
                                <h3>Dirección <span>${appointment.dir}</span></h3>
                            </div>
                        </div>
                        <details class="details" title="Click para ver detalles">
                            <summary>Ver Detalles de Cita</summary>
                            <div>
                                Descripción/Comentarios:
                                <p>${appointment.description}</p>
                            </div>
                        </details>
                        <button class="accept_appointment" onclick="accept_appointment()">Aceptar</button>
                    </div>   
                        `

                appointmentsContainer.innerHTML = html
            }
        })
    })
})
