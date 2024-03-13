const formWrapper = document.querySelector(".form-wrapper")
const form = document.querySelector("#form")
const inputDom = document.querySelector("#searchInput")
const buttonWrapper = document.querySelector(".button-wrapper")
const searchButton = document.querySelector("#searchButton")
const clearButton = document.querySelector("#clearButton")
const imageWrapper = document.querySelector(".imageList-wrapper")
const favoritesContainer = document.getElementById('favorites')
const moreUserPhoto = document.getElementById('userPhoto')

runEventListeners()

function runEventListeners(){
    form.addEventListener("submit", search)
    clearButton.addEventListener("click", clear)
}


function clear(){
    inputDom.value = ""
    Array.from(imageWrapper.children).forEach(child => child.remove)
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
            //console.log(data)
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

    const title_div = document.createElement("p")
    title_div.innerHTML = `
    ${title} <br> 
    likes: ${likes}  
    owner: ${userName}
    `

    const cardButton = document.createElement('div')
    cardButton.innerHTML = `
    <button class="favorite-button">Add to Your Picks</button>
    <button class="moreFind-button">More pictures from ${userName}</button>
    `

    const favoriteButton = cardButton.querySelector(".favorite-button")
    favoriteButton.addEventListener('click', () => {
        renderPic(url,userName)
    })

    const userButton = cardButton.querySelector(".moreFind-button")
    userButton.addEventListener("click", () => {
        findMoreUserPic(userName)
    })

    div.appendChild(img)
    div.appendChild(title_div)
    div.appendChild(cardButton)
    imageWrapper.appendChild(div)
}


function renderPic(url,userName){
    const div = document.createElement("div")
    div.className = "card";

    const img = document.createElement("img")
    img.setAttribute("src", url)
    img.height = "300"
    img.width = "300"

    const cardButton = document.createElement('div')

    cardButton.innerHTML = `
    <button class="remove-button">Remove</button>
    `
    const removeButton = cardButton.querySelector(".remove-button")
    removeButton.addEventListener('click', () => {
        favoritesContainer.removeChild(div)
    })

    const title_div = document.createElement("p")
    title_div.innerHTML = ` owner: ${userName}`

    div.appendChild(img)
    div.appendChild(cardButton)
    div.appendChild(title_div)

    favoritesContainer.appendChild(div)
    favoritesContainer.style.border = '1px solid white'
}


function findMoreUserPic(userName){
    fetch(`https://api.unsplash.com/search/users?query=${userName}`,{
        method : "GET",
        headers: {
            Authorization: "Client-ID 1T57veLcoGcULiNB5iji9EWnrtn1JPhVyNn1wmSbhmc"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        //console.log(data)
        Array.from(data.results).forEach(images => {
            (images.photos).forEach(eachphoto => {
                renderPic(eachphoto.urls.small,userName)
            })
        });
    })
    .catch((err) => console.log(err))
}