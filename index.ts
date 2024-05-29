#! /usr/bin/env/ node

import inquirer from "inquirer"
interface Todo {
    id : number,
    task : string,
    completed : boolean
}
let todos : Todo[]   = []
let condition = true
while (condition){
const answers = await inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View Todos', 'Add Todo', 'Mark Todo as Completed', 'Exit']
    }
]);
switch (answers.action){
    case 'View Todos':
        console.log('Your Todos:')
        if (todos.length === 0){
            console.log("No todos found")
        }else {
            todos.forEach(todo => {
                console.log(`${todo.id} :- ${todo.task} [${todo.completed? 'completed' : 'pending'}]`)
            })

        }
        break;
    case 'Add Todo':
        let addTodo = true
        do{
            let todoList = await inquirer.prompt([
    {
        name: "addtodo",
        type: "input",
        message: "What do you want to add in your todo list?"
    },
    {
        name: "addmoretodo",
        type: "confirm",
        message: "Do you want to add more todos?",
        default: "true"
    }
])
const newTodos: Todo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    task: todoList.addtodo,
    completed: false
};
todos.push(newTodos)
// console.log(todos)
addTodo = todoList.addmoretodo
} while (addTodo)
    break;
    case 'Mark Todo as Completed' :
        if (todos.length === 0) {
            console.log('No todos found.')
            break;
        }
        const markAnswers = await inquirer.prompt([
            {
                name: 'id',
                type: 'input',
                message: 'Enter the ID of the task to mark as completed:'
            }
        ]);
        const todoToMark = todos.find(todo => todo.id === parseInt(markAnswers.id))
        if (todoToMark) {
            todoToMark.completed = true;
            console.log('Todo marked as completed.');
        } else {
            console.log('Todo not found.');
        }
        break;
        case 'Exit':
                condition = false;
                break;

            default:
                break;

   
}
    }