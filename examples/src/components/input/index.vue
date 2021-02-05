<template>
  <div>
    <mt-field ref="input" v-bind="$attrs" v-on="$listeners" @change="handChange" />
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";
export default {
  name: "mint-input",
  mixins: [emitter],
  methods: {
    injectionInputFn() {
      this.$nextTick(() => {
        const inputInstance = this.$refs.input;
        const inputInstanceDom = inputInstance.$refs.input;
        const that = this;
        inputInstanceDom.onblur = function (event) {
          inputInstance.$emit("blur", event);
          that.dispatch("mintFormItem", "mint.form.blur", [this.value]);
        };
      });
    },
    handChange(val) {
      this.dispatch("mintFormItem", "mint.form.change", [val]);
    },
  },
  mounted() {
    this.injectionInputFn();
  },
};
</script>