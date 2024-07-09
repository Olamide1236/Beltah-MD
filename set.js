const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU50RnZ3emlxUkRGcm0yTHFVTXcrVWlscHhtaVhkUmdFR0lVLzRYOThHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTYzejBKZ1JYS3FwTktqUWMxdEZvbjNvaWNPZWVMY2VkNEFXdkxOY0dpTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrRDJvMFYwTitvTnowWkMzODVRcm5EU3FJQVhjVEI5Tm5ZNldPSWtsaTNzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqSnJ5cVNFRlZ0SmdRREpHUFphaThEbEt0YTZBQ25sd1Y3NmxTQzh6R2s4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklCRjlZaTVvcTAzN0NaaGtBTjF6WXExd1pqVVRCUVM3QVNjcUVIYjZHbW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkthN0phbWFycWFOa2VoNVYzcGF3Z3VocGVPaWR2ZlNQbDdhNTJIR0FUeXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JPRjE3ZDJEam5VanlUaXhnV2JXQkUrNTNTZWVDeUFjVlpLOVBlUzIxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1hualNiaXNycnVnVkt6KzNvRVBFNEVzVVFGdThKTTBkaUc2QUdud3VWST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InU4RS8yOXY3WUFRSFlSSFNtbVNiTXQ2UjJUUmVEUVltQ1B3VmJkNVVXUWo0VEszWmdTRnlldDdHOC9xUnZJS2tqd0JiZU9BY0hXUlpuYWxTQ0J5dmdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM1LCJhZHZTZWNyZXRLZXkiOiJIWnlJQ3NDZ3NtZmxxZFJFVUpCdmFpTDVxVTdwRVVmYVU1ZFhiWCtBanFJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxNDkxOTI1OTBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0FBQTY2MzMxNTM4MzczNjUwNDAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMDUwOTU2NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE0OTE5MjU5MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTBGQkJDRjQ1OTkyRDQ4MUU3MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIwNTA5NTY3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTQ5MTkyNTkwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBMjI1Mjc1RDlENjg2QkVDNzQwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjA1MDk1Njl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik1IUVQwT0VjUkpPTVhzdmJsQjZ4MFEiLCJwaG9uZUlkIjoiMmJmOGI1YTgtYjk2My00YjQ4LThmNzItZGY4ZTMwZTY3ZDliIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBUbTF4RmYvUGhuT1RkYlNVQlZCdjNQNWRTZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBcGlnNEFwNWNyaXo0NTNNbkNpM0JFdWt2dHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVlhDTEdZN0wiLCJtZSI6eyJpZCI6IjIzNDgxNDkxOTI1OTA6MzlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiT0xBTUhJREUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0wrLzVETVE3OGl6dEFZWUFpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZxOEdoSW9pWWpzL1pMZDdva0dJUTRzOXlLeGpEYWF1ZWc3Mksyc1I3UUU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjExTGJyN0M0RUgzS0ZPbitNVTRJMFNvbU9DSjF1M2liZ2c0R1c5Y1dmejdjQ2lLQVBvQzlRVWM0U3NCa3hvTGNITHhNSzlCM3dXSkJLbEIyUngxQUJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI0LzZjdEhhL0J2RGVwZDY0Z041OGRIZlZESFg3NGQwV1FCRXZZUERNY1M5a1MyVUFkVytUQlBtWTRIa3NjZUpUeUoyUnJ0RVhvc2JvYjFvQlUzc2VpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNDkxOTI1OTA6MzlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWDZ2Qm9TS0ltSTdQMlMzZTZKQmlFT0xQY2lzWXcybXJub085aXRyRWUwQiJ9fV0sInBsYXRmb3JtIjoic21iaSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDUwOTU2NCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQUUIifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Beltah Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Beltah KE",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BELTAH_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
