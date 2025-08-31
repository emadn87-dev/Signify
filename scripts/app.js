const form = document.querySelector('#form');
const inputs = {
    uname: document.querySelector('#uname'),
    email: document.querySelector('#email'),
    pass: document.querySelector('#pass'),
    pass2: document.querySelector('#pass2'),
};

const validations = {
    uname: (value) => ({
        isValid: value !== '',
        message: 'Username cannot be empty',
    }),
    email: (value) => ({
        isValid: value.includes('@') && value.includes('.') && value.length > 5,
        message: value === '' ? 'Email cannot be empty' : 'Email is not valid',
    }),
    pass: (value) => ({
        isValid: value !== '',
        message: 'Password cannot be empty',
    }),
    pass2: (value, passValue) => ({
        isValid: value === passValue && value !== '',
        message:
            value === ''
                ? 'Password confirmation is required'
                : 'Passwords do not match',
    }),
};

const handleInput = (inputElement, isValid, message) => {
    const formControl = inputElement.parentElement;
    const small = formControl.querySelector('small');
    small.className = `small ${isValid ? 'success' : 'error'}`;
    small.innerText = isValid ? '' : message;
    return isValid;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const unameValue = inputs.uname.value.trim();
    const unameResult = validations.uname(unameValue);
    handleInput(inputs.uname, unameResult.isValid, unameResult.message);

    const emailValue = inputs.email.value.trim();
    const emailResult = validations.email(emailValue);
    handleInput(inputs.email, emailResult.isValid, emailResult.message);

    const passValue = inputs.pass.value.trim();
    const passResult = validations.pass(passValue);
    handleInput(inputs.pass, passResult.isValid, passResult.message);

    const pass2Value = inputs.pass2.value.trim();
    const pass2Result = validations.pass2(pass2Value, passValue);
    handleInput(inputs.pass2, pass2Result.isValid, pass2Result.message);
    const isFormValid =
        unameResult.isValid &&
        emailResult.isValid &&
        passResult.isValid &&
        pass2Result.isValid;

    if (isFormValid) {
        console.log('Form submitted successfully:', {
            username: unameValue,
            email: emailValue,
            password: passValue,
        });
    }
});
