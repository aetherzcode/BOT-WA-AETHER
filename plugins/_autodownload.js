const { trimUndefined } = require('@adiwajshing/baileys');
let fetch = require('node-fetch')
const axios = require('axios');


let handler = m => m

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// DOWNLOADER TIKTOD
async function downloadTikTok(link, m) {
	try {
        if (global.db.data.users[m.sender].limit > 0) {
		const response = await fetch(`https://api.betabotz.eu.org/api/download/tiktok?url=${link}&apikey=${lann}`);
                global.db.data.users[m.sender].limit -= 1
		const data = await response.json();
		if (!data.result.video) {
			return;
		}
		if (data.result.video.length > 1) {
               
			for (let v of data.result.video) {
				await conn.sendFile(m.chat, v, null, `*Tiktok Downloader*`, m);
				await sleep(3000)
			}
		} else {
			await conn.sendMessage(m.chat, { video: { url: data.result.video[0] }, caption: `*Tiktok Downloader*` }, { mention: m })
		}
    }
    else {
        conn.reply(m.chat, 'limit kamu habis!', m);
    }
		return;
	} catch (error) {
		console.error(error);
	}
}

// DOWNLOADER DOUYIN
async function downloadDouyin(link, m) {
	try {
        if (global.db.data.users[m.sender].limit > 0) {
	    const response = await fetch(`https://api.betabotz.eu.org/api/download/douyin?url=${link}&apikey=${lann}`);        
        const data = await response.json();
		if (!data.result.video) {
			return;
		}
		if (data.result.video.length > 1) {
            global.db.data.users[m.sender].limit -= 1
			for (let v of data.result.video) {
				await conn.sendFile(m.chat, v, null, `*Douyin Downloader*`, m);
				await sleep(3000)
			}
		} else {
			await conn.sendMessage(m.chat, { video: { url: data.result.video[0] }, caption: `*Douyin Downloader*` }, { mention: m })
		}
    }
    else {
        conn.reply(m.chat, 'limit kamu habis!', m);
    } 
		return;
	} catch (error) {
		console.error(error);
	}
}

//terabox downloader
// async function downloadtera(link, m) {
// 	try {
//         if (global.db.data.users[m.sender].limit > 0) {
// 	    const response = await fetch(`https://api.botcahx.eu.org/api/download/terabox?url=${link}&apikey=${btc}`);        
// 		 if (!response.result || response.result.length === 0) {
//             throw 'No files found in the response'
//         }

//         let msg = `乂 *T E R A B O X   D O W N L O A D E R*\n\n`
//         msg += `Found ${response.result.length} file(s):\n\n`
        
//         for (let file of response.result) {
//             if (!file.files || !file.files[0]) continue
//             let fdata = file.files[0]
//             msg += ` ◦ *Name :* ${file.name}\n`
//             msg += ` ◦ *Size :* ${formatSize(fdata.size)}\n`
//             msg += ` ◦ *Created :* ${formatDate(file.created)}\n\n`
//         }
       
//         await conn.sendMessage(m.chat, {
//             text: msg,
//             contextInfo: {
//                 externalAdReply: {
//                     title: 'Terabox Downloader',
//                     body: `Processing ${data.result.length} file(s)`,
//                     thumbnailUrl: 'https://pomf2.lain.la/f/ihnv9wct.jpg',
//                     sourceUrl: null,
//                     mediaType: 1,
//                     renderLargerThumbnail: true
//                 }
//             }
//         })

//         const total = data.result.length
//         for (let i = 0; i < data.result.length; i++) {
//             const file = data.result[i]
//             if (!file.files || !file.files[0]) continue
            
//             let fdata = file.files[0]
//                 let response = await fetch(fdata.url)
//                 let buffer = await response.buffer()
               
//                 let queue = `*Antrian:* ${i + 1}-${total}\n`               
//                 await conn.sendFile(m.sender, buffer, file.name, queue, m)
                
//                 if (i === data.result.length - 1) {
//                     await conn.reply(m.sender, '*DONE*', m)
//                 }
                
//                 if (i < data.result.length - 1) {
//                     await new Promise(resolve => setTimeout(resolve, 5000))
//                 }
// 			}

// function formatSize(size) {
//     const units = ['B', 'KB', 'MB', 'GB', 'TB']
//     let i = 0
//     while (size >= 1024 && i < units.length - 1) {
//         size /= 1024
//         i++
//     }
//     return `${size.toFixed(2)} ${units[i]}`
// }

// function formatDate(dateString) {
//     const date = new Date(dateString)
//     return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//     })
// }
// 		}
		
//     else {
//         conn.reply(m.chat, 'limit kamu habis!', m);
//     } 
// 		return;
// 	} catch (error) {
// 		console.error(error);
// 	}
// }


