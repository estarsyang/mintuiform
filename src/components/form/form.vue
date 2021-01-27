<template>
  <div class="mint-form">
    <slot></slot>
  </div>
</template>

<script>
// import objectAssign from "@/utils/merge";
export default {
  name: 'mintForm',
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>

</style>