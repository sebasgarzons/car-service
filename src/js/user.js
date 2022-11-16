import '../components/log_out.js';
import { saveAppointment , getAppointments, onGetAppointments, deleteAppointment, getAppointment, updateAppointment } from '../components/firebase.js'

const appointmentForm = document.getElementById('appointment_form')
const appointmentsContainer = document.getElementById('cont_cards')

let editStatus = false
let id = ''

function showLogin(){
    setTimeout(function(){
        console.log('HOLA!')
    }, 1888);
}

showLogin();

window.addEventListener('DOMContentLoaded', async() => {
    /* const querySnapshot = await getAppointments() */
    onGetAppointments((querySnapshot) => {
        let html = ''
    
        querySnapshot.forEach(doc => {
            // Almacenar el objeto que tiene los datos de la DB y pasarlo a JS
            let price = ''

            const appointment = doc.data()
            if (appointment.type_of_service == 'mecanico'){
                price = 10000
            }else if (appointment.type_of_service == 'lavandero'){
                price = 8000
            }
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
            <button class="btn-cards btn-delete" data-id="${doc.id}"><i class="fa-solid fa-ban"></i></button>
            <button class="btn-cards btn-edit" data-id="${doc.id}"><i class="fa-regular fa-pen-to-square"></i></button>
        </div>   
            `
        })
    
        appointmentsContainer.innerHTML = html

      const btnsDelete = appointmentsContainer.querySelectorAll('.btn-delete')
        console.log(btnsDelete)

          btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset }}) => {
                deleteAppointment(dataset.id)
            })
        })

        const btnsEdit = appointmentsContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getAppointment(e.target.dataset.id)
                
                const Appointment = doc.data()
                console.log(Appointment)

                $(".makeappointment_container").toggleClass('makeappointment_container_show');
                appointmentForm['appoint_tp_srvc'].value = Appointment.type_of_service
                appointmentForm['appoint_hr'].value = Appointment.appoint_hour
                appointmentForm['appoint_dir'].value = Appointment.dir
                appointmentForm['appoint-desc'].value = Appointment.description

                editStatus = true
                id = e.target.dataset.id

                appointmentForm['btn-appointment-save'].innerText = 'Actualizar'
            })
        })
    })

})


appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const tp_srvc = appointmentForm['appoint_tp_srvc']
    const hr = appointmentForm['appoint_hr']
    const dir = appointmentForm['appoint_dir']
    const description = appointmentForm['appoint-desc']

    /* console.log(tp_srvc.value, hr_frst.value, hr_scnd.value, dir.value, description.value) */
    /* saveAppointment(tp_srvc.value, hr_frst.value, hr_scnd.value, dir.value, description.value) */



    if (!editStatus){
        saveAppointment(tp_srvc.value, hr.value, dir.value, description.value)
        appointmentForm.reset() 
    }else{
        console.log('Updating!')
        updateAppointment(id, {
            type_of_service: tp_srvc.value, 
            appoint_hour: hr.value,
            dir: dir.value,
            description: description.value
        })
        appointmentForm.reset() 
        appointmentForm['btn-appointment-save'].innerText = 'Guardar'
        editStatus = false;
    }
    $(".makeappointment_container").toggleClass('makeappointment_container_show');
})

$(".agndr_ct, .close_appointment").click(function () {
    $(".makeappointment_container").toggleClass('makeappointment_container_show');
});