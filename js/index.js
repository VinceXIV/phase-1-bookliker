document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/books')
    .then(result => result.json())
    .then(data => {
        const domBooks = document.getElementById('list')

        data.forEach(book =>{
            const domBookItem = createDomList(domBooks, book)
            styleItem(domBookItem)
            addListener(domBookItem, book)
        })
    })

    function createDomList(domBooks, book){
        const domBookItem = document.createElement('li')
        domBookItem.id = book.id
        domBookItem.textContent = book.title

        domBooks.append(domBookItem)

        return domBookItem;
    }

    function styleItem(domBookItem){
        domBookItem.style.cursor = "pointer"
    }

    function addListener(domBookItem){
        domBookItem.addEventListener('click', e =>{

            fetch('http://localhost:3000/books')
            .then(result => result.json())
            .then(book => {
                let bookDetails = book.find(item => domBookItem.id == item.id)
                const domShowPanel = document.getElementById('show-panel')
                domShowPanel.innerHTML = `
                    <div id="${bookDetails.id}">
                        <img src="${bookDetails.img_url}"/>
                        <h1>${bookDetails.title}</h1>
                        <h2>${bookDetails.subtitle}</h2>
                        <p style="width: 500px">${bookDetails.description}</p>
                        <ul id="book-details-users"></ul>
                        <button id="like-button">Like</button>
                    </div>`
    
                const domBookUserDetails = document.getElementById('book-details-users')
                bookDetails.users.forEach(userDetail =>{
                    const domUserDetail = document.createElement('li')
                    domUserDetail.style.fontSize = "14px"
                    domUserDetail.style.fontWeight = '600'
                    domUserDetail.id = userDetail.id
                    domUserDetail.textContent = userDetail.username
    
                    domBookUserDetails.append(domUserDetail)
                })
    
                handleLikeButton()
            })
        })

    }

    function handleLikeButton(){
        const domLikeButton = document.getElementById('like-button')

        domLikeButton.addEventListener('click', e=>{
            domLikeButton.textContent = "Liked!"
            const likedBookId = domLikeButton.parentElement.id

            //--------------------
            const newLikeObject = []
            const currentLikers = domLikeButton.parentElement.querySelectorAll('ul li')
            currentLikers.forEach(liker => {
                newLikeObject.push(
                    {
                        id: liker.id,
                        username: liker.textContent
                    }
                )
            })
    
            newLikeObject.push(
                {
                    id: "1",
                    username: "pouros"
                }
            )


            //-------------------------------

            fetch(`http://localhost:3000/books/${likedBookId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    users: newLikeObject
                })
            })
            .then(result => result.json())
            .then(data => {
                const domBookUserDetails = document.getElementById("book-details-users")
                const pouros = Array.from(domBookUserDetails.children).find(user =>{
                    return user.textContent === "pouros"
                })

                //we are assuming we are logged in as pouros, so we are checking if pouros already liked the book
                if(!pouros){
                    const domUserDetail = document.createElement('li')
                    domUserDetail.style.fontSize = "14px"
                    domUserDetail.style.fontWeight = '600'
                    domUserDetail.id = "1"
                    domUserDetail.textContent = "pouros"
    
                    domBookUserDetails.append(domUserDetail)
                }

            })
        })
    }
});
