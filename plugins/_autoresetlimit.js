let {
	proto
} = (await import('@adiwajshing/baileys')).default

export async function all(m) {
	let setting = global.db.data.settings[this.user.jid]
	if (setting.resetlimit) {
		if (new Date() * 1 - setting.resetlimitDB > 604800000) { // waktu reset 7day = 604800000. kamu bisa tanyakan Ai contoh: .bing 1 hari berapa milidetik?
			let list = Object.entries(global.db.data.users);
			let lim = 10;
			list.map(([user, data], i) => (Number(data.limit = lim)));
			let anu = {
				"key": {
					"fromMe": false,
					"participant": "0@s.whatsapp.net",
					"remoteJid": "0@s.whatsapp.net"
				},
				"message": {
					"groupInviteMessage": {
						"groupJid": "120363298036479484@g.us",
						"inviteCode": "AETHER",
						"groupName": "AETHERZBOTZ Powered by AETHER",
						"caption": "https://aetherz.xyz",
						'jpegThumbnail': "https://cdn.discordapp.com/attachments/1287434775111405635/1312389470229762109/upload.png?ex=674c5170&is=674afff0&hm=925dda410cac0684b4325f9f9f9b2c2930ad13eae2fdbfb670d156e91b667d4a&"
					}
				}
			}
			conn.sendMessage(global.info.nomorown + '@s.whatsapp.net', {
				text: `*Berhasil mereset setiap limit user menjadi ${lim}*`
			}, {
				quoted: anu
			})

			const msg = {
				conversation: `*Berhasil mereset setiap limit user menjadi ${lim}*`
			};
			const plaintext = proto.Message.encode(msg).finish();
			const plaintextNode = {
				tag: 'plaintext',
				attrs: {},
				content: plaintext,
			};
			const node = {
				tag: 'message',
				attrs: {
					to: global.info.channel,
					type: 'text'
				},
				content: [plaintextNode],
			};

			conn.query(node);
			setting.resetlimitDB = new Date() * 1
		}
	}
	return !0
}