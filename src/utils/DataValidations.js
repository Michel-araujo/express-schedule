export function emailValidation(email) {
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return !emailFormat.test(email)
}
export function passwordValidation(password) {
    return password.length < 8
}