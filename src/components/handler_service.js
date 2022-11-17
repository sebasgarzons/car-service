function accept_appointment(){
    $('.cont_succesful_appointment').fadeToggle();

    setTimeout(function (){
        $('.cont_succesful_appointment').fadeOut();
    }, 4000)
}

