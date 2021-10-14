<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  margin: 0;
}

.el-button {
  border: none!important;
}
.el-button:focus, .el-button:hover {
  background-color: none!important;
}
.el-tooltip__popper.is-light {
  border: none!important;
}

@import 'styles/zcm-main.css';

</style>
