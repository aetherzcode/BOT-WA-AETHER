const axios = require('axios')

let handler = async (m) => {
let time = global.db.data.users[m.sender].bokeb + 600000
  if (new Date - global.db.data.users[m.sender].bokeb < 600000) throw `Fitur Sedang cooldown\ntunggu selama ${msToTime(time - new Date())} lagi`
  const api = 'https://api.ouzen.xyz/randomasupan/discord18?apikey=zenzkey_73c05c87d6ef'
  try {
	conn.chatRead(m.chat)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
    const res = await axios.get(api)
    const result = res.data.result
    conn.sendFile(m.chat, result, 'asupan.mp4', 'yaudah nih!', m)
    global.db.data.users[m.sender].bokeb = new Date * 1
  } catch (e) {
    console.log(e)
    conn.reply(m.chat, 'An error occurred while processing your request.', m)
  }
}

handler.help = ['bokep']
handler.tags = ['internet']
handler.premium = true
handler.command = /^bokep$/i

module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
  
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}