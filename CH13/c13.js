const fs = require('fs')
const input = process.argv;
const data = fs.readFileSync(data.json, 'utf-8')

switch (process.argv[2]) {
    case undefined:
        console.log(
            ">>>JS TODO<<<" +
            "\n node todo.js <comand>" +
            "\n node todo.js list" +
            "\n node todo.js task <task_id>" +
            "\n node todo.js add <task content>" +
            "\n node todo.js delete <task_id>" +
            "\n node todo.js complete <task_id>" +
            "\n node todo.js uncomplete <task_id>" +
            "\n node todo.js list:outstanding asc|desc" +
            "\n node todo.js list:complete asc|desc" +
            "\n node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>" +
            "\n node todo.js filter:<tag_name>"
        );
        break;
    case 'add':
        let output = '';
        for (let i = 3; i < input.length; i++) {
            output += input[i] + ''
        }
}

