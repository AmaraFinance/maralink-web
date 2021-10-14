<template>
  <div class="page">
    <el-container>
      <el-header>
        <div class="logoBox">
          <img src="../assets/images/logo-amaraLink.png" class="logo">
          <div class="badge">
            <span>Cross-chain Bridge</span>
          </div>
        </div>
        <div class="btnBox">
          <template>
            <el-button v-if="!account" @click="connectBtn" class="connectBtn">Connect Wallet</el-button>
            <div class="d-flex a-center" v-else>
              <img src="../assets/images/logo-metamask.png" class="logo" v-if="account">
              <span class="accountTxt" @click="copyAccount()">{{accountShow}}</span>
              <input type="text" class="copytxt" />
            </div>
          </template>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer height="100">
        <span class="rightsTxt">Copyright © 2021-2031 Amara.link. All rights reserved.</span>
        <div class="linksBox">
          <a href="https://github.com/AmaraFinance" target="_blank"><img src="../assets/images/github.png"></a>
          <a href="https://twitter.com/AmaraFinance" target="_blank"><img src="../assets/images/twitter.png"></a>
          <a href="https://t.me/AmaraFinance" target="_blank"><img src="../assets/images/tele.png"></a>
          <a href="https://discord.com/invite/rhkyBmmCBf" target="_blank"><img src="../assets/images/discord.png"></a>
          <a href="https://amara-finance.medium.com/" target="_blank"><img src="../assets/images/amara.png"></a>
        </div>
      </el-footer>
      <w-popup class="popup" dialogTitle="Connect Wallet" :dialogVisible="walletDialogVisible" @handleClose="handleClose">
        <div class="walletProvider" @click="connectMetaMask">
          <div class="provider_info">
            <img src="../assets/images/logo-metamask.png" class="provider_info_img">
            <span class="provider_info_name">MetaMask</span>
          </div>
          <el-button class="connectWalletBtn">Connect</el-button>
        </div>
      </w-popup>
    </el-container>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import wPopup from '@/components/w-popup/w-popup.vue';
  export default {
    data() {
      return {
        walletDialogVisible:false
      };
    },
    computed: {
      ...mapState({
        account: (state) => state.Session.account,
      }),
      accountShow() {
        if (this.account) {
          return this.account.substr(0, 8) + "..." + this.account.substr(-2);
        } else {
          return "Connect";
        }
      },
    },
    components: {
      wPopup
    },
    watch: {

    },
    mounted() {},
    methods: {
      connectBtn() {
        this.walletDialogVisible = true
      },
      handleClose(){
        this.walletDialogVisible = false
      },
      connectMetaMask() {
        ethereum.request({ method: 'eth_requestAccounts' });
        this.walletDialogVisible = false
      },
      copyAccount() {
        if (!this.account) return;
        document.getElementsByClassName("copytxt")[0].value = this.account;
        var url = document.getElementsByClassName("copytxt")[0];
        url.select();
        document.execCommand("Copy");
        this.$notify({
          title: 'Success',
          message: 'Account address copied',
          duration: 1200,
          type: 'success'
        });
      },
    },
  };
</script>

<style lang="scss">
  body * {
    box-sizing: border-box;
  }

  .page {

    .el-header,
    .el-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 360px;
      background-color: #0D0826;
      color: #FFFFFF;
    }

    .el-header {
      height: 80px!important;

      .logoBox {
        display: flex;
        align-items: center;

        .logo {
          width: 196px;
        }

        .badge {
          margin-left: 20px;
          width: 130px;
          height: 29px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #443A79;
          border-radius: 15px;
          font-size: 11px;
          font-weight: 500;
          color: #BDB0FF;
        }

      }

      .btnBox {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          height: 40px;
          background: linear-gradient(90deg, #DD32BA 0%, #6150F2 100%);
          box-shadow: 1px 1px 2px 0px rgba(189, 29, 164, 0.5), 0px 2px 4px 0px rgba(0, 0, 0, 0.5), 0px 1px 3px 0px rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          padding: 0 20px;
        .logo {
          width: 20px;
        }
        .accountTxt {
          margin-left: 6px;
          font-size: 12px;
          cursor: pointer;
        }
        .copytxt {
          position: absolute;
          top: 0;
          left: -10000px;
        }
        .connectBtn {
          background: transparent;
          color: #FFFFFF;

        }
      }
    }

    .el-footer {
      height: 100px;

      .rightsTxt {
        font-size: 9px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
      }

      .linksBox {
        display: flex;
        align-items: center;

        img {
          width: 22px;
          margin-right: 20px;
        }
      }
    }

    .el-main {
      background-color: #1d1543;
      color: #FFFFFF;
    }
    .popup {
      .walletProvider {
        margin: 25px auto;
        padding: 30px 40px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 487px;
        height: 100px;
        background: rgba(80, 73, 136, 0.5);
        border-radius: 20px;
        .el-button {
          background: transparent;
        }
        .provider_info {
          display: flex;
          align-items: center;
          .provider_info_img {
            width: 37px;
          }
          .provider_info_name {
            margin-left: 20px;
            font-size: 20px;
            font-weight: 500;
            color: #FFFFFF;
          }
        }
        .connectWalletBtn {
          width: 160px;
          height: 56px;
          border-radius: 35px;
          border: 2px solid #C539C6!important;
          font-size: 20px;
          font-weight: 500;
          color: #C539C6;
        }
      }
    }
  }
</style>
