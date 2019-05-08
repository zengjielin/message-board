const Controller = require('egg').Controller;

class MsgBoardController extends Controller {
    async getMsgBoardList() {
        const res = await this.ctx.service.msgBoard.getMsgBoardList()
        this.ctx.body = res
    }
    async addMsgBoard() {
        let params = this.ctx.request.body
        if (!params.username) {
            this.ctx.body = {
                code: -2,
                msg: "用户不能为空"
            }
            return
        }
        if (!params.email) {
            this.ctx.body = {
                code: -2,
                msg: "邮箱地址不能为空"
            }
            return
        }
        if (!params.message) {
            this.ctx.body = {
                code: -2,
                msg: "用户留言内容不能为空"
            }
            return
        }
        const res = await this.ctx.service.msgBoard.addMsgBoard(params)
        this.ctx.body = res
    }
    async moidfyMsgBoard() {
        let params = this.ctx.request.body
        if (!params.id) {
            this.ctx.body = {
                code: -2,
                msg: "留言板id不能为空"
            }
            return
        }
        if (!params.username) {
            this.ctx.body = {
                code: -2,
                msg: "用户不能为空"
            }
            return
        }
        if (!params.email) {
            this.ctx.body = {
                code: -2,
                msg: "邮箱地址不能为空"
            }
            return
        }
        if (!params.message) {
            this.ctx.body = {
                code: -2,
                msg: "用户留言内容不能为空"
            }
            return
        }
        const res = await this.ctx.service.msgBoard.moidfyMsgBoard(params)
        this.ctx.body = res
    }
    async deleteMsgBoard() {
        let params = this.ctx.request.body
        if (!params.id) {
            this.ctx.body = {
                code: -2,
                msg: "留言板id不能为空"
            }
            return
        }
        const res = await this.ctx.service.msgBoard.deleteMsgBoard(params)
        this.ctx.body = res
    }
}
module.exports = MsgBoardController