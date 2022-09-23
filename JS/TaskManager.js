class Task{
    constructor(descrip,category){
    this.done = false
    this.description = descrip
    this.category = category
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
dia.innerHTML = new Date().toLocaleString('es',{weekday:'long'})

btnCreate.addEventListener('click', function () {
    if(checkvalidInput()){
        printTaskInWindow(createTask())
    }
})

function createTask(){
    let descrip = taskDescription.value
    let category = taskCategory.value

    task =new Task(descrip,category)
   //vamos a pushear la tarea. Esto por el momento no tiene sentido pero serviría para el feature del storage

    tasks.push(task)

    return task
    
}

    
    function printTaskInWindow(task){
        //crear las etiquetas contenedoras de la tarea
        let taskContainer = document.createElement('div')
        let taskDesc = document.createElement('p')
        let taskCategory = document.createElement('span')
        //asignar eventos

        taskContainer.addEventListener('click', e =>{
            taskContainer.classList.toggle('done')
        })

        //asignar clases para el css
        taskContainer.className = 'taskContainer'
        taskDesc.className = 'taskDescription'
        taskCategory.className = 'taskCategory'
        // asignar contenedores hijos
        taskDesc.innerHTML = `Tarea: ${task.description}`
        taskCategory.innerHTML = `Categoria: ${task.category}`
        //ingresar contenedores hijos al contenedor de tarea
        taskContainer.appendChild(taskDesc) 
        taskContainer.appendChild(taskCategory) 
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

    /*

    const markTaskAsDone = event => {
        if(event.target == '[object HTMLSpanElement]' || event.target == '[object HTMLParagraphElement]')
            event.target.parentNode.classList.toggle('done')
        else
           event.target.classList.toggle('done');
    };

    */
