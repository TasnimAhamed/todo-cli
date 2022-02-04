const {argv}=require('yargs')
const path=require('path')
const Todo=require('./Todo')
const {saveFile,readFile}=require('./utils')
const {ADD, UPDATE, NEXT, DONE, FIND, LIST}=require('./commands')


const fileName='./../data.json';

const filePath=path.resolve(__dirname,fileName);

(function init(){
    const data=readFile(filePath) || []
    const todo=new Todo(data);
    const {_:baseCommand}=argv
    
    switch(baseCommand[0]){
        case ADD:{
            todo.addItem(argv.text)
            console.log("Todo added successfully")
            saveFile(todo.todoList,filePath);
            break;
        }
        case UPDATE:{
            todo.updateItem(argv.id,argv.text)
            console.log("Data Updated Successfully.");
            saveFile(todo.todoList,filePath)
            break;
        }
        case NEXT:{
            const item=todo.next();
            console.log(`${item.id} - ${item.text} [ Created: ${item.date} ]`)
            break;
        }
        case DONE:{
            todo.done();
            console.log("One item Completed");
            saveFile(todo.todoList,filePath)
            break;
        }
        case FIND:{
            const items=todo.find(argv.term)
            if(items.length===0){
                console.log("No Items Found");
                break;
            }
            for(let i=0;i<items.length;i++){
                console.log(`${items[i].id} - ${items[i].text} [ Created: ${items[i].date} ]`)
            }
            break;
        }
        case LIST:{
            const items=todo.list();
            if(items.length===0){
                console.log("Empty list");
                break;
            }
            for(let i=0;i<items.length;i++){
                console.log(`${items[i].id} - ${items[i].text} [ Created: ${items[i].date} ]`)
            }
            break;
        }
        default:
            throw new Error('Command Not found');
    }
})()