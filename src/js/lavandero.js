import '../components/log_out_in_service.js';
import {
    onGetAppointments
} from '../components/firebase.js'

const appointmentForm = document.getElementById('appointment_form')
const appointmentsContainer = document.getElementById('cont_cards')

function showLogin() {
    setTimeout(function () {
        console.log('HOLA!')
    }, 1888);
}

showLogin();



window.addEventListener('DOMContentLoaded', async () => {
    /* const querySnapshot = await getAppointments() */
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
                                            <p><span>${appointment.hour_first}</span>:<span>${appointment.hour_second}</span></p>
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
            } else {

            }

        })

        appointmentsContainer.innerHTML = html

    })

})