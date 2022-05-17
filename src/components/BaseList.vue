<template>
  <div>
      <div v-for="item in list" :key="item.ID">
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

</style>