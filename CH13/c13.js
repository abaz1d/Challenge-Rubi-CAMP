const fs = require('fs')
const input = process.argv;
const bacaData = JSON.parse(fs.readFileSync('notepad.json', 'utf-8'))

let index = parseInt(input[3]) - 1



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
            output += input[i] + ' '
        };
        bacaData.push({
            'status': false,
            'content': output,
            'tag': '[ ]'
        })
        fs.writeFileSync('notepad.json', JSON.stringify(bacaData, null, 3))
        console.log(`"${output}" telah ditambahkan`)
        break;


    case 'list':
        for (let i = 0; i < bacaData.length; i++) {
            console.log(`${i + 1}. ${bacaData[i].tag} ${bacaData[i].content}`)
        };
        break;

    case 'delete':
        console.log(`"${bacaData[index]['content']}" telah dihapus`)
        bacaData.splice(index, 1)
        fs.writeFileSync('notepad.json', JSON.stringify(bacaData, null, 3))
        break;


    case 'complete':
        bacaData[index]['tag'] = '[x]'
        console.log(`"${bacaData[index]['content']}" status selesai`)
        fs.writeFileSync('notepad.json', JSON.stringify(bacaData, null, 3))
        break;


    case 'uncomplete':
        bacaData[index]['tag'] = '[ ]'
        console.log(`"${bacaData[index]['content']}" status selesai dibatalkan`)
        fs.writeFileSync('notepad.json', JSON.stringify(bacaData, null, 3))
        break;

    case 'list:outstanding':
        if (input[3] == 'asc')
            for (let i = 0; i < bacaData.length; i++) {
                if (bacaData[i].tag == '[ ]'){
                    console.log(`${i + 1}. ${bacaData[i].tag} ${bacaData[i].content}`);
                }
            };

        if (input[3] == 'desc')
            for (let i = bacaData.length - 1; i >= 0; i--) {
                if (bacaData[i].tag == '[ ]'){
                console.log(`${i + 1}. ${bacaData[i].tag} ${bacaData[i].content}`);
                }
            };
        break;

    case 'list:completed':
        if (input[3] == 'asc')
            for (let i = 0; i < bacaData.length; i++) {
                if (bacaData[i].tag == '[x]'){
                    console.log(`${i + 1}. ${bacaData[i].tag} ${bacaData[i].content}`);
                }
            };

        if (input[3] == 'desc')
            for (let i = bacaData.length - 1; i >= 0; i--) {
                if (bacaData[i].tag == '[x]'){
                console.log(`${i + 1}. ${bacaData[i].tag} ${bacaData[i].content}`);
                }
            };
        break;
};
