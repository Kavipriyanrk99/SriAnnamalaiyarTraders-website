const initApp = async() => {
    const inboxSection = document.getElementById("inboxSection");

    const fetchEmail = async() => {
        try{
            const response = await fetch("/email", {
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
        const reversed = response;
        reversed.reverse();
        
        reversed.forEach(item => {
            const newArticle = document.createElement('article');
            newArticle.innerHTML =
             `<article class="w-full p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
                <h3 class="font-sourceSans font-bold text-xl text-left mx-auto">${item.email_subject}</h3>
                <p class="md:w-3/4 w-full text-left text-sm text-gray-500 mb-3 line-clamp-2">${item.email_message}</p>
                <div class="flex justify-between items-center">
                    <a href="mailto:${item.email_address}" class="font-sourceSans font-semibold text-left text-blue-700 text-sm"><i class="fa-solid fa-envelope mr-2"></i>${item.email_address}</a>
                    <a href="/admin/inbox/${item.id}" class="px-3 py-1 font-sourceSans font-semibold text-white bg-blue-700 rounded-2xl active:bg-blue-600">view <i class="fa-regular fa-eye text-sm"></i></a>
                </div>
            </article>`;

            inboxSection.appendChild(newArticle);
        });
    } catch(error){
        console.error("Error:", error);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
