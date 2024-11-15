const { trimUndefined } = require('@adiwajshing/baileys');
let fetch = require('node-fetch')


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

	return !0;
}


module.exports = handler