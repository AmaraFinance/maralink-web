<template>
  <div class="bridge">
    <div class="bridge-left">
      <span class="title">MaraLink Bridge</span>
      <span class="des">safer, faster, easier assets cross-chain bridge</span>
      <div class="btn mt-4">
        <span>FAQ</span>
        <img src="../../assets/images/arrow-right.png" style="width: 16px;">
      </div>
      <div class="btn mt-3">
        <span>User Guide</span>
        <img src="../../assets/images/arrow-right.png" style="width: 16px;">
      </div>
      <div class="mt-6">
        <img src="../../assets/images/bg-net.png" style="width: 183px;">
      </div>
    </div>
    <div class="bridge-right">
      <!-- <div class="title">
        <span>Daily quota ? per address (? / ?)</span>
      </div> -->
      <div class="title_txt">Asset</div>
      <div class="asset_box j-sb" @click="assetListVisible = true">
        <div class="d-flex a-center">
          <img :src="selectedAsset.assets_logo" class="logo">
          <span class="assetTxt">{{selectedAsset.symbol}}</span>
        </div>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="title_txt mt-2">Amount</div>
      <div class="input_box">
        <el-input  placeholder="0" v-model="transferAmount"></el-input>
        <div class="btn-max" @click="maxAction">
          MAX
        </div>
      </div>
      <div class="subtitle mt-1">
        <span>Available: <span style="color:#BF4CED;">{{eventualBalance}}</span> {{selectedAsset.symbol}}</span>
        <div class="d-flex a-center">
          <span>You will receive ≈  </span>
          <img :src="selectedAsset.assets_logo" class="mx" style="width: 22px;">
          <span> {{willReceive}} {{selectedAsset.symbol}}</span>
        </div>
      </div>
      <div class="fromToBox">
        <div class="fromBlock">
          <span class="from_txt">From</span>
          <div class="block">
            <div class="netLogo">
              <img :src="chainList[fromChainIndex].logo" class="logo">
              <el-button class="connectBtn" type="success" round size="mini" v-if="chainList[fromChainIndex].isConnected">Connected</el-button>
            </div>
            <div class="netName">
              <span class="netTxt">{{ chainList[fromChainIndex].chain}}</span>
              <el-dropdown class="netWorkSelect"  placement="bottom">
                <img src="../../assets/images/arrow-down.png" class="logo-down"  v-show="!chainList[fromChainIndex].isConnected">
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item :command="index"  v-for="(item, index) in chainList" :key="index" :disabled="targetChainIndex >= 0 && item.chain == chainList[targetChainIndex].chain">
                    <div class="d-flex a-center">
                      <span class="ml-1">{{item.chain}}</span>
                      <i class="el-icon-check ml-2" v-if="chainList[fromChainIndex].chain == item.chain" style="color: #FA05E0;"></i>
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="arrowBlock" @click="toggle">
          <img src="../../assets/images/arrow.png" alt="">
        </div>
        <div class="toBlock">
          <span class="from_txt">To</span>
          <div class="block">
            <div class="netLogo">
              <img :src="chainList[targetChainIndex].logo" class="logo">
              <el-button class="ml-2" type="success" round size="mini" v-if="chainList[targetChainIndex].isConnected">Connected</el-button>
            </div>
             <div class="netName">
               <span class="netTxt">{{ chainList[targetChainIndex].chain}}</span>
               <el-dropdown class="netWorkSelect" placement="bottom">
                 <img src="../../assets/images/arrow-down.png" class="logo-down"  v-show="!chainList[targetChainIndex].isConnected">
                 <el-dropdown-menu slot="dropdown" >
                   <el-dropdown-item :command="index"  v-for="(item, index) in chainList" :key="index" :disabled="fromChainIndex >= 0 && item.chain == chainList[fromChainIndex].chain">
                     <div class="d-flex a-center">
                       <span class="ml-1">{{item.chain}}</span>
                       <i class="el-icon-check ml-2" v-if="chainList[targetChainIndex].chain == item.chain" style="color: #FA05E0;"></i>
                     </div>
                   </el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
             </div>
          </div>
        </div>
      </div>
      <div class="thirdTitle mt-1">
        If you have not add {{chainList[fromChainIndex].chain}} Chain network in your MetaMask yet, please click
        <el-button class="addNetworkBtn" @click="connectNetwork">Add network</el-button>
        and continue.
      </div>
      <div class="remindBox mt-2 d-flex a-center" v-show="chainList[fromChainIndex].networkVersion != networkVersion">
        <img src="../../assets/images/remind.png" class="remindImg" alt="">
        <span class="remindTxt" style="color: #FFFFFF;">You can not swap {{selectedAsset.symbol}} token from {{chainList[fromChainIndex].chain}} Chain Network to {{chainList[targetChainIndex].chain}} Chain Network. You must change network of your wallet or choose a different network.</span>
      </div>
      <div class="title_txt mt-3">Destination</div>
      <div class="asset_box">
        <img src="../../assets/images/logo-metamask.png" style="width: 30px;">
        <el-input placeholder="Please Enter transfer address" class="transferAddressIpt" v-model="transferAddress"></el-input>
      </div>
      <div class="subtitle mt-1">This is the arrival network address.</div>
      <div class="remindBox mt-2 d-flex a-center">
        <img src="../../assets/images/remind.png" class="remindImg" alt="">
        <span class="remindTxt" style="font-size: 14px;">Your swap address will be your receiving address，please switch the network to check your
          balance after completion.</span>
      </div>
      <div class="nextBtn">
        <el-button  @click="nextAction" :disabled="nextButtonDisable">Next</el-button>
      </div>
      <div class="remindBox mt-3">
        <div class="top">
          <img src="../../assets/images/reminder.png" class="remindImg" alt="">
          <span class="reminder_txt">Reminder</span>
        </div>
        <div class="remindTxt mt-1">1.Minimum amount is {{transferFee}} {{selectedAsset.symbol}}</div>
        <div class="remindTxt ">2.Maximum amount is {{eventualBalance}} {{selectedAsset.symbol}}</div>
       </div>
    </div>
    <pop-list ref="popList" :assetListVisible="assetListVisible" @handleClose="handleAssetListClose" @selectAsset="selectAsset"></pop-list>
    <pop-confirm ref="popConfirm" :confirmInfo="confirmInfo" :confirmDialogVisible="confirmDialogVisible" @handleClose="handleConfirmClose" @confirmTransfer="confirmTransfer"></pop-confirm>
    <pop-countdown :confirmInfo="confirmInfo" :countDownVisible="countDownVisible" @handleCountClose="handleCountClose"></pop-countdown>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import {
    getTransaction
  } from "@/common/api/chain.js";
  const BigNumber = require('bignumber.js');
  import Token from '@/handlers/token';
  import Cross from "@/handlers/cross.js";
  import popList from '@/components/pop-list/pop-list.vue';
  import popConfirm from '@/components/pop-confirm/pop-confirm.vue';
  import popCountdown from '@/components/pop-countdown/pop-countdown.vue';
  export default {
    data() {
      return {
        assetListVisible:false,
        confirmDialogVisible:false,
        token_choosed: "FIL",
        transferAmount: "",
        transferAddress: "",
        // development
        chainList: [
          {
            chain: "Moonriver",
            chainId: 5,
            chainId_x: "0x505",
            address: "0x19966C5f9f2324e93998Ab816958E5e1E7FD012A",
            networkVersion: 1285,
            isConnected: false,
            logo: require('../../assets/images/moon.png')
          },
          {
            chain: "Matic Mainnet",
            chainId: 3,
            chainId_x: "0x89",
            address: "0x19966C5f9f2324e93998Ab816958E5e1E7FD012A",
            networkVersion: 137,
            isConnected: false,
            logo: require('../../assets/images/logo-plgon.png')
          },
        ],
        tokensInfo: {
          USDT: [
            {
                chainId: "5",
                chain: "Moonriver",
                tokenAddress: "0x2D8B15A34700d3F1da11523f2300fc64942bA17D",
                decimal: "6",
                fee: 1,
              },
              {
                chainId: "3",
                chain: "Matic Mainnet",
                tokenAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
                decimal: "6",
                fee: 1,
              },
          ],

        },
        fromChainIndex: 0,
        targetChainIndex: 1,
        isToggled: false,
        networkVersion: "",
        selectedAsset: {},
        confirmInfo: {},
        eventualBalance: 0,
        willReceive: '--',
        transferFee: 0,
        selectedTokensInfo: {},
        countDownVisible: false,
      };
    },
    components: {
      popList,
      popConfirm,
      popCountdown
    },
    computed: {
      ...mapState({
        token: (state) => state.Session.token,
        account: (state) => state.Session.account,
        //networkVersion: (state) => state.Session.networkVersion,
      }),
      nextButtonDisable() {
        let transferAmount = Number(this.transferAmount);
        let eventualBalance = Number(this.eventualBalance);
       // console.log(transferAmount,eventualBalance,this.transferFee)
        if (transferAmount>0 && transferAmount>this.transferFee && transferAmount<=eventualBalance&&this.transferAddress &&this.chainList[this.fromChainIndex].networkVersion == this.networkVersion){
          return false;
        }else {
          return true;
        }
      }
    },
    watch: {
      networkVersion: {
        handler() {
          //console.log("watch-networkVersion", this.networkVersion);
          let idx = this.chainList.findIndex(
            (item) => item.networkVersion == this.networkVersion
          );
          if (this.networkVersion && idx >= 0) {
            this.fromChainIndex = idx;
            this.chainList[idx].isConnected = true;
            for (let i = 0; i < this.chainList.length; i++) {
              if (!this.chainList[i].isConnected) {
                this.targetChainIndex = i;
                return;
              }
            }
          }
        },
        immediate: true,
      },
      account() {
        if (this.account) {
          this.selectedTokensInfo = this.tokensInfo[this.selectedAsset.symbol]
          this.getEventualBalanceOf();
        }
      },
      transferAmount(newVal,oldVal) {
        newVal = Number(newVal)
        let tokensInfo = this.tokensInfo[this.selectedAsset.symbol];
        let idx1 = tokensInfo.findIndex(
          (item) => item.chainId == this.chainList[this.fromChainIndex].chainId
        );
        this.transferFee =  tokensInfo[idx1].fee;
        if (newVal && newVal > 0 && newVal>this.transferFee && newVal<=this.eventualBalance) {
          this.willReceive = new BigNumber(this.transferAmount).minus(new BigNumber(this.transferFee))
        }else {
          this.willReceive = '--'
        }
      }
    },
    mounted() {
      this.networkVersion = window.ethereum.networkVersion;
      this.selectedAsset = this.$refs['popList'].assetList[0];
    },
    methods: {
      async connectNetwork() {
       let chainId_x = this.chainList[this.fromChainIndex].chainId_x;
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId_x }],
          })
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{ chainId: '0x507', rpcUrl: 'https://rpc.testnet.moonbeam.network' /* ... */ }],
              });
            } catch (addError) {
              // handle "add" error
            }
          }
          // handle other "switch" errors
        }
      },
      maxAction(){
        this.transferAmount = this.eventualBalance;
      },
      nextAction() {
        this.confirmInfo = {
          transferAmount:this.transferAmount,
          selectedAsset: this.selectedAsset,
          transferAddress: this.transferAddress,
          from: {
            chain: this.chainList[this.fromChainIndex].chain,
            logo: this.chainList[this.fromChainIndex].logo
          },
          to: {
            chain: this.chainList[this.targetChainIndex].chain,
            logo: this.chainList[this.targetChainIndex].logo
          },
          willReceive: this.willReceive,
          transferFee: this.transferFee
        }
        this.confirmDialogVisible = true;
      },
      toggle() {
        var temp1 = this.fromChainIndex;
        var temp2 = this.targetChainIndex;
        this.fromChainIndex = temp2;
        this.targetChainIndex = temp1;
        this.isToggled = !this.isToggled;
      },
      async confirmTransfer() {
        let token_choosed = this.selectedAsset.symbol
        var idx = this.chainList.findIndex(
          (item) => item.chainId == this.chainList[this.fromChainIndex].chainId
        );
        var fromChain = this.chainList[idx].address;
        let tokensInfo = this.tokensInfo[token_choosed];
        let idx1 = tokensInfo.findIndex(
          (item) => item.chainId == this.chainList[this.fromChainIndex].chainId
        );
        let fromTokenAddress = tokensInfo[idx1].tokenAddress;
        let amount = this.contractAmount(tokensInfo[idx1].decimal);

        let idx2 = tokensInfo.findIndex(
          (item) => item.chainId == this.chainList[this.targetChainIndex].chainId
        );
        let targetTokenAddress = tokensInfo[idx2].tokenAddress;
        let targetChainId = tokensInfo[idx2].chainId;

        // fromTokenAddress, targetChainId, targetTokenAddress, amount, receivedWalletAddress
        this.$Cross = await new Cross(fromChain, fromTokenAddress);

        // this.$Cross.getBalanceOf(fromTokenAddress).then((res) => {
        //   let balance = this.$tools.asDouble(res, 2, tokensInfo[idx1].decimal);
        //   console.log("getBalanceOf", res, balance);
        // });
        this.$Cross
          .lock(
            fromTokenAddress,
            targetChainId,
            targetTokenAddress,
            amount,
            this.transferAddress,
            this.account
          )
          .then((res) => {
            console.log(res);
            this.transferAmount = ''
            this.handleConfirmClose()
            this.getEventualBalanceOf()
            this.$message({
              message: 'Transfer Success',
              type: "success",
            });
          }).catch((err) => {
            this.handleConfirmClose();
            this.$message.error('Transfer Fail');
           console.log(err)
          });
      },
      selectAsset(asset) {
        this.assetListVisible = false;
        this.transferAmount = '';
        this.selectedAsset = asset;
        this.selectedTokensInfo = this.tokensInfo[asset.symbol];
        this.getEventualBalanceOf();
      },
      async getEventualBalanceOf() {
        let tokensInfo =  this.selectedTokensInfo
        let idx1 = tokensInfo.findIndex(
          (item) => item.chainId == this.chainList[this.fromChainIndex].chainId
        );
        this.transferFee =  tokensInfo[idx1].fee;
        let fromTokenAddress = tokensInfo[idx1].tokenAddress;
        this.$Token = await new Token(fromTokenAddress);
        this.$Token.eventualBalanceOf(this.account).then((res) => {
          this.eventualBalance = this.$tools.asDouble(res,4,tokensInfo[idx1].decimal)
        }).catch((err) => {
          console.log(err)
        })
      },
      handleConfirmClose() {
        this.confirmDialogVisible = false;
        this.$refs['popConfirm'].buttonLoaing = false;
        this.$refs['popConfirm'].isAgree = false;
      },
      handleAssetListClose(){
        this.assetListVisible = false;
      },
      handleCountClose(){
        this.countDownVisible = false;
      },
      contractAmount(decimal_) {
        let amount = this.$tools.asDouble(
        this.$tools.safeMul(this.transferAmount,Math.pow(10, decimal_)), 0);
        return amount;
      },
    },
  };
