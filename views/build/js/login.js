const initApp = () => {
    const loginForm = document.getElementById("login-form");
    const email_address = loginForm.querySelector("#email-address");
    const password = loginForm.querySelector("#password");
    const login_btn = loginForm.querySelector("#login-btn");

    const email_warnTxt = loginForm.querySelector("#email-warnTxt");
    const password_warnTxt = loginForm.querySelector("#password-warnTxt");
    const errTxt = loginForm.querySelector("#errTxt");

    // validation
    const hanldeEmail = () => {
        const email = email_address.value.trim();
        const pattern = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/;

        if(!email){
            email_warnTxt.textContent = "The field is required *";
        } else if(!pattern.test(email)){
            email_warnTxt.textContent = "Fill valid email *";
        } else{
            email_warnTxt.textContent = "";
        }
    }

    const handlePassword = () => {
        const pass = password.value.trim();

        if(pass){
            password_warnTxt.textContent = "";
        } else{
            password_warnTxt.textContent = "The field is required *";
        }
    }

    email_address.addEventListener('blur', hanldeEmail);
    password.addEventListener('blur', handlePassword);

    // form submission
    const handleSubmit = async(event) => {
        event.preventDefault();

        if(email_address.value.trim() && password.value.trim()){
            const data = {
                'email_address' : email_address.value.trim(),
                'password' : password.value.trim(),
            }

            try{
                const response = await fetch("/admin/auth", {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if(response.ok){
                    const data = await response.json();
                    console.log(data.message);
                    window.location.href += '/inbox';
                } else{
                    errTxt.classList.toggle("hidden");
                    setTimeout(() => {
                        errTxt.classList.toggle("hidden");
                    }, 5000);
                    throw new Error("Network response was not OK");
                }
            } catch(error){
                console.error("Error:", error);
            } finally{
                email_address.value = "";
                password.value = "";
            }

        } else{
            hanldeEmail();
            handlePassword();
        }
    }

    login_btn.addEventListener('click', handleSubmit);
}

document.addEventListener('DOMContentLoaded', initApp);
