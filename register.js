document.addEventListener("DOMContentLoaded", function(){
    const btn = document.querySelector("form");
    btn.addEventListener('submit', async(e) =>{
        e.preventDefault();
        let regData = {
            name: document.getElementById("name-reg").value,
            phone: document.getElementById("phone-reg").value,
            email: document.getElementById("email-reg").value,
            password: document.getElementById("password-reg").value
        };
        try{
            const response = await fetch("http://localhost:5009/register", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({Username: regData.name, Email: regData.email, Phone: regData.phone, Password: regData.password})
            });
            if(!response.ok){
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error ${response.status}`);
            }
            alert(regData.name);
            window.location.href = `TestSite.html?data=${encodeURIComponent(regData.name)}`;
        } catch (error){
            console.error("Error: ", error);
            alert(error.message);
        }
        finally { 
            window.close();
        }
    });
});
