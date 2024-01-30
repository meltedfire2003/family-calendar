import  fs  from 'fs';
import path from 'path'; 
 
 
 

let data = require('/src/data/data.json');


 

const create = (user: { id?: number; firstName: string; lastName: string; })  => {

    
    
        // generate new user id
        user.id = data.users.length ? data.users.length+ 1 : 1;

        // set date created and updated
        user.firstName = user.firstName
        user.lastName = user.lastName

        // add and save user
        data.users.push(user);
        saveData();
       
}

export const usersRepo = {
    getAll: () => data.users,
    getById: (id: { toString: () => any; }) => data.users.find((x: { id: { toString: () => any; }; }) => x.id.toString() === id.toString()),
    find: (x: any) =>data.users.find(x),
    create,
    update,
    delete: _delete, 
};




function update(id: { toString: () => any; }, params: any) {
    const user = data.users.find((x: { id: { toString: () => any; }; }) => x.id.toString() === id.toString());

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: { toString: () => any; }) {
    // filter out deleted user and save
    data.users = data.users.filter((x: { id: { toString: () => any; }; }) => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('/src/data/data.json', JSON.stringify(data, null, 4));
}