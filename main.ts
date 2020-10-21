controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    
    if (currentList2.length > 0) {
        if (selected_number == 0) {
            selected_number = currentList2.length - 1
        } else {
            selected_number = selected_number - 1
        }
        
    }
    
    console.log(generateNewListString(currentList2, selected_number))
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    let currentList2: string[];
    let selected_number: number;
    
    if (controller.right.isPressed()) {
        console.log("SUGGESTED TASKS, Press B to select")
        currentList2 = suggestedTasks
        selected_number = 0
        console.log(generateNewListString(suggestedTasks, selected_number))
        controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed_suggested() {
            if (currentTasks.indexOf(suggestedTasks[selected_number]) >= 0) {
                console.log("Suggestion has already been added")
            } else {
                currentTasks.push(suggestedTasks[selected_number])
                console.log("SUGGESTION ADDED")
            }
            
            let currentList2 = currentTasks
            controller.A.onEvent(ControllerButtonEvent.Pressed, on_a_pressed)
        })
    } else if (controller.left.isPressed()) {
        console.log("DELETED TASKS: \n")
        console.log(generateNewListString(deletedTasks, 0))
    } else {
        tmp_newTask = game.askForString("Please enter new task")
        if (currentTasks.indexOf(tmp_newTask) >= 0) {
            console.log("Task already present!")
        } else {
            currentTasks.push(tmp_newTask)
            if (deletedTasks.indexOf(tmp_newTask) >= 0) {
                suggestedTasks.push(tmp_newTask)
                deletedTasks.removeAt(deletedTasks.indexOf(tmp_newTask))
                deletionTimes.removeAt(deletedTasks.indexOf(tmp_newTask))
            }
            
        }
        
    }
    
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    
    if (currentList2.length > 0) {
        if (selected_number == currentList2.length - 1) {
            selected_number = 0
        } else {
            selected_number = selected_number + 1
        }
        
    }
    
    console.log(generateNewListString(currentList2, selected_number))
})
function on_a_pressed() {
    
    temp_deletedVariable = currentTasks.removeAt(selected_number)
    if (suggestedTasks.indexOf(temp_deletedVariable) >= 0) {
        console.log("Task has already been deleted")
    } else if (currentTasks.length == 0) {
        console.log("There are no tasks currently available")
    } else {
        deletedTasks.push(temp_deletedVariable)
        suggestedTasks.push(temp_deletedVariable)
        deletionTimes.push(game.runtime())
    }
    
    console.log("" + temp_deletedVariable + " deleted")
}

let deletionTimes : number[] = []
let temp_deletedVariable = ""
let tmp_newTask = ""
let currentList2 : string[] = []
let deletedTasks : string[] = []
let selected_number = 0
let currentTasks : string[] = []
let suggestedTasks : string[] = []
let temp_deletedVariable2 = 0
controller.A.onEvent(ControllerButtonEvent.Pressed, on_a_pressed)
selected_number = 0
currentTasks = []
suggestedTasks = []
deletedTasks = []
currentList2 = currentTasks
game.splash("Please look at the console")
function generateNewListString(usedList: string[], selectedNumber: number = 0): string {
    let generatedString = ` --------------------- 
`
    for (let item of usedList) {
        if (usedList.indexOf(item) == selectedNumber) {
            generatedString = generatedString + " -> " + item
        } else {
            generatedString = generatedString + "  . " + item
        }
        
        generatedString = generatedString + "\n"
    }
    generatedString = generatedString + ` ---------------------- 
`
    return generatedString
}

game.onUpdate(function on_on_update() {
    for (let value of suggestedTasks) {
        if (deletedTasks.indexOf(value) >= 0) {
            if (deletionTimes[deletedTasks.indexOf(value)] < game.runtime() - 20000) {
                suggestedTasks.removeAt(suggestedTasks.indexOf(value))
                console.log("" + value + " deleted due to time")
            }
            
        }
        
    }
})
