document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/books')
    .then(result => result.json())
    .then(data => {
        const domBooks = document.getElementById('list')

        data.forEach(book =>{
            console.log(book)
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

    function addListener(domBookItem, bookDetails){
        console.log("book", bookDetails)
        console.log("dombookitem: ", domBookItem)

        domBookItem.addEventListener('click', e =>{
            const domShowPanel = document.getElementById('show-panel')
            domShowPanel.innerHTML = `
                <img src="${bookDetails.img_url}"/>
                <h1>${bookDetails.title}</h1>
                <h2>${bookDetails.subtitle}<h2>
                <p style="font-weight: 400; font-size: 16px; width: 500px">${bookDetails.description}</p>
                <ul id="book-details-users"></ul>
                <button>Like</button>`

            const domBookUserDetails = document.getElementById('book-details-users')
            console.log(domBookUserDetails)
            bookDetails.users.forEach(userDetail =>{
                console.log("userdetail: ", userDetail)
                const domUserDetail = document.createElement('li')
                domUserDetail.style.fontSize = "14px"
                domUserDetail.id = userDetail.id
                domUserDetail.textContent = userDetail.username

                domBookUserDetails.append(domUserDetail)
            })
            console.log("src", bookDetails.img_url)
        })
    }
});