</script>

<style lang="scss">
  .el-dropdown-menu {
    width: 240px;
    padding: 0!important;
    border: none!important;
    border-radius: 6px!important;
    background-color: #1b0649!important;
    overflow: hidden;

  }
  .el-dropdown-menu__item {
    width: 100%;
    color: #FFFFFF!important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px!important;
    padding: 10px 20px!important;
    box-sizing: border-box!important;
  }
  .el-dropdown-menu__item.is-disabled {
    color: #BBBBBB!important;
  }
  .curNetBg {
     background-color: rgba(249, 7, 223, 0.1)!important;
  }
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: rgba(249, 7, 223, .1)!important;
    color: none!important;
  }
  .el-popper .popper__arrow, .el-popper .popper__arrow::after {
    display: none!important;
  }
  .bridge {
    padding: 26px 0 50px 0;
    display: flex;
    justify-content: center;

    .bridge-left {
      margin-top: 20px;
      padding: 55px 0 0 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 297px;
      height: 541px;
      background: linear-gradient(135deg, rgba(121, 24, 120, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
      box-shadow: 8px 8px 12px 0px rgba(19, 30, 113, 0.5);
      border: 2px solid;
      border-image: linear-gradient(163deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.5)) 2 2;

      //filter: blur(10px);
      .title {
        font-size: 28px;
        font-weight: 600;
        color: #FFFFFF;
      }

      .des {
        margin-top: 16px;
        width: 183px;
        font-size: 14px;
        font-weight: 600;
        color: #FFFFFF;
        text-align: left;
        line-height: 24px;
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 159px;
        height: 43px;
        padding: 0 26px;
        box-sizing: border-box;
        background: linear-gradient(135deg, rgba(228, 151, 227, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
        box-shadow: 8px 8px 12px 0px rgba(19, 30, 113, 0.5);
        border-radius: 39px;
        //border: 2px solid;
        //border-image: linear-gradient(163deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.2)) 2 2;
        font-size: 14px;
        font-weight: 500;
        color: #FFFFFF;
        // filter: blur(10px);
      }
    }

    .bridge-right {
      margin-left: 40px;
      padding: 35px 30px 40px;
      box-sizing: border-box;
      width: 640px;
      // height: 785px;
      background: linear-gradient(135deg, rgba(121, 24, 120, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
      box-shadow: 8px 8px 12px 0px rgba(19, 30, 113, 0.5);
      border: 2px solid ;
      border-image: linear-gradient(163deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.5)) 2 2;
      border-radius: 20px!important;

      // filter: blur(10px);
      .title {
        display: flex;
        justify-content: center;
        font-size: 13px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
      }

      .title_txt {
        margin-bottom: 5px;
        display: flex;
        justify-content: flex-start;
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        line-height: 28px;
      }

      .asset_box {
        display: flex;
        align-items: center;
        padding: 0 20px 0 30px;
        box-sizing: border-box;
        width: 100%;
        height: 64px;
        background: rgba(29, 20, 67, 0.6);
        box-shadow: 1px 1px 6px 0px #ffffff;
        border-radius: 10px;
        cursor: pointer;
       // opacity: 0.5;
        .logo {
          width: 30px;
        }
        .assetTxt {
          margin-left: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 22px;
        }
        .transferAddressIpt {
          .el-input__inner {
            color: #FFFFFF;
            &::placeholder {
              color:  rgba(255, 255, 255, 0.5);
            }
          }
        }
      }

      .input_box {
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 120px;
        background: rgba(29, 20, 67, 0.6);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        .el-input {
          height: 80%;
          .el-input__inner {
            font-size: 60px;
            color: #FFFFFF;
          }

        }
        .btn-max {
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 74px;
          height: 34px;
          background: linear-gradient(180deg, #C557E0 0%, #922CBD 100%);
          border-radius: 6px;
          font-size: 18px;
          font-weight: 600;
          color: #FFFFFF;
          cursor: pointer;
        }
      }

      .el-input__inner {
        height: 100% !important;
        background-color: transparent !important;
        border-radius: 10px;
        border: none;
      }

      .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 25px;
      }

      .fromToBox {
        margin-top: 30px;
        display: flex;
        align-items: center;

        .fromBlock,
        .toBlock{
          .from_txt {
            display: flex;
            justify-content: flex-start;
            font-size: 22px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 30px;
          }
        }

        .block {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 3px;
          padding:30px 24px;
          box-sizing: border-box;
          width: 240px;
          height: 156px;
          background: rgba(29, 21, 67, 0.3);
          box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.5), 0px 0px 6px 0px rgba(255, 255, 255, 0.5);
          border-radius: 10px;

          .netLogo {
            width: 100%;
            display:flex;
            justify-content: space-between;
            align-items:flex-end;
            .logo {
              width: 49px;
              height: 49px;
            }
            .connectBtn {
              height:26px;
            }

          }
          .netName {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .netTxt {
              font-size: 16px;
              font-weight: 500;
              color: #FFFFFF;
            }
            .logo-down {
              width: 20px;
              height: 20px;
            }
            .logo-down-s {
              width: 30px;
              height: 30px;
            }
            .netWorkSelect {
              // width: 45%;
              padding: 0 20px;
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              color: #FFFFFF;
              cursor: pointer;
            }

          }

        }

        .arrowBlock {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 26px;
          width: 40px;
          height: 40px;
          background: linear-gradient(140deg, #FF00FF 0%, #0019FF 100%);
          border-radius: 6px;
          cursor: pointer;
          img {
            width: 50%;
          }
        }
      }

      .thirdTitle {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.5);
        text-align: left;
        .addNetworkBtn {
          color: #FFFFFF;
          background: linear-gradient(160deg, #DC19C1 0%, #121FF0 100%)
        }
      }

      .remindBox {
        padding: 10px 30px;
        box-sizing: border-box;
        width: 100%;
        background: rgba(29, 20, 67, 0.5);
        border-radius: 10px;
        border: 2px solid #B707F8;

        .remindImg {
          width: 22px;
        }

        .remindTxt {
          margin-left: 16px;
          text-align: left;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          line-height: 24px;
        }

        .top {
          display: flex;
          align-items: center;

          .reminder_txt {
            margin-left: 10px;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 25px;
          }
        }
      }

      .nextBtn {
        margin: 30px auto 0;
        width: 92%;
        height: 60px;
        background: linear-gradient(160deg, #DC19C1 0%, #121FF0 100%);
        // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), 2px 2px 20px 0px rgba(255, 255, 255, 0.6);
        border-radius: 10px;
        border: none;
        .el-button {
          width: 100%;
          height: 100%;
          color: #ffffff;
          background: linear-gradient(160deg, #DC19C1 0%, #121FF0 100%);
        }
        .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
         background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
</style>
