const Service = require('egg').Service

class userMsgBoardService extends Service {
    async getMsgBoardList() {
        const res = await this.app.mysql.select('usermsg');
        return {
            code: 0,
            data: res
        }
    }
    async addMsgBoard(params) {
        const res = await this.app.mysql.insert('usermsg', {
            username: params.username,
            email: params.email,
            message: params.message
        })
        if (res.affectedRows === 1) {
            return {
                code: 0,
                msg: "留言成功"
            }
        } else {
            return {
                code: -1,
                msg: "留言失败"
            }
        }
    }
    async moidfyMsgBoard(params) {
        const res = await this.app.mysql.update('usermsg', {
            id: params.id,
            username: params.username,
            email: params.email,
            message: params.message
        })
        if (res.affectedRows === 1) {
            return {
                code: 0,
                msg: "修改成功"
            }
        } else {
            return {
                code: -1,
                msg: "修改失败"
            }
        }
    }
    async deleteMsgBoard(params) {
        const res = await this.app.mysql.delete('usermsg', {
            id: params.id
        })
        if (res.affectedRows === 1) {
            return {
                code: 0,
                msg: "删除成功"
            }
        } else {
            return {
                code: -1,
                msg: "删除失败"
            }
        }
    }
}

module.exports = userMsgBoardService