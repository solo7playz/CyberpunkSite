document.addEventListener("DOMContentLoaded", function(){
    const btn = document.querySelector(".btn-main");
    if(btn)
        btn.addEventListener('click', function(){
            alert("click");
        });
    else alert("undefined");
});

document.addEventListener("DOMContentLoaded", function(){
    const btn = document.querySelector(".btn-nav");
    btn.onCLick = function(){document.querySelector(".header").style.backgroundColor = this.getAttributeNS;};
    if(btn)
    {
        btn.addEventListener('click', function(){ document.querySelector("header").style.backgroundColor = '#b318be'; });
        
    }
    else alert("jopa");
});

const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if(pageYOffset >= sectionTop - sectionHeight / 3){
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === '#' + current && link.getAttribute('href') !== '#apply'){
            if(link.classList)
                link.style.color = '#fff';
            link.classList.add('active');
        }
        else if(link.getAttribute('href') === '#apply') link.style.color = '#000';
        else link.style.color = '#ffff00';

        if(window.scrollY < 300) btnToHome.style.display = 'none'; 
        else btnToHome.style.display = 'block'; 
    });
});

document.addEventListener("DOMContentLoaded", function(){
    btnToHome.addEventListener('click', function(){window.scrollTo({top: 0})})
});

const btnToHome = document.createElement('button')
btnToHome.textContent = "↑";
btnToHome.id = "GoToUp";
btnToHome.style = `
    bottom: 30px;
    right: 30px;
    padding: 20px;
    font-size: 24px;
    border-radius: 100%;
    background-color: #ffff00;
    position: fixed;
    color: #000;
    border: none;
    cursor: pointer;
    transition: block 0,3s ease-in-out;
    display: none;
    z-index: 1000;
`;
document.addEventListener("DOMContentLoaded", function(){
    btnToHome.addEventListener('mouseenter', function(){ btnToHome.style.backgroundColor = '#ff8e03'; });
    btnToHome.addEventListener('mouseleave', function(){ btnToHome.style.backgroundColor = '#ffff00'; });
});
document.body.appendChild(btnToHome);

document.addEventListener("DOMContentLoaded", function(){
    const btn = document.querySelector("form");
    btn.addEventListener('submit', async (e) => {
        e.preventDefault();
        let message = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            comment: document.getElementById("comment").value
        };
        alert("submited");
        try{
            const response = await fetch("http://localhost:3000/application", {
            mode: 'no-cors',
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(message)
            });
            if(!response.ok){
                const errorData = await response.json().catch(() => {});
                throw new Error(errorData.message || `HTTP error ${response.status}`);
            }
            const result = await response.json();
            alert("Thanks! Request was accessed");
            form.reset();
        } catch (error){
            console.error("Error: ", error);
            alert(error.message);
        }
    });
});

// from flask import Flask, request, jsonify
// from flask_cors import CORS

// app = Flask(__name__)
// CORS(app)
// @app.route('/application', method=['POST'])

// def application():
//     data = request.get_json()
//     print("Request accessed")
//     return jsonify({'success': True, 'message': 'Request accessed', 'data': 'data'}), 201

// if __name__ == '__main__':
//     app.Run(host="localhost", port=3000)