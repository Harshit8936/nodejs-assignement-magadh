// add new book function
const addNewBook = async (event) => {
    event.preventDefault();
    const title = document.querySelector('input[name="title"]');
    const authors = document.querySelector('select');
    const description = document.querySelector('input[name="description"]');
    const price = document.querySelector('input[name="price"]');
    if(price.value>100 || price.value<10){
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Price range should be 10 - 100</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        return;
    }
    const formData = {
        title: title.value,
        authors: authors.value,
        description:description.value,
        price:price.value
    }
    const response = await fetch(`/api/newbook`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    const json = await response.json();
    console.log(json);
    if(json.success){
        window.location.href = "/bookmanagement";
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }else{
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }
}

// update old book function
const updateBook = async (event) => {
    event.preventDefault();
    const description = document.querySelector('input[name="description"]');
    const price = document.querySelector('input[name="price"]');
    const id = document.querySelector('input[name="old_id"]').value;
    const formData = {
        description:description.value,
        price:price.value
    }
    const response = await fetch(`/api/updatebook/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    const json = await response.json();
    console.log(json);
    if(json.success){
        window.location.href = "/bookmanagement";
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }else{
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }
}

// delete book function
const deleteBook = async (id) => {
    const response = await fetch(`/api/deletebook/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const json = await response.json();
    console.log(json);
    if(json.success){
        window.location.href = "/bookmanagement";
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }else{
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }
}


// buy book function
const buyBook = async (id,price,event) => {
    event.preventDefault();
    const quantity = document.querySelector('input[name="quantity"]').value;
    if(!/^[0-9]+$/.test(quantity))
        {
            document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Please enter number only</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
            return;
        }
    const formData = {
        bookId: id,
        price: price,
        quantity:quantity,
    }
    console.log(formData);
    const response = await fetch(`/api/buybook`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify(formData),
    })
    const json = await response.json();
    console.log(json);
    if(json.success){
        window.location.href = "/purchasehistory";
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }else{
        document.getElementById("pgMsg").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>'+json.message+'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }
}