const initApp = async() => {
    const viewSection = document.getElementById("viewSection");
    const from_email_address = document.getElementById("from-email-address");
    const email_subject = document.getElementById("email-subject");
    const email_message = document.getElementById("email-message");
    const full_name = document.getElementById("full-name");
    const email_address = document.getElementById("email-address");
    const company_name = document.getElementById("company-name");
    const phone_number = document.getElementById("phone-number");

    const fetchEmail = async() => {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        try{
            const response = await fetch(`/email/${id}`, {
                method: "GET",
                credentials: "same-origin",
            });

            if(response.ok){
                const data = await response.json();
                return data;
            } else{
                throw new Error("Network response was not OK");
            }
        } catch(error){
            console.error("Error:", error);
        }
    }
 
    try{
        const response = await fetchEmail();

        if(response){
            const item = response[0];
            from_email_address.textContent = item.email_address;
            email_subject.textContent = item.email_subject;
            email_message.textContent = item.email_message;
            full_name.textContent = item.full_name;
            company_name.textContent = item.company_name;
            email_address.innerHTML = `<a href="mailto:${item.email_address}">${item.email_address}</a>`
            phone_number.innerHTML = `<a href="tel:${item.phone_number}">${item.phone_number}</a>`

            viewSection.classList.toggle('hidden');
            viewSection.classList.toggle('flex');
        }

    } catch(error){
        console.error("Error:", error);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
