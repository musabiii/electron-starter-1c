<template>
  <div>

    <div class="tabs">
      <div v-for="tab in tabs" :key="tab" :class="{active:tab===currentTab}" class="tab">
        <h3 @click="handleTabClick(tab)">
        {{ tab }}
        </h3>
      </div>
    </div>

    <!-- <div v-for="item in list" :key="item.ID">
      {{ item.name }}
    </div> -->
    <base-list :list="list[currentTab]" class="list"/>
    <button @click="handleClick">btn</button>
    <button @click="showList">show list</button>
  </div>
</template>

<script>
// import { ipcRenderer } from "electron";
import baseList from "./components/BaseList.vue";
// import * as _ from "lodash";
// const testarr = [
//   { id: 1, name: "musa" },
//   { id: 2, name: "musa" },
//   { id: 3, name: "musa1" },
//   { id: 4, name: "musa1" },
// ];
// console.log("keyBy", _.keyBy(testarr, "name"));
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
    showList() {
      console.log("list[currentTab]",this.list[this.currentTab])
      console.log("list",this.list)
      console.log("this.currentTab",this.currentTab);
    },
    handleClick() {
      // ipcRenderer.send("someevent");
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
    handleTabClick(tab) {
      console.log(tab)
      this.currentTab = tab;
    }
  },
  beforeCreate() {
    // ipcRenderer.on("mount", (e, args) => {

    //   console.log("mount", args);
    //   const filterArgs = args.filter((el) => !!el.WA);
    //   console.log("grouped", this.groupByFolder(filterArgs));
    //   // this.tabs = this.groupByFolder(filterArgs);
    //   const groupedObj =  _.groupBy(filterArgs, "Folder");
    //   this.list = groupedObj;

    //   console.log(
    //     "lodash groupBy",
    //     groupedObj
    //   );

    //   this.tabs = Object.keys(groupedObj);
    //   this.currentTab = this.tabs[0];
    // });
    // ipcRenderer.on("log", (e, args) => {
    //   console.log("log from back: ", args);
    // });


  },
  mounted() {
    // ipcRenderer.send("getList");
    console.log("list[currentTab]",this.list[this.currentTab])
  },
};
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.tabs {
  display: flex;
  justify-content: space-around;
  border:2px solid black;
}

.tab {
  border: 1px solid #eee;
  height: 100%;
  flex: 1 1 100%;
  cursor: pointer;
}

.tab.active {
  background-color: rgb(179, 234, 255);
}

.list {
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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
