const contacts= require("./contacts");

const { program } = require('commander');
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();
console.log(argv);

async function invokeAction(argv) {
    const { action, id, name, email, phone } = argv;
    switch (action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            console.log(allContacts);
            break;

        case 'get':
            const oneContact = await contacts.getContactById(Number(id));
            if (!oneContact){
                throw new Error(`Contact with id=${id} not found`);
            }
            console.log(oneContact);
            break;

        case 'add':
            await contacts.addContact(name, email, phone)
            console.log("Successfully added");
            break;

        case 'remove':
            const result = await contacts.removeContact(Number(id));
            if (!result){
                throw new Error(`Contact with id=${id} not found`);
            }
            console.log("Successfully remove");
            break;


        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);