<template>
  <div>
    <mt-radio v-bind="$attrs" v-on="$listeners" @change="handChange"></mt-radio>
  </div>
</template>


<script>
import emitter from "@/mixins/emitter";
export default {
  name: "mt-form-radio",
  mixins: [emitter],
  methods: {
    handChange(val) {
      this.$emit("change", val);
      this.dispatch("mintFormItem", "mint.form.change", [val]);
    },
  },
};
</script>