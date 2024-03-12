const formWrapper = document.querySelector(".form-wrapper")
const form = document.querySelector("#form")
const inputDom = document.querySelector("#searchInput")
const buttonWrapper = document.querySelector(".button-wrapper")
const searchButton = document.querySelector("#searchButton")
const clearButton = document.querySelector("#clearButton")
const imageWrapper = document.querySelector(".imageList-wrapper")

runEventListeners()

function runEventListeners(){
    form.addEventListener("submit", search)
    clearButton.addEventListener("click", clear)
}

function clear(){
    inputDom.value = ""
    // Array.from(imageWrapper.children).forEach(child => child.remove)
    imageWrapper.innerHTML = " "
}

function search(e){
    e.preventDefault()

    const value = inputDom.value.trim()

    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{ // fetching & modifying the url
        method : "GET",
        headers: {
            Authorization: "Client-ID 1T57veLcoGcULiNB5iji9EWnrtn1JPhVyNn1wmSbhmc"
            // replace it with your unsplash Client-ID.
        }
    }) 
    .then((res) => res.json())
    .then((data) => { 
    // the result is object so change it to array format so that we can use forEach method
        Array.from(data.results).forEach(images => {
            // console.log(data)
            addImageToUI(images.urls.small, images.alt_description, images.likes, images.user.name)
        });
    })
    .catch((err) => console.log(err))

    imageWrapper.innerHTML = " "
}

function addImageToUI(url,title,likes,userName){

    const div = document.createElement("div")
    div.className = "card";

    const img = document.createElement("img")
    img.setAttribute("src", url)
    img.height = "400"
    img.width = "400"

    const title_p = document.createElement("p")
    title_p.innerHTML = title
    
    const likesImg = document.createElement("p")
    likesImg.innerHTML = "likes: " + likes

    const userNameImg = document.createElement("p")
    userNameImg.innerHTML = "user name: " + userName

    div.appendChild(img)
    div.appendChild(title_p)
    div.appendChild(likesImg)
    div.appendChild(userNameImg)
    imageWrapper.appendChild(div)
}