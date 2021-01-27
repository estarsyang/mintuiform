<template>
  <div class="mint-form-item">
    <slot></slot>
    <transition name="el-zoom-in-top">
      <slot
        v-if="validateState === 'error'"
        name="error"
        :error="validateMessage"
      >
        <div
          class="el-form-item__error"
        >
          {{validateMessage}}
        </div>
      </slot>
    </transition>
  </div>
</template>


<script>
export default {
  name: 'mint-form-item',
  data() {
    return {
      validateMessage: '',
      validateState: ''
    }
  }
}
</script>

