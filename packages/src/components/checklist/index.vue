<template>
  <div>
    <mt-checklist v-bind="$attrs" v-on="$listeners" @change="handChange"></mt-checklist>
  </div>
</template>

<script>
import emitter from "../../mixins/emitter";
export default {
  name: "mt-form-checklist",
  mixins: [emitter],
  methods: {
    handChange(val) {
      this.$emit("change", val);
      this.dispatch("mintFormItem", "mint.form.change", [val]);
    },
  },
};
</script>