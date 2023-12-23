let additem=document.getElementById('btnid')
additem.addEventListener('click',addtodos)
let remainingTodoDisplay=document.getElementById('rid')
let completedTodoDisplay=document.getElementById('did')

 function addtodos(e){
   
    let todoName=document.getElementById('textid').value;
    let tododesc=document.getElementById('desid').value;
    let isdone=false


        
   axios.post('https://crudcrud.com/api/8bd1b215d75443d18f73291bf8b6c395/todo',{
        todoName,
        tododesc,
        isdone
    })
    // showDetails(result.data)
        .then(res=>{
            showDetails(res.data);   
        })
        .catch(err=>{
            console.log(err)
        })
       
    
    
}

function showDetails(details){
    if(details.isdone==false){
    let displayItem=document.createElement('li')
    let inputText=document.createTextNode(details.todoName+"  "+details.tododesc+" ")
    displayItem.appendChild(inputText)
    
    let doneBtn=document.createElement('button')
    let donetext=document.createTextNode('\u2713')
    doneBtn.appendChild(donetext)
    
    
    let deleteBtn=document.createElement('button')
    let deletetext=document.createTextNode('\u2715')
    deleteBtn.appendChild(deletetext)
    displayItem.appendChild(doneBtn)
    displayItem.appendChild(deleteBtn)
    deleteBtn.addEventListener('click',removeItem)
    doneBtn.addEventListener('click',displaydonetodos)

    function removeItem(){
        let id=details._id;
        axios.delete(`https://crudcrud.com/api/8bd1b215d75443d18f73291bf8b6c395/todo/${id}`)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err)
            })
        remainingTodoDisplay.removeChild(displayItem)
        
    }
    function removeItem1(){  // done todos
        remainingTodoDisplay.removeChild(displayItem)
    }
    remainingTodoDisplay.appendChild(displayItem)
    }
    

    function displaydonetodos(){
        let id=details._id;
        let todoName=details.todoName;
        let tododesc=details.tododesc;
        axios.put(`https://crudcrud.com/api/8bd1b215d75443d18f73291bf8b6c395/todo/${id}`,{
            todoName,
            tododesc,
            isdone:true
        })
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err)
            })
        if(details.isdone==true){
           showDetailsOnDoneTodo(details);
        }
        let displayItem=document.createElement('li')
        let inputText=document.createTextNode(todoName+" "+tododesc);
        displayItem.appendChild(inputText)
        completedTodoDisplay.appendChild(displayItem)
        
        removeItem1();

    } 
    
}
function showDetailsOnDoneTodo(details){
    if(details.isdone==true){
        let displayItem=document.createElement('li')
        let inputText=document.createTextNode(details.todoName+"  "+details.tododesc);
        displayItem.appendChild(inputText)
        completedTodoDisplay.appendChild(displayItem)
    }
}

window.addEventListener('DOMContentLoaded',showtodos);
 function showtodos(){
   axios.get('https://crudcrud.com/api/8bd1b215d75443d18f73291bf8b6c395/todo')
   
        .then(res=>{
            for(let i=0;i<res.data.length;i++){
                               
                showDetails(res.data[i]);//remaining todo isdone=false
                showDetailsOnDoneTodo(res.data[i]);// done todo isdone=true
               
            }
        })
        .catch(err=>{
            console.log(err);
        })
}

