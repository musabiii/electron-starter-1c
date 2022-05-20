<template>
  <div>
      <div v-for="item in list" :key="item.ID" class="list-item">
          {{ item.name }}
      </div>
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type:Array,
            default:()=>[]
        }
    },

}
</script>

<style>

.list-item {
  border:1px solid #696969;
  margin: 10px;
  width: 50%;
  text-align: center;
  cursor: pointer;
}

</style>