//pinterest downloader
async function downloadpin(link, m) {
	try {
        if (global.db.data.users[m.sender].limit > 0) {
	    const response = await fetch(`https://api.betabotz.eu.org/api/download/pinterest?url=${link}&apikey=${lann}`);        
		const res = await response.json();
    let { media_type, image, title } = res.result.data;
	global.db.data.users[m.sender].limit -= 1
    if (media_type === 'video/mp4') {
      await conn.sendMessage(m.chat, { video: { url: image } });
    } else {
      conn.sendFile(m.chat, image, 'pindl.jpeg', `*Title:* ${title}\n\n*Mediatype:* ${media_type}\n*Source Url*: ${image}\n`, m);
    }
    }
    else {
        conn.reply(m.chat, 'limit kamu habis!', m);
    } 
		return;
	} catch (error) {
		console.error(error);
	}
}

//youtube downloader
async function downloadyt(link, m) {
	try {
        if (global.db.data.users[m.sender].limit > 0) {
	    const response = await axios.get(`https://api.betabotz.eu.org/api/download/ytmp4?url=${link}&apikey=${lann}`);        
		const res = response.data.result;      
        var { mp4, id, title, source, duration, mp3 } = res;
        let capt = `YT MP4*\n\n`;
        capt += `◦ *id* : ${id}\n`;
        capt += `◦ *tittle* : ${title}\n`;
        capt += `◦ *source* : ${source}\n`;
        capt += `◦ *duration* : ${duration}\n`;
        capt += `\n`;
		global.db.data.users[m.sender].limit -= 1    
		await conn.sendMessage(m.chat, { 
            document: { url: mp3 }, 
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`,
        }, { quoted: m });    
        await conn.sendFile(m.chat, mp4, null, capt, m);
		
    }
    else {
        conn.reply(m.chat, 'limit kamu habis!', m);
    } 
		return;
	} catch (error) {
		console.error(error);
	}
}

// DOWNLOADER INSTAGRAM 
async function downloadInstagram(link, m) {
	try {
        if (global.db.data.users[m.sender].limit > 0) {
		const response = await fetch(`https://api.betabotz.eu.org/api/download/igdowloader?url=${link}&apikey=${lann}`);
        let message = await response.json()   
        global.db.data.users[m.sender].limit -= 1        
        for (let i of message.message ) {
            conn.sendFile(m.chat, i._url, null, `*Instagram Downloader*`, m)
        }
    }
    else {
        conn.reply(m.chat, 'limit kamu habis!', m);
    } 
    } catch(err) {
        m.reply(`${eror}`)
    }
}

// DOWNLOADER FACEBOOK 
async function downloadFacebook(link, m) {
	try {
        if (global.db.data.users[m.sender].limit > 0) {
		const response = await fetch(`https://api.betabotz.eu.org/api/download/fbdown?url=${link}&apikey=${lann}`);
		var js = await response.json()   
        global.db.data.users[m.sender].limit -= 1
        conn.sendFile(m.chat, js.result[1]._url, 'fb.mp4', '', m);
        }
        else {
            conn.reply(m.chat, 'limit kamu habis!', m);
        } 
	} catch (error) {
		console.error(error);
	}
}
/**=========================================**/

handler.before = async function (m, {conn, isPrems}) {
	let chat = global.db.data.chats[m.chat];

	if (!m.text) {
		return;
	}

	if (m.text.startsWith('=>') || m.text.startsWith('>') || m.text.startsWith('.') || m.text.startsWith('#') || m.text.startsWith('!') || m.text.startsWith('/') || m.text.startsWith('\/')) {
		return;
	}

	if (chat.isBanned) {
		return;
	}

	if (!m.text.includes('http')) {
		return;
	}

	let text = m.text.replace(/\n+/g, ' ');

	const tiktokRegex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/i;
	const douyinRegex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.|v\.)?(?:douyin\.com\/)(?:\S+)?$/i;
	const instagramRegex = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/i;
	const facebookRegex = /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/i;
	const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w\-]{11})(?:\?[\S]*)?$/i;
	const pinterestRegex = /^(?:https?:\/\/)?(?:[a-z]{2}\.)?pinterest\.com\/pin\/(\d+)\/?$/i;
	// const teraboxRegex = /^(?:https?:\/\/)?(?:www\.)?terabox\.com\/s\/([\w\-]+)(?:\?[\S]*)?$/i;

	if (text.match(tiktokRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await downloadTikTok(text.match(tiktokRegex)[0], m);
	} else if (text.match(douyinRegex)) {
	    conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
	await downloadDouyin(text.match(douyinRegex)[0], m);
	} else if (text.match(instagramRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await downloadInstagram(text.match(instagramRegex)[0], m);
	} else if (text.match(facebookRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await downloadFacebook(text.match(facebookRegex)[0], m);
	}
	else if (text.match(youtubeRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await downloadyt(text.match(youtubeRegex)[0], m);
	}
	else if (text.match(pinterestRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await downloadpin(text.match(pinterestRegex)[0], m);
	}
	// else if (text.match(teraboxRegex)) {
	// 	conn.sendMessage(m.chat, {
	// 		react: {
	// 			text: '✅',
	// 			key: m.key,
	// 		}
	// 	})
	// 	await downloadtera(text.match(teraboxRegex)[0], m);
	// }

	return !0;
}


module.exports = handler
