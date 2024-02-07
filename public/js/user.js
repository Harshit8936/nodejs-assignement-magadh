// logout function
const handleLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/signin';
}

// login function
const handleLogin = async (event) => {
    event.preventDefault();
    const email = document.querySelector('input[name="email"]');
    const pass = document.querySelector('input[name="password"]');
    const formData = {
        email: email.value,
        password: pass.value
    }
    const response = await fetch(`/api/user/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    const json = await response.json();
    console.log(json);
    if(json.success){
        // save the authToken and redirect to home page
        localStorage.setItem('token',json.token);
        window.location.href = "/";
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }else{
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }
}


// signup function
const handleSignup = async (event) => {
    event.preventDefault();
    const name = document.querySelector('input[name="name"]');
    const role = document.querySelector('select');
    const email = document.querySelector('input[name="email"]');
    const pass = document.querySelector('input[name="password"]');
    const formData = {
        name: name.value,
        role: role.value,
        email: email.value,
        password: pass.value
    }
    const response = await fetch(`/api/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    const json = await response.json();
    console.log(json)
    if (json.success) {
        window.location.href = "/signin";
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    } else {
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }
}

