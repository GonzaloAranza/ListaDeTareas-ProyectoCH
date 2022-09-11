
//tipo de dato a usar: lista de {tareas: Done , Description}
let taskList = [];


//agregar tareas
function addTask(taskList, taskDesc){
   if(controlDeTask(taskDesc))
    taskList.push({done: false, description: taskDesc.trim() })

    else 
        alert("invalid input" )
}

//controlar que taskDesc no esté vacío y eliminar espacios previos al inicio de taskDesk
function controlDeTask(taskDesc){
    if(taskDesc =='')
         return false
    
    return true
}

//print tareas
function printTaskList(taskList){
    for(let i = 0; i<taskList.length ; i++)
    {
        if(taskList[i].done){

        console.log((i+1)+"."+ "[X]" + taskList[i].description)
       
        }else{
            
            console.log((i+1)+"."+ "[]" + taskList[i].description)

        }
    }
}
//borrar tarea
function deleteTask(taskList,index){
    taskList.splice(index,1)
}

//dividimos la funcionalidad en modos: modo1 va a recoger las tareas y modo 2 marcará  las tareas y le dará fin a la ejecución

function modo1(taskList){
                   

                      let taskDesc =  prompt("escriba la tarea a realizar , introduzca 'fin' o ' borrar' si desea realizar dichas acciones")
        
                    switch(taskDesc){
                    case 'fin':

                        if(checkListEmpty(taskList)){
                            alert("no ingresó tareas")
                            modo1(taskList)
                        }
                        
                        alert('No se introducen  más tareas, avanzará al menu de tareas a realizar');
                        console.clear()
                        modo2(taskList)
                         break;                
                        
                    case 'exit':
                        console.log("ejecución finalizada.")
                        break;

                    case 'borrar':
                        if(checkListEmpty(taskList)){
                            alert("lista vacia, no hay nada para borrar")
                            modo1(taskList)
                            break;
                        }

                        let index = prompt("introduce el índice de la tarea que deseas elminar: ")
                            deleteTask(taskList,index-1);
                            printTaskList(taskList);
                             modo1(taskList);
                            break;                       
                        
                   
                        default:
                            console.clear()
                            addTask(taskList,taskDesc);
                            printTaskList(taskList);
                            modo1(taskList);

                }
}


//marcar tareas

function taskDone(taskList,index){
    if(index >=0   &&index <taskList.length){
    taskList[index].done = true
    }

    else{
    console.log("invalid task number")
    }
}


//chequear que se completaron las tareas
function checkAllDone(taskList){
    for(let task of taskList){
         if(!task.done)
            return false
    }
    return true
}

function checkListEmpty (taskList){
  
    return (taskList.length == 0)
}



function modo2(taskList){
    


        printTaskList(taskList)
        taskNumber = prompt("indique el indice  de la tarea completada")
    
            
            switch(taskNumber){
                case 'fin':
                case 'exit':
                
                console.log("terminada la ejecución. saludos.")
                break;
                
                default:
                    taskDone(taskList,taskNumber-1)
                    if(checkAllDone(taskList)){
                        printTaskList(taskList)
                        console.log("has terminado todas las tareas, felicitaciones")
                    }
                    else
                        modo2(taskList)            
            }
        console.clear()
}


modo1(taskList)

