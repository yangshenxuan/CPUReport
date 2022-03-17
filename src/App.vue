<template>
  <div id="app">
     <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
html,
body {
  height: 100%;
  min-height: 800px;
  width: 100%;
  min-width: 1370px;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
