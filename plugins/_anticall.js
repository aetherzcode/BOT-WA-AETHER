let handler = m => m

handler.before = async function (m) {
  this.ev.on('call', async (call) => {
      if (call[0].status == 'offer') {
       
        await this.sessage(call[0].from, {
          text: "",
          quoted: call[0]
        });
        await this.rejectCall(call[0].id, call[0].from);
        await this.updateBlockStatus(call[0].from, "block");
      }
  });
}

module.exports = handler