const emailInput = document.querySelector('#email-input');
const phoneInput = document.querySelector('#phone-input');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');

//regex
const EMAIL_REGEX = /([a-z])/;
const PHONE_REGEX = /^[0](412|414|416|426|424|212|)[0-9]{7}$/;
// validations
let emailValidation = false;
let phoneValidation = false;
// funtions
const validateInput = (input, regexValidation) => {
    const infoText = input.parentElement.children[1];
    formBtn.disabled = emailValidation && phoneValidation ? false : true;
    if (input.value === '') {
        input.classList.remove('correct');
        input.classList.remove('wrong');
        infoText.classList.remove('show');
    } else if (regexValidation) {
        input.classList.add('correct');
        input.classList.remove('wrong');
        infoText.classList.remove('show');
    } else {
        input.classList.remove('correct');
        input.classList.add('wrong');
        infoText.classList.add('show');
    }
}

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_REGEX.test(emailInput.value);
    validateInput(emailInput, emailValidation);

});
phoneInput.addEventListener('input', e => {
    phoneValidation = PHONE_REGEX.test(phoneInput.value);
    validateInput(phoneInput, phoneValidation);

});



form.addEventListener('submit', e => {
    e.preventDefault();
    // crear elemento de la lista
    const li = document.createElement('li');
    // creo contenido del li dependiendo de lo que escribio el usuario en los inputs
    li.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
  

  <input type="text" value="${emailInput.value}" readonly>

 
  <input type="text" class="input-edit" value="${phoneInput.value}" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="11"  readonly>
            
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

            `;
    
    
    
            // agrego el elemento a la lista
    list.append(li);
    // limpio los inputs
    emailInput.value = '';
    phoneInput.value = '';
    validateInput(emailInput);
    validateInput(phoneInput);
    emailValidation = false;
    phoneValidation = false;
    // guardar en localStorage (navegador)
    localStorage.setItem('listaContactos', list.innerHTML)
});

list.addEventListener('click', e => {
    if (e.target.closest('.delete-icon')) {
        e.target.closest('.delete-icon'). parentElement.remove();
    localStorage.setItem('listaContactos', list.innerHTML);
    }


if (e.target.closest('.edit-icon')){
    //1. seleciono el icono de editar
    const editIcon = e.target.closest('.edit-icon');
    //2. seleciono el input 
    const editInput = editIcon.parentElement.children[2];

    //3. defino mi condicional usando una clase llamada editando para saber el estado del boton
    if (editIcon.classList.contains('editando')){
    //cuando edita
    //remuevo la clase de editando para indicar que estoy guardando los cambios
    editIcon.classList.remove('editando')
    //guardo el nuevo valor del input
    editInput.setAttribute('value', editInput.value);
    editInput.setAttribute('readonly', 'true');
    const end = editInput.value.length;
    editInput.setSelectionRange(end,end);
    editInput.focus();
  
    //coloco el icono de editar
    editIcon.innerHTML = ` <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    
    `;
  //guardo en el local storages
  localStorage.setItem('listaContactos', list.innerHTML);
}else{
    //nueva clase editando para indicar el estado de boton
    editIcon.classList.add('editando');
    //remuevo el atributo readonly para poder escribir en el input
    editInput.removeAttribute('readonly');
    //cambio el icono a un lapiz para indicarle al usuario que esta editando
    editIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
  `;

};

}
});
(()=>{ 
   const locallist = localStorage.getItem('listaContactos', list.innerHTML)
   list.innerHTML = locallist;
})();



