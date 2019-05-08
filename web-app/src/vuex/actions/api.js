import axios from 'axios'

export default {
    getMsgBoardList({commit}, params){
        return axios.post('/api/msg_board/list', params)
    },
    addMsgBoard({commit}, params){
        return axios.post('/api/msg_board/add', params)
    },
    modifyMsgBoard({commit}, params){
        return axios.post('/api/msg_board/modify', params)
    },
    deleteMsgBoard({commit}, params){
        return axios.post('/api/msg_board/delete', params)
    },
}