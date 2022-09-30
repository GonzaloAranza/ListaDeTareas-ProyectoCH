class Task{
    constructor(descrip,category,taskStatus){
    this.description = capitalizeFirstLetter(descrip).trim()
    this.category = category.trim()
    this.done = taskStatus
    }
};

let tasks = []

//referencias al form
let taskDescription = document.getElementById('task')
let taskCategory = document.getElementById('category')
let btnCreate = document.getElementById("btnCrear")


//referencias a la fecha
let anioFecha = document.getElementById('anio')
let diaFecha = document.getElementById('diaNumero')
let mesFecha = document.getElementById('mes')
let dia = document.getElementById('dia')

//asignando fechas
anioFecha.innerHTML = new Date().getFullYear()
diaFecha.innerHTML = new Date().getDate()
mesFecha.innerHTML = new Date().toLocaleString('es', { month: 'long' });
dia.innerHTML = capitalizeFirstLetter ( new Date().toLocaleString('es',{weekday:'long'}))

//ordenando select 
alphabetizeList(taskCategory)

btnCreate.addEventListener('click', function () {
    if(checkvalidInput()){     
        printTaskInWindow(createTask())
        taskDescription.value =''
    }
})

function createTask(){
    let descrip = taskDescription.value
    let category = taskCategory.value

    return new Task(descrip,category)
    
}

    
    function printTaskInWindow(task){
        //crear las etiquetas contenedoras de la tarea
        let taskContainer = document.createElement('div')
        let taskDesc = document.createElement('p')
        let taskCategory = document.createElement('span')
        let btnDelete = document.createElement('button')
        //asignar eventos
        taskContainer.addEventListener('click', e =>{
            taskContainer.classList.toggle('done')
        })
        btnDelete.addEventListener('click', e => {
            btnDelete.parentElement.remove()
        })
        //asignar clases para el css
        taskContainer.className = 'taskContainer'
        taskDesc.className = 'taskDescription'
        taskCategory.className = 'taskCategory'
        btnDelete.className = 'btnDelete'
        if(task.done) 
             taskContainer.classList.add('done') 
        // asignar contenedores hijos
        taskDesc.innerHTML = `Tarea: ${task.description}`
        taskCategory.innerHTML = `Categoria: ${task.category}`
        //ingresar contenedores hijos al contenedor de tarea
        taskContainer.appendChild(taskDesc) 
        taskContainer.appendChild(taskCategory) 
        taskContainer.appendChild(btnDelete)
        //ingresar contenedor de tarea a contenedor de tareas
        let tasksContainer = document.getElementById('tasksContainer')
        tasksContainer.appendChild(taskContainer )
        
    }



    taskDescription.onkeydown = (e) => {

        if (e.keyCode === 13) {
            e.preventDefault()
            btnCreate.click()      
          
        }
    }

    function checkvalidInput(){
        return (taskDescription.value.length!==0 && taskCategory.value.length!==0)
    }



    function capitalizeFirstLetter(string){
        return string = string.charAt(0).toUpperCase() + string.slice(1)
    }


 //haciendolo de esta forma nos olvidamos de tener que ubicarlos ordenados nosotros mismos 
//Esto es una mala practica, no hay que hacer un array, ordenarlo y volver a crear las options. Buscar ordenamiento de elementos.
        function alphabetizeList(contenedor) {
            let options = []
            for(let option of contenedor){
                   options.push(option.value)
             }

            options.sort((a,b) => a>b ? 1 : -1)

            for(let i = 0 ; i<options.length;i++){
                    contenedor[i].value = options[i]
                    contenedor[i].textContent = options[i]
            }
}



function createTasksObjectsFromJSON(){
    for (let i= 0 ; i < localStorage.length;i++){
        let task = JSON.parse(localStorage.getItem(localStorage.key(i)))
        tasks.push(task)
     }
}

function createTaskContainerFromObject(){

    for (let task of tasks){
        printTaskInWindow(task)
    }

}


window.addEventListener('load', function(){
    createTasksObjectsFromJSON()
    createTaskContainerFromObject()
    //clearLocalStorage()
    tasks = []
})

function createTasksObjectsFromHTML(){
    let taskContainers = document.getElementsByClassName('taskContainer')

    for(let i = 0 ;i < taskContainers.length; i++){
        let tarea = taskContainers[i]
        let campos = tarea.childNodes
        let descripcion = campos[0].textContent.replace('Tarea:','')
        let categoria = campos[1].textContent.replace('Categoria:','')
        let status = tarea.classList.contains('done') ? true : false
        tasks.push(new Task(descripcion,categoria,status))
    }
}


window.addEventListener('beforeunload', function saveTaks(){
    localStorage.clear()
    createTasksObjectsFromHTML()
    let n = 0
    for (let task of tasks){
        localStorage.setItem(`task${n} `,JSON.stringify(task))
        n++
    }
})






