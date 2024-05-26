// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id='task'
    const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

    for(let i=0;i<10;i++){
        id+=characters.charAt(Math.floor(Math.random()*characters.length))
    }

    return id
}

// Todo: create a function to create a task card
function createTaskCard(task){

    const a = JSON.parse(localStorage.getItem(task))

    if(a.date<=dayjs().format('MM/D/YYYY')){
        var b = 'bg-danger'
    }else if(dayjs(a.date).diff(dayjs(), 'day')<3){ //its a heart
        var b = 'bg-warning'
    }else{
        var b = 'bg-white'
    }

    const card =
    $(`
    <div id='${a.id}' class='card draggable col-11 mx-auto ${b}'>
        <h3 class='py-2'>${a.title}</h3>
        <p>${a.details}</p>
        <p>${a.date}</p>
        <button type="button" class="btn btn-danger btn-outline-dark col-4 mb-2 mx-auto deleteCard">Delete</button>
    </div> 
    `)

    $(`#${a.pos}`).append(card)
    
}

// function createTemporaryCard(a){
//     const card =
//     $(`
//     <div id='${a.id}' class='card draggable'>
//         <h3 class='py-2'>${a.title}</h3>
//         <p>${a.details}</p>
//         <p>${a.date}</p>
//         <button type="button" class="btn btn-danger col-4 mb-2 mx-auto deleteCard">Delete</button>
//     </div> 
//     `)

//     $(`#${a.pos}`).append(card)
// }

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // $( function() {
    //     $( "#todo-cards, #in-progress-cards, #done-cards" ).sortable({
    //       connectWith: ".connectedSortable"
    //     }).disableSelection()
    // })

    Object.keys(localStorage).forEach(function(key) {
        createTaskCard(key);
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(){

    const id = generateTaskId()

    const taskitem={
        title: $('#taskTitle').val(),
        date: $('#taskDate').val(),
        details: $('#taskDetails').val(),
        id: id,
        pos: 'todo-cards'
    }
    // createTemporaryCard(taskitem)

    localStorage.setItem(id, JSON.stringify(taskitem))

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const a = event.currentTarget.parentElement.id

    localStorage.removeItem(a)
    $(document.getElementById(a)).remove()
    // $(`#${a}`).remove() doesnt work
}

// Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {
//     a = event.currentTarget.parentElement.id
//     b = UIEvent.currentTarget.parentElement.position

// }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function(){

    $( function() {
        $( "#todo-cards, #in-progress-cards, #done-cards" ).sortable({
          connectWith: ".connectedSortable"
        }).disableSelection()
    })

    $( function() {
        $( "#taskDate" ).datepicker();
      } );

    renderTaskList()

    $('#addTask').submit(function(event){
        // event.preventDefault()

        if($('#taskTitle').val()&&$('#taskDate').val()&&$('#taskDetails').val()){
            handleAddTask()
            $('.emptyaftersubmit').val('')
            $('#buttonClose').click()
            $('.closealerts').click()
        }else{
            const formerror = 
            $(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                Please fill out the form
                <button type="button" class="btn-close closealerts" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `)
            $('#modal').append(formerror)
        }
    })

    $('.deleteCard').click(function(a){
        handleDeleteTask(a)
    })

    $('.draggable').mouseleave(function(event){
        const a = event.currentTarget.parentElement.id
        const b = event.currentTarget.id
        const c = JSON.parse(localStorage.getItem(b))
        c.pos = a
        localStorage.setItem(b, JSON.stringify(c));
    })

});
