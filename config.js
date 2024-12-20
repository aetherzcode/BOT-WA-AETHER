global.owner = ['6285798045817', '6285864727063']  
global.mods = ['6285798045817', '6285864727063'] 
global.prems = ['6285798045817', '6285864727063']
global.nameowner = 'ᴀᴇᴛʜᴇʀ'
global.numberowner = '6285798045817'
global.mail = 'aetherscode@gmail.com' 
global.gc = '-'
global.rownerrepo = 'aetherzcode'
global.repobot = 'BOT-WA-AETHER'
global.tokengithub = 'YOUR_GITHUB_TOKEN'
global.instagram = 'https://instagram.com/aetherz17_'
global.wm = '© AETHER'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = 'Bot WhatsApp'
global.maxwarn = '2' // Peringatan maksimum
global.antiporn = true // Auto delete pesan porno (bot harus admin)
global.tokengithub = 'YOUR_GITHUB_TOKEN'

//INI WAJIB DI ISI!//
global.lann = 'YOUR_APIKEY_HERE' 
//Daftar terlebih dahulu https://api.betabotz.eu.org 

//INI OPTIONAL SIH BOLEH DI ISI BOLEH JUGA ENGGA//
global.btc = 'YOUR_APIKEY_HERE'
//Daftar https://api.botcahx.eu.org 

global.APIs = {   
  lann: 'https://api.betabotz.eu.org',
  btc: 'https://api.botcahx.eu.org'
}
global.APIKeys = { 
  'https://api.betabotz.eu.org': 'YOUR_APIKEY_HERE', 
  'https://api.botcahx.eu.org': 'YOUR_APIKEY_HERE'
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
