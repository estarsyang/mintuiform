<template>
  <div class="mint-input" :class="{disabled: disabled, [`mint-input-${type}`]: true}">
    <div class="input-left">
      <div class="label" v-if="label">{{label}}</div>
      <div class="input">
        <mt-field
          ref="input"
          placeholder-class="placeholderStyle"
          @blur="handleBlur"
          :type="inputType"
          v-bind="$attrs"
          v-on="$listeners"
          @change="handChange"
        />
      </div>
    </div>
    <img v-if="type=='vimg'" class="img" :src="src" @click="hanldeRefreshVimg" />
    <mt-button type="primary" v-if="type=='vcode' && !vcodetime" class="btn-getcode" @click="handleGetvcode" :disabled="disabled">{{vcodeBtnText}}</mt-button>
    <mt-button v-if="type=='vcode' && vcodetime" class="btn-getcode" disabled>{{vcodetime}} 秒后重新获取</mt-button>
    <span v-if="type=='picker'" class="span" @click="hanldeShowPicker">{{span}}</span>
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";
export default {
  name: "mintInput",
  componentName: "mintInput",
  mixins: [emitter],
  props: {
    type: {
      type: String,
      value: "normal", // 不存在此属性时
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    label: {
      type: String,
      value: "", // 不存在此属性时
    },
    span: {
      type: String,
      value: "选择", // 不存在此属性时
    },
    src: {
      type: String,
      value: "", // 不存在此属性时
    },
    valueType: {
      type: String,
      value: "span", // 不存在此属性时
    },
    maxlength: {
      type: Number,
      value: 100,
    },
    vcodeDuration: {
      type: Number,
      value: 60,
    },
    vcodeBtnText: {
      type: String,
      value: "获取短信验证码",
    },
  },
  computed: {
    inputType() {
      return ["vimg", "vcode", "picker"].includes(this.type)
        ? "text"
        : this.type;
    },
  },
  data() {
    return {
      // 这里是一些组件内部数据
      inputValue: "",
      vcodetime: 0,
      isFocus: false,
    };
  },
  methods: {
    // 这里是一个自定义方法
    handleGetvcode() {
      this.$emit("getvcode");
      this.countVcodetime();
    },
    hanldeRefreshVimg() {
      this.$emit("refreshVimg");
    },
    hanldeShowPicker() {
      this.$emit("showPicker");
    },
    // 清除按钮
    tapClearIcon() {
      this.$emit("input", "");
    },
    countVcodetime() {
      let vcodetime = this.vcodeDuration;
      this.vcodetime = vcodetime;
      this.vcodeTimer = setInterval(() => {
        if (vcodetime) {
          vcodetime--;
        } else {
          clearInterval(this.vcodeTimer);
          this.vcodeTimer = null;
        }
        this.vcodetime = vcodetime;
      }, 1000);
    },
    resetCount() {
      clearInterval(this.vcodeTimer);
      this.vcodetime = null;
    },
    handChange(val) {
      this.dispatch("mintFormItem", "mint.form.change", [val]);
    },
    handleBlur(value) {
      console.log(value);
    },
    injectionInputFn() {
      this.$nextTick(() => {
        const inputInstance = this.$refs.input;
        const inputInstanceDom = inputInstance.$refs.input;
        inputInstance.mixins = [emitter];
        console.log(inputInstance.mixins);
        inputInstanceDom.onblur = function (event) {
          inputInstance.$emit("blur", event);

          inputInstance.dispatch("ElFormItem", "el.form.blur", [this.value]);
        };
      });
    },
  },
  created() {
    this.injectionInputFn();
  },
};
</script>

<style lang="scss" scoped>
  .mint-input {
    margin-top: 20px;
    display: flex;
    padding-bottom: 10px;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
  }
  .mint-input.disabled {
    color: #808080;
  }
  .mint-input .input-left {
    flex: 1;
  }
  .mint-input .input {
    display: flex;
  }
  .mint-input .placeholderStyle {
    font-size: 14px;
    color: #ccc;
  }
  .mint-input .input input {
    flex: 1;
  }
  .mint-input .label {
    font-size: 16px;
    margin-bottom: 9px;
  }
  .mint-input .img {
    display: inline-block;
    width: 115px;
    height: 45px;
    border: 1px solid #ebebeb;
  }
  .mint-input .btn-getcode {
    display: inline-block;
    margin-left: 25px;
    font-size: 15px;
    white-space: nowrap;
    background: #4293f4;
    color: #fff;
  }

  .mint-input-picker {
    align-items: flex-end;
  }
  .mint-input .span {
    color: #4293f4;
  }
  ::v-deep .mint-cell {
    width: 100%;
    min-height: unset;
    border-bottom: none;
  }
  ::v-deep .mint-cell-wrapper {
    padding: 0;
  }
</style>
