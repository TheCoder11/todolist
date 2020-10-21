def on_up_pressed():
    global selected_number
    if len(currentList2) > 0:
        if selected_number == 0:
            selected_number = len(currentList2) - 1
        else:
            selected_number = selected_number - 1
    print(generateNewListString(currentList2, selected_number))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_b_pressed():
    global tmp_newTask
    if controller.right.is_pressed():
        print("SUGGESTED TASKS, Press B to select")
        currentList2 = suggestedTasks
        print(generateNewListString(suggestedTasks, selected_number))
        
        def on_a_pressed_suggested():
            if suggestedTasks[selected_number] in currentTasks:
                print("Suggestion has already been added")
            else:
                currentTasks.append(suggestedTasks[selected_number])
                print("SUGGESTION ADDED")
            currentList2 = currentTasks
            controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)
        controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed_suggested)
    
    elif controller.left.is_pressed():
        print("DELETED TASKS: \n")
        
        print(generateNewListString(deletedTasks, 0))
        
    else:
        tmp_newTask = game.ask_for_string("Please enter new task")
        if tmp_newTask in currentTasks:
            print("Task already present!")
        else:
            currentTasks.append(tmp_newTask)
            if tmp_newTask in deletedTasks:
                suggestedTasks.append(tmp_newTask)
                deletedTasks.remove_at(deletedTasks.index(tmp_newTask))
                deletionTimes.remove_at(deletedTasks.index(tmp_newTask))
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_down_pressed():
    global selected_number
    if len(currentList2) > 0:
        if selected_number == len(currentList2) - 1:
            selected_number = 0
        else:
            selected_number = selected_number + 1
    print(generateNewListString(currentList2, selected_number))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_a_pressed():
    global temp_deletedVariable
    temp_deletedVariable = currentTasks.remove_at(selected_number)
    if temp_deletedVariable in suggestedTasks:
        print("Task has already been deleted")
    elif len(currentTasks) == 0:
        print("There are no tasks currently available")
    else:
        deletedTasks.append(temp_deletedVariable)
        suggestedTasks.append(temp_deletedVariable)
        deletionTimes.append(game.runtime())
    print("" + temp_deletedVariable + " deleted")

deletionTimes: List[number] = []
temp_deletedVariable = ""
tmp_newTask = ""
currentList2: List[str] = []
deletedTasks: List[str] = []
selected_number = 0
currentTasks: List[str] = []
suggestedTasks: List[str] = []
temp_deletedVariable2 = 0
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)
selected_number = 0
currentTasks = []
suggestedTasks = []
deletedTasks = []
currentList2 = currentTasks
game.splash("Please look at the console")

def generateNewListString(usedList: List[str], selectedNumber: number = 0):
    generatedString = " --------------------- \n"
    for item in usedList:
        if usedList.index(item) == selectedNumber:
            generatedString = generatedString + " -> " + item
        else:
            generatedString = generatedString + "  . " + item
        generatedString = generatedString + "\n"
    generatedString = generatedString + " ---------------------- \n"
    return generatedString

def on_on_update():
    for value in suggestedTasks:
        if deletedTasks.index(value) >= 0:
            if deletionTimes[deletedTasks.index(value)] < game.runtime() - 20000:
                suggestedTasks.remove_at(suggestedTasks.index(value))
                print("" + value + " deleted due to time")
game.on_update(on_on_update)
