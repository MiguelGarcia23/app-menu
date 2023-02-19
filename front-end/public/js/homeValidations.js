window.onload = function() {
    let home = document.querySelector('#form-home');
    let inputName = document.getElementById('name');
    let inputTable = document.getElementById('table');

    let errors = [];

    home.addEventListener('submit', (e) => {


        // Validamos si el campo de NOMBRE no esta vacio
        if(inputName.value == '') {
            errors.push('El campo email está vacío')
            inputName.classList.add('is-invalid')
        } else if (inputName.value.length <= 2) {
            errors.push("Debes ingresar un nombre válido");
            email.classList.add("is-invalid");
        } else {
            errors.pop()
            inputName.classList.remove('is-invalid')
            inputTable.focus();
        }
        
        // Validamos si el campo de MESA no esta vacio
        if(inputTable.value == '') {
            errors.push('El campo email está vacío')
            inputTable.classList.add('is-invalid')
        } else if (inputTable.value.length <= 1) {
            errors.push("Debes ingresar un numero de mesa");
            email.classList.add("is-invalid");
        } else {
            errors.pop()
            inputTable.classList.remove('is-invalid')
        }


        /* Controlamos si hay errores */
        /* if (errors.length > 0) {
            e.preventDefault();
            let ulErrors = document.querySelector('.errors-frontEnd');
            ulErrors.classList.add('alert-warning');
            ulErrors.innerHTML = '';

            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += '<li>' + errors[i] + '</li>'   
            }
        } else {
            formulario.submit();
        } */
    })
}