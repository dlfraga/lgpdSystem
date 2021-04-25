document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        checkPasswords();
    }
};

function checkPasswords(){

    var password = document.getElementById("password")
        , confirm_password = document.getElementById("confirm_password");

    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("As senhas não são iguais");
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;

}