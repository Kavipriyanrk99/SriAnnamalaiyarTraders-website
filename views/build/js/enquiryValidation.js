const enquiryValidation_initApp = () => {
    const enquiryForm = document.getElementById("enquiry-form");
    const full_name = enquiryForm.querySelector("#full-name");
    const phone_number = enquiryForm.querySelector("#phone-number");
    const company_name = enquiryForm.querySelector("#company-name");
    const email_subject = enquiryForm.querySelector("#subject");
    const email_address = enquiryForm.querySelector("#email");
    const email_message = enquiryForm.querySelector("#message");
    const newsletter_check = enquiryForm.querySelector("#newsletter-check");
    const submit_btn = enquiryForm.querySelector("#submit-btn");

    const name_warnTxt = enquiryForm.querySelector("#name-warnTxt");
    const number_warnTxt = enquiryForm.querySelector("#number-warnTxt");
    const companyName_warnTxt = enquiryForm.querySelector("#companyName-warnTxt");
    const subject_warnTxt = enquiryForm.querySelector("#subject-warnTxt");
    const email_warnTxt = enquiryForm.querySelector("#email-warnTxt");
    const message_warnTxt = enquiryForm.querySelector("#message-warnTxt");
    const successTxt = enquiryForm.querySelector("#successTxt");
    const errTxt = enquiryForm.querySelector("#errTxt");

    // validation
    const handleName = () => {
        const name = full_name.value.trim();

        if(name){
            name_warnTxt.textContent = "";
        } else{
            name_warnTxt.textContent = "The field is required *";
        }
    }

    const handleCompany = () => {
        const companyName = company_name.value.trim();

        if(companyName){
            companyName_warnTxt.textContent = "";
        } else{
            companyName_warnTxt.textContent = "The field is required *";
        }
    }

    const handleSubject = () => {
        const subject = email_subject.value.trim();

        if(subject){
            subject_warnTxt.textContent = "";
        } else{
            subject_warnTxt.textContent = "The field is required *";
        }
    }

    const handleMessage = () => {
        const message = email_message.value.trim();

        if(message){
            message_warnTxt.textContent = "";
        } else{
            message_warnTxt.textContent = "The field is required *";
        }
    }

    const handleNumber = () => {
        const number = phone_number.value.trim();
        const pattern = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;

        if(!number){
            number_warnTxt.textContent = "The field is required *";
        } else if(!pattern.test(number)){
            number_warnTxt.textContent = "Fill valid number with country code *"
        } else{
            number_warnTxt.textContent = "";
        } 
    }

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

    phone_number.addEventListener('blur', handleNumber);
    email_address.addEventListener('blur', hanldeEmail);
    full_name.addEventListener('blur', handleName);
    company_name.addEventListener('blur', handleCompany);
    email_subject.addEventListener('blur', handleSubject);
    email_message.addEventListener('blur', handleMessage);

    // form submission
    const handleSubmit = async(event) => {
        event.preventDefault();

        if(full_name.value.trim() && phone_number.value.trim() && company_name.value.trim() && email_subject.value.trim() && email_address.value.trim() && email_message.value.trim()){
            const data = {
                'full_name' : full_name.value.trim(),
                'phone_number' : phone_number.value.trim(),
                'company_name' : company_name.value.trim(),
                'email_subject' : email_subject.value.trim(),
                'email_address' : email_address.value.trim(),
                'email_message' : email_message.value.trim(),
                'newsletter_check' : newsletter_check.value
            }

            try{
                const response = await fetch("/email", {
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

                    successTxt.classList.toggle("hidden");
                    setTimeout(() => {
                        successTxt.classList.toggle("hidden");
                    }, 5000);
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
                full_name.value = "";
                phone_number.value = "";
                company_name.value = "";
                email_address.value = "";
                email_message.value = "";
                email_subject.value = "";
                newsletter_check.checked = false;
            }

        } else{
            handleName();
            handleNumber();
            handleCompany();
            handleSubject();
            hanldeEmail();
            handleMessage();
        }
    }

    submit_btn.addEventListener('click', handleSubmit);
}

document.addEventListener('DOMContentLoaded', enquiryValidation_initApp);
