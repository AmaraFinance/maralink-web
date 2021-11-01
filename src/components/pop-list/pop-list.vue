<template>
  <div class="w-popup">
    <el-dialog :visible.sync="assetListVisible" center :before-close="handleClose"
      :width="size == 'small' ? '510px':'600px'">
      <div slot="title">
        <div class="searchBox">
          <i class="el-icon-search"></i>
          <el-input v-model="assetValue" @input="assetInput"></el-input>
        </div>
      </div>
      <div class="main">
        <div class="asset-item" v-for="(item,index) in searchList.length ? searchList: assetList" :key="index" @click="selectAsset(index,item)">
          <div class="d-flex">
            <img :src="item.assets_logo" style="width: 35px;height:35px;">
            <div class="d-flex flex-column ml-1">
              <span class="symbol">{{item.symbol}}</span>
              <span class="name">{{item.name}}</span>
            </div>
          </div>
          <div class="radioBox" v-if="item.checked">
            <i class="el-icon-check"></i>
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
        assetValue: '',
        searchList:[],
        assetList: [
          {
            symbol: "MOVR",
            name: "Moonbase Alpha",
            assets_logo: require("../../assets/coins/moon.png"),
            checked: false,
          },
          {
            symbol: "USDT",
            name: "Tether USD",
            assets_logo: require("../../assets/coins/usdt.png"),
            checked: false,
          },
          // {
          //   symbol: "BTC",
          //   name: "BitCoin",
          //   assets_logo: require("../../assets/coins/btc.png"),
          //   checked: false,
          // },
          {
            symbol: "DOT",
            name: "Polkadot Token",
            assets_logo: require("../../assets/coins/polkadot.png"),
            checked: false,
          },
          {
            symbol: "KSM",
            name: "Kusama",
            assets_logo: require("../../assets/coins/kusama.png"),
            checked: false,
          },
        ]
      }
    },
    props: {
      assetListVisible: {
        type: Boolean,
        default: false
      },
      dialogTitle: {
        type: String
      },
      size: {
        type: String,
        default: 'small'
      }
    },
    methods: {
      assetInput(e) {
        if (e) {
          this.searchList = []
          this.assetList.forEach((item, index) => {
            if (item.symbol.indexOf(e.toUpperCase()) >= 0) {
              this.searchList.push(item)
            }
          })
        }else {
          this.searchList = []
        }
      },
      selectAsset(index, item) {
        var newArr = this.searchList.length ? this.searchList: this.assetList;
        newArr.forEach((item, idx) => {
          if (index == idx) {
            item.checked = !item.checked;
            this.$emit('selectAsset', item)
          } else {
            item.checked = false;
          }
        })
      },
      handleClose() {
        this.assetValue = '';
        this.$emit('handleClose');
      }
    }
  }
</script>

<style lang="scss">
  .w-popup {
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
      // justify-content: center;
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
      padding: 0 !important;
    }

    .searchBox {
      margin-left: -16px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      box-sizing: border-box;
      width: 420px;
      height: 45px;
      background: #504988;
      box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.5);
      border-radius: 10px;

      .el-input__inner {
        border: none;
        background-color: transparent;
        color: #FFFFFF;
      }
    }

    .main {
      padding-bottom: 20px;

      .asset-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 40px;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        cursor: pointer;

        .radioBox {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #F205DA;

          .el-icon-check {
            color: #171544;
            font-weight: bold;
          }
        }

        .symbol {
          font-size: 15px;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 21px;
        }

        .name {
          font-size: 10px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          line-height: 14px;
        }
      }
    }

  }
</style>
