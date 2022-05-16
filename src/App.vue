<template>
<div>
  <button @click="handleClick">
    btn
  </button>
  </div>
</template>

<script>

import {ipcRenderer} from 'electron';

export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {
    handleClick() {
      ipcRenderer.send('someevent');
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
