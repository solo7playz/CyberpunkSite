// const { json } = require("express");

document.addEventListener("DOMContentLoaded", function(){
    const btn = document.querySelector(".btn-main");
    if(btn)
        btn.addEventListener('click', function(){
            alert("click");
        });
    else alert("undefined");
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

document.addEventListener("DOMContentLoaded", function(){
    btn = document.querySelector(".btn-calc");
    let expression;
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        expression = prompt("Введите выражение:");
        try{
            const response = await fetch("http://localhost:5009/application", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(expression)
            });

            if(!response.ok){
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error ${response.status}`);
            }
            const result = await response.json();
            alert(result.message);
            // const request = await fetch("http://localhost:5009/application", {
            // method: "GET",
            // headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify(expression)
            // });
            form.reset();
        } catch (error){
            console.error("Error: ", error);
            alert(error.message);
        }
    })
})

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
        try{
            const response = await fetch("http://localhost:5009/application", {
            // mode: 'no-cors',
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(message)
            });

            if(!response.ok){
                const errorData = await response.json().catch(() => ({}));
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

document.getElementById('openModalBtn').addEventListener('click', function () {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-content';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';

    const title = document.createElement('h2');
    title.textContent = 'Обратная связь';

    const form = document.createElement('form');
    form.className = 'modal-form';

    function createField(name, type, placeholder, labelText, isRequired = false) {
        const group = document.createElement('div');
        group.className = 'form-group';

        const label = document.createElement('label');
        label.textContent = labelText;

        const input = type === 'textarea' 
            ? document.createElement('textarea') 
            : document.createElement('input');
        
        input.name = name;
        input.placeholder = placeholder;
        if (type !== 'textarea') input.type = type;

        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.id = `error-${name}`;

        group.append(label, input, errorSpan);
        return { group, input, errorSpan };
    }

    const nameField = createField('name', 'text', 'Ваше имя', 'Имя *', true);
    const phoneField = createField('phone', 'tel', '79991234567', 'Телефон *', true);
    const commentField = createField('comment', 'textarea', 'Ваш комментарий', 'Комментарий');

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn-submit';
    submitBtn.textContent = 'Отправить';

    form.append(nameField.group, phoneField.group, commentField.group, submitBtn);
    modal.append(closeBtn, title, form);
    overlay.append(modal);
    document.body.append(overlay);

    const destroyModal = () => {
        overlay.remove();
        window.removeEventListener('keydown', handleEsc);
    };

    const handleEsc = (e) => {
        if (e.key === 'Escape') destroyModal();
    };

    closeBtn.addEventListener('click', destroyModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) destroyModal();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;

        [nameField, phoneField].forEach(f => {
            f.input.classList.remove('input-error');
            f.errorSpan.style.display = 'none';
        });

        if (!nameField.input.value.trim()) {
            showError(nameField, 'Введите имя');
            isValid = false;
        }

        const phoneDigits = phoneField.input.value.replace(/\D/g, '');
        if (phoneDigits.length < 10 || phoneDigits.length > 12) {
            showError(phoneField, 'Введите корректный номер (10-12 цифр)');
            isValid = false;
        }

        if (!isValid) return;

        // Отправка данных
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        const formData = {
            name: nameField.input.value,
            phone: phoneDigits,
            comment: commentField.input.value
        };

        try {
            const response = await fetch("http://localhost:5009/application", {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });

            if (response.ok) {
                alert('Спасибо, заявка отправлена!');
                form.reset();
                destroyModal();
            } else {
                throw new Error();
            }
        } catch (error) {
            alert('Ошибка отправки, попробуйте позже');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        }
    });

    function showError(field, message) {
        field.input.classList.add('input-error');
        field.errorSpan.textContent = message;
        field.errorSpan.style.display = 'block';
    }
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