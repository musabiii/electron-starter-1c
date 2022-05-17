<template>
  <div>
    <button @click="handleClick">btn</button>

    <div class="tabs">
      <div v-for="item in tabs" :key="item">
        {{ item }}
      </div>
    </div>

    <!-- <div v-for="item in list" :key="item.ID">
      {{ item.name }}
    </div> -->
    <base-list :list="list[currentTab]" />
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import baseList from "./components/BaseList.vue";
// import lodash from 'lodash';
import * as _ from "lodash";
// console.log("top arra", array);
const testarr = [
  { id: 1, name: "musa" },
  { id: 2, name: "musa" },
  { id: 3, name: "musa1" },
  { id: 4, name: "musa1" },
];
console.log("keyBy", _.keyBy(testarr, "name"));
export default {
  components: {
    baseList,
  },
  name: "App",
  data() {
    return {
      list: [],
      tabs: [],
      currentTab: "/",
    };
  },
  methods: {
    handleClick() {
      ipcRenderer.send("someevent");
    },
    groupByFolder(arr) {
      var map = arr.reduce((r, i) => {
        r[i.Folder] = r[i.Folder] || [];
        r[i.Folder].push(i);
        return r;
      }, {});
      var arr1 = [];
      for (var key in map) {
        arr1.push(map[key]);
      }
      return arr1;
    },
  },
  beforeCreate() {
    ipcRenderer.on("mount", (e, args) => {
      console.log("mount", args);
      const filterArgs = args.filter((el) => !!el.WA);
      console.log("grouped", this.groupByFolder(filterArgs));
      // this.tabs = this.groupByFolder(filterArgs);
      const groupedObj =  _.groupBy(filterArgs, "Folder");
      this.list = groupedObj;

      console.log(
        "lodash groupBy",
        groupedObj
      );

      this.tabs = Object.keys(groupedObj);
    });
    ipcRenderer.on("log", (e, args) => {
      console.log("log from back: ", args);
    });


  },
  mounted() {
    ipcRenderer.send("getList");
  },
};
</script>

<style>
.tabs {
  display: flex;
  justify-content: space-around;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
