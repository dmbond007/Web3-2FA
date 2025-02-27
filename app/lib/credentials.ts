'use server'

/*


//const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost', // or 'mysql' if inside Docker
  port: 3306,
  user: "root",
  password: "1234",
  database: "SampleBank",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
function hashPassword(password: string) {
    var passhash = 0;
    for (let i = 0; i<password.length; i++){
    passhash *= 311;
    passhash += password.charCodeAt(i);
}
passhash = passhash % 999331;
return passhash
}

async function getUserLogin(email: string) {
    const connection = await pool.getConnection();
    try {
        const result:any = await connection.query(`SELECT fname, wallet, login FROM Users WHERE email = ?`, [email]);
        if (result[0][0]) {
            return {name: result[0][0]['fname'] as string, address: result[0][0]['wallet'] as string, id: result[0][0]['login'] as string, cleared2Fa: false, nonce: ""};
            //{name: "Dmitry", address: "1234", id: "dminator", cleared2Fa: false, nonce:""}
        }
        else return {}
    }
        finally {
        connection.release();
    }
}

async function checkPassword(login: string, passhash: number) {
    const connection = await pool.getConnection();
    try {
        const rows:any = await connection.query(`SELECT login FROM Loginfo WHERE login = ? AND passhash = ?`, [login, passhash]);
        console.log(rows);
        if (rows[0][0]){
        return true
        }
        else {
        return false
        }
    } finally {
        connection.release();
    }

}
async function fetchPassword( login: string, passhash: number) {
    try {
        let signIn = await checkPassword(login, passhash);
        return signIn;
    } catch (err) {
        console.error("Error:", err);
    }
}
export default async function AccountRetrieval(email: string, password: string) {
    const loginfo = await getUserLogin(email);
    const passhash = hashPassword(password);
    console.log(loginfo);

    if (loginfo.id) {
        let checkPassword: any = await fetchPassword(loginfo['id'], passhash);
        if (checkPassword){
            return loginfo;
        }
        else {return null}
    } else {
        return null;
    }
        
}
    */