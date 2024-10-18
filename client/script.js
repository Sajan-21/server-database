async function login(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    // console.log("email : ",email);
    let password = document.getElementById('password').value;
    console.log("password : ",password);
    let body = {
        email,
        password
    }
    let stringified_body = JSON.stringify(body);
    // console.log("stringified_body : ",stringified_body);
    let response = await fetch('/login',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : stringified_body
    });
    // console.log("response : ",response);
    let parsed_response = await response.json();
    // console.log("parsed_response : ",parsed_response);
    let data = parsed_response.data;
    // console.log("data : ",data);
    let token_key = data._id;
    // console.log("token_key : ",token_key);
    let token = data.token;
    // console.log("token : ",token);
    let user_type = data.user_type;
    // console.log("user_type : ",user_type);
    localStorage.setItem(token_key, token);
    if(user_type === 'Admin'){
        alert(parsed_response.message);
        window.location = `admin.html?_id=${token_key}`;
    }else if(user_type === 'Employee'){
        alert(parsed_response.message);
        window.location = `employee.html?_id=${token_key}`;
    }else{
        alert(parsed_response.message);
    }
}

async function getAllUsers() {
    let queryString = window.location.search;
    let url_params = new URLSearchParams(queryString);
    let token_key = url_params.get("_id");
    let token = localStorage.getItem(token_key);
    try {
        let response = await fetch('/users',{
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        console.log("response : ",response);
    } catch (error) {
        console.log("error : ",error);
    }
}

async function addUser(event) {
    event.preventDefault();
}