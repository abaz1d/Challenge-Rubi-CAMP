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
        process.exit(0);


    case 'add':         //menambahkan
        let output = ' ';
        for (let i = 3; i < input.length; i++) {
            output += input[i] + ' '
        };
        bacaData.push({
            'tag': [],
            'content': output,
            'cek': '[ ]'
        })
        fs.writeFileSync('notepad.json', JSON.stringify(bacaData, null, 3))
        console.log(`"${output}" telah ditambahkan`)
        process.exit(0);

    case 'list':        //list biasa
        console.log('Daftar Pekerjaan')
        for (let i = 0; i < bacaData.length; i++) {
            console.log(`${i + 1}. ${bacaData[i].cek} ${bacaData[i].content}`)
        };
        process.exit(0);

    case 'task':        //memanggil task
        console.log('Daftar Pekerjaan')
        console.log(`${index + 1}. ${bacaData[index].cek} ${bacaData[index].content}`)
        process.exit(0);

    case 'delete':      //menghapus
        console.log(`"${bacaData[index]['content']}" telah dihapus`)
        bacaData.splice(index, 1)
        fs.writeFileSync('notepad.json', JSON.stringify(bacaData, null, 3))
        process.exit(0);

    case 'complete':    //ubah jadi selesai
        bacaData[index]['cek'] = '[x]'
        console.log(`"${bacaData[index]['content']}" status selesai`)
        fs.writeFileSync('notepad.json', JSON.stringify(bacaData, null, 3))
        process.exit(0);

    case 'uncomplete':  //ubah cancel selesai
        bacaData[index]['cek'] = '[ ]'
        console.log(`"${bacaData[index]['content']}" status selesai dibatalkan`)
        fs.writeFileSync('notepad.json', JSON.stringify(bacaData, null, 3))
        process.exit(0);

    case 'list:outstanding':    //list yang belum selesai
        console.log('Daftar Pekerjaan')
        if (input[3] == 'asc')  //dari lama ke sebentar
            for (let i = 0; i < bacaData.length; i++) {
                if (bacaData[i].cek == '[ ]') {
                    console.log(`${i + 1}. ${bacaData[i].cek} ${bacaData[i].content}`);
                }
            };

        if (input[3] == 'desc') //dari sebentar ke lama
            for (let i = bacaData.length - 1; i >= 0; i--) {
                if (bacaData[i].cek == '[ ]') {
                    console.log(`${i + 1}. ${bacaData[i].cek} ${bacaData[i].content}`);
                }
            };
        process.exit(0);

    case 'list:completed':  //list yang sudah selesai
        console.log('Daftar Pekerjaan')
        if (input[3] == 'asc')  //dari lama ke sebentar
            for (let i = 0; i < bacaData.length; i++) {
                if (bacaData[i].cek == '[x]') {
                    console.log(`${i + 1}. ${bacaData[i].cek} ${bacaData[i].content}`);
                }
            };

        if (input[3] == 'desc') //dari sebentar ke lama
            for (let i = bacaData.length - 1; i >= 0; i--) {
                if (bacaData[i].cek == '[x]') {
                    console.log(`${i + 1}. ${bacaData[i].cek} ${bacaData[i].content}`);
                }
            };
        process.exit(0);


    case 'tag':         //memberi tag atau tanda
        for (let i = 4; i < input.length; i++) {
            if (!bacaData[index].tag.includes(input[i])) {
                bacaData[index].tag.push(input[i])
            }
        }
        bacaData[index].tag.length - 1;
        console.log(` tag '${bacaData[index].tag}' telah ditambahkan ke daftar ${bacaData[index].content}`);
        fs.writeFileSync("notepad.json", JSON.stringify(bacaData, null, 3))
        process.exit(0);

};


filtering(process.argv[2])

function filtering() { //fungsi untuk Filter
    console.log('Daftar Pekerjaan')
    let kata = process.argv[2]
    let kata2 = kata.slice(0, 7)
    if (kata2 == 'filter:') {
        bacaData.map((item, index) => {
            if (item.tag.includes(kata.slice(7))) {
                console.log(`${index + 1}. ${item.cek} ${item.content}`);
            }
        })
    };
};

