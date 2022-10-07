//variable 
var inputEl = document.getElementById("newtodo");
var btnAdd = document.getElementById("newtodobutton")
var errorMessage = document.getElementById("message")
var todoList = document.getElementById("todolist")
var clearBtn = document.getElementById("clearbutton")
var i;



//event

inputEl.addEventListener('keyup', checkInput )
btnAdd.addEventListener('click', addToList )
clearBtn.addEventListener('click', remove)

window.onload =init;

// Start function

function init(){
    

    btnAdd.disabled = true;
    
    loadList();
}

// controls input length
//input must be at least 5 digits or letters

function checkInput(){
 
   
    var input = inputEl.value;

    if(input.length > 4){
         errorMessage.innerHTML=""
         btnAdd.disabled = false;
    }else{
        errorMessage.innerHTML ="Ange minst fem tecken"
        btnAdd.disabled = true;
    }
}


//add todo list 

function addToList(){


    // Create new items 
    var input = inputEl.value;
    var newEl = document.createElement("article");
    var textNode = document.createTextNode(input);
    newEl.appendChild(textNode);
    newEl.className ="article"
    //Add to list
    todoList.appendChild(newEl);

    //delete element selected
    newEl.addEventListener('click',function(a){
        a.target.remove();
       saveList();
        
    })
    
    //delete input field
    inputEl.value="";
    // stop adding empty field to list 
    btnAdd.disabled = true;
        saveList();
}

//SaveList to local storage 

function saveList(){

    //read from item list
        var items = document.getElementsByClassName("article")
        var arr = []

        //store in temporary array 
        for (i = 0; i<items.length; i++){
            arr.push(items[i].innerHTML);
        }
        // convert to json string
        var jsonStr = JSON.stringify(arr); 

        // store in Web Storage
        localStorage.setItem("items", jsonStr);
}

//read list
function loadList(){
  //read converts item from json to array 
  var items = JSON.parse(localStorage.getItem("items"))

    for(i=0; i < items.length; i++){
        
        // Create new items 
        
        var newEl = document.createElement("article");
        var textNode = document.createTextNode(items[i]);
        newEl.appendChild(textNode);
        newEl.className ="article"
        //Add to list
        todoList.appendChild(newEl);

    //delete element selected
        newEl.addEventListener('click',function(a){
            a.target.remove();
            saveList();
            
        })
    
    }
 
}

// delete function 

function remove(){
   
    localStorage.clear();
    window.location.reload(); 
    loadList()
}

