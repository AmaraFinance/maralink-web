<template>
  <div class="w-popup">
    <el-dialog title="Confirm"  :visible.sync="confirmDialogVisible"  center :before-close="handleClose" :width="size == 'small' ? '510px':'600px'" v-if="confirmInfo && confirmInfo.selectedAsset">
      <div class="content" style="padding: 60px 30px 30px;">
        <div class="amountBox">
          <span>{{confirmInfo.transferAmount}} {{confirmInfo.selectedAsset.symbol}}</span>
        </div>
        <div class="fromToBox">
          <div class="fromBlock">
            <span class="from_txt">From</span>
            <div class="block">
              <img  :src="confirmInfo.from.logo" class="logo">
              <span class="netTxt">{{confirmInfo.from.chain}}</span>
            </div>
          </div>
          <div class="arrowBlock">
            <img src="../../assets/images/arrow.png" alt="">
          </div>
          <div class="fromBlock">
            <span class="from_txt">To</span>
            <div class="block">
              <img  :src="confirmInfo.to.logo" class="logo">
              <span class="netTxt">{{confirmInfo.to.chain}}</span>
            </div>
          </div>
        </div>
        <div class="transferBox">
          <div class="transferInfo">
            <span>Asset</span>
            <span><img :src="confirmInfo.selectedAsset.assets_logo" class="logo">{{confirmInfo.selectedAsset.symbol}}</span>
          </div>
          <div class="transferInfo">
            <span>Destination</span>
            <span><img src="../../assets/images/logo-metamask.png" class="logo">{{accountShow(confirmInfo.transferAddress)}}</span>
          </div>
          <div class="transferInfo">
            <span>Gas Fee</span>
            <span>{{confirmInfo.transferFee}} {{confirmInfo.selectedAsset.symbol}}</span>
          </div>
          <div class="transferInfo">
            <span>You will receive</span>
            <span><img :src="confirmInfo.selectedAsset.assets_logo" class="logo">≈ {{confirmInfo.willReceive}} {{confirmInfo.selectedAsset.symbol}}</span>
          </div>
          <div class="remindBox">
            <span>1.Only the first transfer will be monitored,please initiate a single transfer.</span>
            <span>2.Network fees and the final price depend on market conditions.The final rate may be different once the transaction is completed.</span>
          </div>
          <div class="agreeBox">
            <el-checkbox :value="isAgree" @change="agreeChange"></el-checkbox>
            <span class="ml-1">I have read and agree to the<span style="color: #FF00F2;"> Terms Use</span></span>
          </div>
          <div class="btnBox" @click="confirmAction">
            <el-button class="btn-confirm" :disabled="!isAgree" :loading="buttonLoaing">Confirm</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isAgree: false,
        buttonLoaing: false
      }
    },
    props: {
      confirmDialogVisible: {
        type: Boolean,
        default: false
      },
      dialogTitle: {
        type: String
      },
      size: {
        type:String,
        default:'small'
      },
      confirmInfo: {
        type: Object
      }
    },
    methods: {
      agreeChange() {
        this.isAgree = !this.isAgree
      },
      handleClose() {
        this.$emit('handleClose')
      },
      confirmAction() {
        this.buttonLoaing = true
        this.$emit('confirmTransfer')
      },
      accountShow(account) {
        if (account) {
          return (
            account.substr(0, 8) +
            "...." +
            account.substr(-2)
          );
        } else {
          return '';
        }
      },
    }
  }
</script>

<style lang="scss">
  .w-popup {
    // .el-dialog {
    //   width: 548px;
    // }

    .el-dialog, .el-pager li{
      border-radius: 20px;
      background: linear-gradient(224deg, #171544 0%, #502F87 100%);
      box-shadow: 4px 4px 6px 0px rgba(12, 32, 50, 0.4);
      border-radius: 20px;
    }
    .el-dialog__header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      padding: 20px;
      box-sizing: border-box;
      background: #1F194D;
      box-shadow: 0px 2px 8px 0px #07002E;
      border-radius: 20px 20px 0px 0px;
    }
    .el-dialog__title {
      line-height: 0;
      font-size: 28px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
    }
    .el-icon-close:before {
      content: "";
    }

    .el-dialog__headerbtn {
      z-index: 9;
      top: 28px;
      right: 18px;
      width: 24px;
      height: 24px;
      background-image: url(../../assets/images/close.png);
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .el-dialog__body {
      padding: 0!important;
    }

    .content {
      .amountBox {
        display: flex;
        justify-content: center;
        font-size: 50px;
        color: #FF00F2;
      }
      .fromToBox {
        margin-top: 20px;
        display: flex;
        align-items: center;

        .fromBlock {
          .from_txt {
            display: flex;
            justify-content: flex-start;
            font-size: 20px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 30px;
          }
        }

        .block {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 3px;
          box-sizing: border-box;
          width: 190px;
          height: 128px;
          background: rgba(29, 21, 67, 0.3);
          box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.5), 0px 0px 6px 0px rgba(255, 255, 255, 0.5);
          border-radius: 10px;
          .logo {
            width: 39px;
            height: 39px;
          }
          .netTxt {
            margin-top: 20px;
            font-size: 16px;
            font-weight: 500;
            color: #FFFFFF;
          }

        }

        .arrowBlock {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 26px;
          width: 40px;
          height: 40px;
          // background: linear-gradient(140deg, #FF00FF 0%, #0019FF 100%);
          // border-radius: 6px;

          img {
            width: 100%;
          }
        }
      }
      .transferBox {
        margin-top: 16px;
        .transferInfo {
          width: 100%;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          font-weight: 400;
          color: #FFFFFF;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          .logo {
            margin-right: 6px;
            width: 20px;
            vertical-align: bottom;
          }
        }
      }
      .remindBox {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 22px;
      }
      .agreeBox {
        margin-top: 22px;
        font-size: 13px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 18px;
      }
      .btnBox {
        margin-top: 28px;
        width: 100%;
        height: 60px;
        background: linear-gradient(160deg, #DC19C1 0%, #121FF0 100%);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), 2px 2px 20px 0px rgba(255, 255, 255, 0.6);
        border-radius: 10px;
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 28px;
        overflow: hidden;
        .el-button {
          width: 100%;
          height: 100%;
          color: #FFFFFF;
          background: linear-gradient(160deg, #DC19C1 0%, #121FF0 100%);
        }
        .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }

  }

</style>
