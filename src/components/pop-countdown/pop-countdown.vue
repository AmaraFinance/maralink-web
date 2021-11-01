<template>
  <div class="pop-count">
    <el-dialog :visible.sync="countDownVisible" center :close-on-click-modal="false" :before-close="handleClose"
      width="600px" v-if="confirmInfo && confirmInfo.from">
      <div slot="title" class="countBox">
        <div class="count-item">
          {{countTimes.hours}}
        </div>
        <span class="mx-1">:</span>
        <div class="count-item">
          {{countTimes.minutes}}
        </div>
        <span class="mx-1">:</span>
        <div class="count-item">
          {{countTimes.seconds}}
        </div>
      </div>
      <div class="mainBox">
        <div class="title">
          The transaction is in progress, please wait patiently.
        </div>
        <div class="amount-title">
          Amount
        </div>
        <div class="amount">
          <img :src="confirmInfo.from.logo" class="img-asset">
          <span class="number">{{confirmInfo.transferAmount}} {{confirmInfo.selectedAsset.symbol}}</span>
        </div>
        <!-- <div class="mind-loss">
          <img src="../../assets/coins/remind.png" class="img-remind">
          <span class="txt-remind">Please transfer through your wallet to avoid loss.</span>
        </div> -->
        <div class="btnBox">
          <el-button class="btn-confirm">
            <a :href="viewTxRUL" target="_blank">View Transaction</a>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      countDownVisible: {
        type: Boolean,
        default: false
      },
      txHash: {
        type: String
      },
      countTimes: {
        type: Object,
        default: {
          hours: '00',
          minutes: '00',
          seconds: '00',
        }
      },
      confirmInfo: {
        type: Object
      }
    },
    computed: {
      viewTxRUL() {
        let url;
        switch (this.confirmInfo.from.chain) {
          case 'Moonriver':
            url = 'https://blockscout.moonriver.moonbeam.network/tx/' + this.txHash + '/internal-transactions';
            break;
          case 'Matic Mainnet':
            url = ' https://polygonscan.com/tx/' + this.txHash;
            break;
        }
        return url;
      }
    },
    watch: {

    },

    methods: {
      handleClose() {
        this.$emit('handleCountClose')
      },

    }
  }
</script>

<style lang="scss">
  .pop-count {
    // .el-dialog {
    //   width: 548px;
    // }

    .el-dialog,
    .el-pager li {
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
      background-image: url(../../assets/images/hide.png);
      background-size: 100%;
      background-repeat: no-repeat;
    }

    .el-dialog__body {
      padding: 0 !important;
    }

    .countBox {
      display: flex;
      align-items: center;

      .count-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: rgba(22, 5, 57, 0.5);
        border-radius: 6px;
        font-size: 18px;
        font-weight: 400;
        color: #FFFFFF;
      }
    }

    .mainBox {
      padding: 30px;
      box-sizing: border-box;

      .title {
        width: 400px;
        margin: 0 auto;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 20px;
      }

      .amount-title {
        margin-top: 35px;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 28px;
      }

      .amount {
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;

        .img-asset {
          width: 44px;
          height: 44px;
        }

        .number {
          margin-left: 15px;
          font-size: 36px;
          color: #FF00F2;
          line-height: 43px;
        }
      }

      .mind-loss {
        margin-top: 25px;
        padding: 0 22px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 540px;
        height: 50px;
        background: rgba(46, 20, 67, 0.5);
        border-radius: 10px;
        border: 2px solid #B707F8;

        .img-remind {
          width: 20px;
          height: 20px;
        }

        .txt-remind {
          margin-left: 10px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          line-height: 24px;
        }
      }

      .btnBox {
        margin-top: 38px;
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
        a {
          color: #FFFFFF;
          text-decoration: none;
        }
        .el-button {
          width: 100%;
          height: 100%;
          color: #FFFFFF;
          background: linear-gradient(160deg, #DC19C1 0%, #121FF0 100%);
        }

        .el-button.is-disabled,
        .el-button.is-disabled:focus,
        .el-button.is-disabled:hover {
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }

  }
</style>
