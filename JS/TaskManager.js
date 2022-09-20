class Task{
    constructor(descrip,category){
    this.done = false
    this.description = descrip
    this.category = category
    }
};

let taskDescription = document.getElementById('task')
let taskCategory = document.getElementById('category')
let btnCreate = document.getElementById("btnCrear")

//referencias a la fecha
let anio = document.getElementById('anio')

//asignando fechas
anio.innerHTML = new Date().getFullYear()






 
btnCreate.addEventListener('click', function () {

    task = createTask() 
    printTaskInWindow(task)

})

function createTask(){

    let descrip = taskDescription.value
    let category = taskCategory.value
    //chequeo que haya ingresado algo en los input
    if  (descrip.length===0 && category.length===0){
        return
    }

    return  new Task(descrip,category)

}

    
    function printTaskInWindow(task){
        //crear las etiquetas contenedoras de la tarea
        let taskContainer = document.createElement('div')
        let taskDesc = document.createElement('p')
        let taskCategory = document.createElement('span')
        //asignar clases para el css
        taskContainer.className = 'taskcontainer'
        taskDesc.className = 'task'
        taskCategory.class = 'taskCategory'
        // asignar contenedores hijos
        taskDesc.innerHTML = `${task.description}`
        taskCategory.innerHTML = `${task.category}`
        //ingresar contenedores hijos al contenedor de tarea

        taskContainer.appendChild(taskDesc) 
        taskContainer.appendChild(taskCategory) 
        //ingresar contenedor de tarea a contenedor de tareas
        let tasksContainer = document.getElementById('tasksContainer')
        tasksContainer.appendChild(taskContainer )       
        
    }

