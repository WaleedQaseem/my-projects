const btnAll = document.querySelectorAll(".btn");
const screenInput = document.querySelector(".screen");
const btnEqual = document.querySelector(".btn-equal");
const btnClear = document.querySelector(".btn-clear");

btnAll.forEach(function (singleButton, index) {
 singleButton.addEventListener("click", function (event){
     event.preventDefault();
     const num = event.target.dataset.num;
     screenInput.value += num;
 });
});

btnClear.addEventListener("click", function(event) {
    event.preventDefault();
    screenInput.value = "";
});

btnEqual.addEventListener("click", function(event){
    event.preventDefault();
    if(screenInput.value == "") {
    alert("oo bhai nhi karega kam")
    return;
    }
    screenInput.value = eval(screenInput.value).toFixed(8);

});