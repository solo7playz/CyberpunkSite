let User = {
    Name: "Unknown",
    Email: "Unknown",
    Phone: "Unknown"
}

const div = document.getElementById("changeDiv");
let blockHistory = `<div class="container-history"><h1>История</h1><div id="div-history"><p></p></div></div>`;
let blockProfile = '<div class="container-profile"><form> <label for="name" style="text-align: left;">Имя (Никнейм)</label><input type="text" id="name" placeholder="Введите имя"><label for="mail" style="text-align: left;">Почта</label><input type="email" id="mail" placeholder="Введите почту"><label for="password">Пароль</label><input type="password" id="password" placeholder="Введите пароль"><button type="submit" class="btn-profileRedact" style="background-color: greenyellow; width: 70%; font-size: 20px; margin-top: 20px; min-height: 40px;">Сохранить изменения</button></form></div>';
let profile = "";


document.addEventListener("DOMContentLoaded", function(){
    const btn = document.querySelector(".btn-profile");
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        div.innerHTML = blockProfile;
    });
});

document.addEventListener("DOMContentLoaded", function(){
    const btn = document.querySelector(".btn-history");
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        div.innerHTML = blockHistory;
    });
});

document.addEventListener("DOMContentLoaded", function(){
    const btn = document.querySelector(".btn-authorize");
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('file:///C:/Users/user/source/repos/HTML_HW1/Authorization.html', '_blank')
    });
});

document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('load', async () => {
        try{
            const responseName = await fetch("http://localhost:5009/loadName", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify("")
            });

            const responseHistory = await fetch("http://localhost:5009/loadHistory", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify("")
            });

            const responsePhoto = await fetch("http://localhost:5009/loadPhoto", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify("")
            });

            if(!responseName.ok){
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error ${response.status}`);
            }
            const resultName = await responseName.json();
            User.Name = resultName.message;

            const resultHistory = await responseHistory.json();
            document.getElementById("profile-text").innerHTML = User.Name;

            const resultPhoto = await responsePhoto.json();
            profile = `<img src="${resultPhoto.message}" alt="pictures/icon.png"></img>`;
            document.getElementById("img-profile").innerHTML = profile;
            
            blockHistory = `<div class="container-history"><h1>История</h1><p>${resultHistory.message}</p></div>`;
            if(div.innerHTML != blockProfile) div.innerHTML = blockHistory;
        } catch (error){
            console.error("Error: ", error);
            alert(error.message);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(){
    const btn = document.querySelector(".btn-photoProfile");
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const [handleу] = await window.showOpenFilePicker({startIn: "pictures", multiple: false, types: [{ accept: { "image/*": [".png", ".jpg", ".jpeg"]}}]});
        const file = await handleу.getFile();
        console.log('Имя файла:', file.fullName);
        profile = `<img src="${await file.fullName}" alt="pictures/icon.png"></img>`;
        alert(file.fullName);
        document.getElementById("img-profile").innerHTML = profile;
        try{
            const responsePhoto = await fetch("http://localhost:5009/savePhoto", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(file.fullName)
            });
            if(!responsePhoto.ok){
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error ${response.status}`);
            }
        }catch(error){
            console.error("Error: ", error);
            alert(error.message);
        }
    })
})