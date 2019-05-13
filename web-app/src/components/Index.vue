<template>
  <div class="index">
    <div class="message-board-list-wrapper">
      <div class="message-board-wrapper"  v-for="(item,index) in msgBoardList" :key="index">
        <div class="header-wrapper">
          <div class="user-email">{{item.email}}</div>
          <div class="operation-wrapper">
            <Button type="primary" class="operate-btn" @click="modifyMsgBoard(item)">edit</Button>
            <Button type="error" class="operate-btn" @click="confirmDeleteMsgBoard(item)">delete</Button>
          </div>
        </div>
        <div class="content-wrapper">
          <div class="user-message">{{item.message}}</div>
          <div class="user-name">{{item.username}}</div>
          <div class="write-date">{{item.date}}</div>
        </div>
      </div>
    </div>
    <div class="message-board-form-wrapper">
      <Divider>With Message Form</Divider>
      <Form :model="msgObj" :label-width="80">
        <FormItem label="username">
            <Input v-model="msgObj.username" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="email">
            <Input v-model="msgObj.email" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="message">
            <Input v-model="msgObj.message" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="addMsgBoard">Submit</Button>
            <Button style="margin-left: 8px">Cancel</Button>
        </FormItem>
      </Form>
    </div>

    <Modal
        v-model="modifyMsgBoardDialog"
        title="edit message board"
        @on-ok="confirmModifyMsgBoard">
        <Form :model="modifyMsgBoardObj" :label-width="80">
            <FormItem label="username">
                <Input v-model="modifyMsgBoardObj.username" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="email">
                <Input v-model="modifyMsgBoardObj.email" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="message">
                <Input v-model="modifyMsgBoardObj.message" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      msgBoardList: [],
      msgObj: {
        username: "",
        email: "",
        message: ""
      },
      modifyMsgBoardDialog: false,
      modifyMsgBoardObj: {
        username: "",
        email: "",
        message: ""
      }
    };
  },
  methods: {
    ...mapActions({
      _getMsgBoardList: "getMsgBoardList",
      _addMsgBoard: "addMsgBoard",
      _modifyMsgBoard: "modifyMsgBoard",
      _deleteMsgBoard: "deleteMsgBoard",
    }),
    async getMsgBoardList() {
      const res = await this._getMsgBoardList();
      if (res.code == 0) {
        this.msgBoardList = res.data;
      } else {
        this.$Message.error(res.msg);
      }
    },
    async addMsgBoard() {
      const res = await this._addMsgBoard({
        username: this.msgObj.username,
        email: this.msgObj.email,
        message: this.msgObj.message
      });
      if (res.code == 0) {
        this.$Message.success("留言成功");
        this.msgObj.username = "";
        this.msgObj.email = "";
        this.msgObj.message = "";
        this.getMsgBoardList();
      } else {
        this.$Message.error(res.msg);
      }
    },
    confirmDeleteMsgBoard(msgboard_info) {
      this.$Modal.confirm({
        title: "确定要删除",
        onOk: () => {
          this.deleteMsgBoard(msgboard_info.id);
        }
      });
    },
    async deleteMsgBoard(id) {
      const res = await this._deleteMsgBoard({
        id: id
      });
      if (res.code == 0) {
        this.$Message.success("删除成功");
        this.getMsgBoardList();
      } else {
        this.$Message.error(res.msg);
      }
    },
    modifyMsgBoard(msgboard_info) {
      this.modifyMsgBoardDialog = true;
      this.modifyMsgBoardObj.id = msgboard_info.id;
      this.modifyMsgBoardObj.username = msgboard_info.username;
      this.modifyMsgBoardObj.email = msgboard_info.email;
      this.modifyMsgBoardObj.message = msgboard_info.message;
    },
    async confirmModifyMsgBoard() {
      const res = await this._modifyMsgBoard({
        id: this.modifyMsgBoardObj.id,
        username: this.modifyMsgBoardObj.username,
        email: this.modifyMsgBoardObj.email,
        message: this.modifyMsgBoardObj.message
      });
      if (res.code == 0) {
        this.modifyMsgBoardDialog = false;
        this.$Message.success("修改成功");
        this.getMsgBoardList();
      } else {
        this.$Message.error(res.msg);
      }
    }
  },
  mounted() {
    this.getMsgBoardList();
  }
};
</script>

<style lang='scss'>
.index {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .message-board-list-wrapper {
    flex: 1;
    padding-right: 10px;
    overflow-y: scroll;
    .message-board-wrapper {
      border: 1px solid #e8eaec;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 20px;
      .header-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-email {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #e8eaec;
          font-size: 16px;
          font-weight: 600;
        }
      }
      .content-wrapper {
        .user-message {
          color: #975a84;
          font-size: 16px;
          padding: 10px 0;
        }
        .user-name {
          text-align: right;
          font-size: 16px;
          font-weight: 600;
        }
        .write-date {
          text-align: right;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
  .message-board-form-wrapper {
    height: 365px;
    .ivu-form .ivu-form-item-label {
      font-size: 16px;
    }
    .ivu-input {
      font-size: 16px;
    }
  }
}
</style>
