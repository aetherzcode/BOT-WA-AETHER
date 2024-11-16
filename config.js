global.owner = ['6285798045817']  
global.mods = ['6285798045817'] 
global.prems = ['6285798045817']
global.nameowner = 'ᴀᴇᴛʜᴇʀ'
global.numberowner = '6285798045817'
global.mail = 'aetherscode@gmail.com' 
global.gc = '-'
global.instagram = 'https://instagram.com/aetherz17_'
global.wm = '© AETHER'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = 'Bot WhatsApp'
global.maxwarn = '2' // Peringatan maksimum

global.lann = '-' 

//INI OPTIONAL SIH BOLEH DI ISI BOLEH JUGA ENGGA//
global.btc = '-'
//Daftar https://api.botcahx.eu.org 

global.APIs = {   
  lann: 'https://api.betabotz.eu.org',
  btc: 'https://api.botcahx.eu.org'
}
global.APIKeys = { 
  'https://api.betabotz.eu.org': '-', 
  'https://api.botcahx.eu.org': '-'
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
