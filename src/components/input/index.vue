<template>
  <div>
    <mt-field label="用户名" placeholder="请输入用户名" v-bind="$attrs" v-on="$listeners"></mt-field>
  </div>
</template>

<script>
export default {
  name: 'mintInput',
}
</script>