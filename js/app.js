/*-------------- input field call here  -----------------*/
const search = document.getElementById("search");
/* -------------total search result howing div call here  ----------------*/
const resultAmount = document.getElementById("totalAmount");
/* -----------books showing section call here ------------ */
const singleBook = document.getElementById("books");
/*-------------input value takes here  --------------*/
const searchText = () => {
    const searchValue = search.value;
    searching(searchValue);
    // clear total result 
    resultAmount.textContent = '';
    // clear books showing section 
    singleBook.textContent = '';
}

/* ------------api call here -------------- */
const searching = books => {
    const url = `https://openlibrary.org/search.json?q=${books}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getInformation(data));
    // clear input value 
    search.value = '';
}
/*------------ showing books place section call here  --------------------*/
const getInformation = info => {
    /* --------- show total search result and error message ------------ */
    const result = `${info.numFound}`;
    if (result === "0") {
        resultAmount.innerText = `
        No Result Is Found
        `;
    } else {
        resultAmount.innerText = `
        Total search Result: ${result}
        `;
    }
    /*--------------  takes all books array  -------------*/
    const allInfo = info.docs;
    allInfo.forEach(book => {
        /*---------- take here image url  ----------*/
        const imageUrl = ` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        /* ----------creat new div  -------------*/
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-100">
        <!--book image-->
        <img src="${imageUrl}" class="card-img-top p-4" alt="Book Image" style="height:450px;">
        <div class="card-body">
        <!--books name-->
          <h5 class="card-title">Name: ${book.title ? book.title:''}</h5>
         <!--author name-->
          <p class="card-text">Author: ${book.author_name ? book.author_name:''}</p>
          <!--publisher name-->
          <strong class="card-text">Publisher: ${book.publisher ? book.publisher:''}</strong>
          <!--published date-->
          <p class="card-text">1st Published: ${book.first_publish_year ? book.first_publish_year:''}</p>
        </div>
      </div>
        `
        /*---------- append div in showing section  ----------*/
        singleBook.appendChild(div);
    })
}