const isValidEmail = (email) => {
    const pattern = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/;
    return email.trim() && pattern.test(email.trim());
}

const isValidPhoneNumber = (phoneNumber) => {
    const pattern = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
    return phoneNumber.trim() && pattern.test(phoneNumber.trim());
}

module.exports = { isValidEmail, isValidPhoneNumber};