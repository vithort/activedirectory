//Referência: https://www.npmjs.com/package/activedirectory

const ActiveDirectory = require('activedirectory');
const dotenv = require('dotenv');
dotenv.config();

//console.log(process.env.NODE_AD_URL);
//console.log(process.env.NODE_AD_DN);
//console.log(process.env.NODE_AD_USER);
//console.log(process.env.NODE_AD_PASS);

var config = {
    url: process.env.NODE_AD_URL,
    baseDN: process.env.NODE_AD_DN,
    username: process.env.NODE_AD_USER,
    password: process.env.NODE_AD_PASS
    //username: 'admglobal\\vtcarvalho',
    //password: '',
}
var ad = new ActiveDirectory(config);

let username = process.env.NODE_AD_USER;
let password = process.env.NODE_AD_PASS;
let groupName = 'Administradores';

ad.authenticate(username, password, function (err, auth) {
    if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
    }

    if (auth) {
        console.log('Autenticação: Ok!');
    }
    else {
        console.log('Autenticação: Falha!');
    }
});

ad.isUserMemberOf(username, groupName, function (err, isMember) {
    if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
    }
    console.log(`O Usuário '${username}' é membro do Grupo '${groupName}'? ${isMember}`);
});

ad.getGroupMembershipForGroup(groupName, function (err, groups) {
    if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
    }
    if (!groups) console.log('Group: ' + groupName + ' not found.');
    else console.log(JSON.stringify(groups));
});