document.addEventListener("DOMContentLoaded", function(){
    const btn = document.querySelector("form");
    btn.addEventListener('submit', async(e) =>{
        e.preventDefault();
        let auData = {
            name: document.getElementById("name").value,
            password: document.getElementById("password").value,
            email: document.getElementById("email").value
        };
        try{
            const response = await fetch("http://localhost:5009/authorize", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: auData.name, password: auData.password, email: auData.email})
            });
            if(!response.ok){
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error ${response.status}`);
            }
        } catch (error){
            console.error("Error: ", error);
            alert(error.message);
        }
        finally { 
            window.close();
        }
    });
});
