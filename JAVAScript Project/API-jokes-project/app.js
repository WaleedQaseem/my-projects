const getJokeBtn = document.querySelector(".get-jokes");
const inputField = document.getElementById("number");
const form = document.querySelector("form");
const jokesUlElement = document.querySelector(".jokes");
const getRequestBtn = document.querySelector('.get-request');
const postRequestBtn = document.querySelector('.post-request');
const putRequestBtn = document.querySelector('.put-request');
const deleteRequestBtn = document.querySelector('.delete-request');

form.addEventListener('submit',function(event){
    event.preventDefault();
    const inputValue = inputField.value
    if(!inputValue){
        alert('this is not working');
        return; 
    }
    const apiUrl = `https://api.icndb.com/jokes/random/${inputValue}`

    const xhr = new XMLHttpRequest();
    xhr.open('GET',apiUrl,true);

    xhr.onprogress = function(){

    }
    xhr.onerror = function() {
        console.log('Request.error...');
    } 
    xhr.onload = function() {
        if(xhr.readyState == 4 && this.status == 200){
            const data = JSON.parse(this.responseText);
            let output = '';

            if(data.type == 'success'){
                const jokesItems = data.value;
                jokesItems.forEach(function(singleJoke){
                    output += `<li>${singleJoke.joke}</li>`
                })
            }else{
                output += `<li>something went wrong!</li>`
            }
            jokesUlElement.innerHTML = output;
        }
    }
    xhr.send();

})
   getRequestBtn.addEventListener('click',function(event){
       event.preventDefault();

       const xhr = new XMLHttpRequest();
       xhr.open('GET','https://jsonplaceholder.typicode.com/posts',true);
       xhr.onerror = function(){
           console.log('onerror...');
       }
       xhr.onload = function(){
           if(xhr.readyState == 4 && this.status == 200){
               const data = JSON.parse(this.responseText);
               console.log(data);
           }
       }
      xhr.send();
   })
   postRequestBtn.addEventListener('click',function(event){
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('POST','https://jsonplaceholder.typicode.com/posts',true);
    xhr.onerror = function() {
        console.log('Request error...');
    }
    xhr.onload = function() {
        if(xhr.readyState == 4 && this.status == 200){
            const data = JSON.parse(this.responseText);
            console.log(data);
        }
    }
    const payload = JSON.stringify({
        userId : 1,
        id : 1,
        title : "this is title",
        body : "this is body"

    });
    xhr.send(payload);
    
})

putRequestBtn.addEventListener('click',function(event){
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('PUT','https://jsonplaceholder.typicode.com/posts/1',true);
    xhr.onerror = function(){
        console.log('Request error...');
    }
    xhr.onload = function(){
        if(xhr.readyState == 4 && this.status == 200){
            const data = JSON.parse(this.responseText);
            console.log(data);
        }
    }
    const payload = JSON.stringify({
        userId : 1,
        id : 1,
        title : "this is title",
        body : "this is body"
    });
    xhr.send(payload);
})

deleteRequestBtn.addEventListener('click',function(event){
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE','https://jsonplaceholdertypicode.com/posts/1',true)
    xhr.onerror = function() {
    console.log('Request error...');
    }
    xhr.onload = function(){
        if(xhr.readyState == 4 && this.status == 200){
            const data = JSON.parse(this.responseText);
            console.log(data);
        }
    }

    xhr.send();
})