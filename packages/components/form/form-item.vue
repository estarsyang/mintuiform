<template>
  <div class="mint-form-item" :class="[{'is-error': validateState === 'error'}]">
    <div class="mint-form-item__label" v-if="label">{{label}}</div>
    <div class="mint-form-item-content">
      <slot></slot>
      <transition name="mint-zoom-in-top">
        <slot v-if="validateState === 'error'" name="error" :error="validateMessage">
          <div class="mint-form-item__error">{{validateMessage}}</div>
        </slot>
      </transition>
    </div>
  </div>
</template>


<script>
import AsyncValidator from "async-validator";
import objectAssign from "../../utils/merge";
import { getPropByPath } from "../../utils/util";
import emitter from "../../mixins/emitter";
export default {
  name: "mintFormItem",
  componentName: "mintFormItem",
  mixins: [emitter],
  props: {
    prop: String,
    error: String,
    required: {
      type: Boolean,
      default: undefined,
    },
    label: String,
  },

  data() {
    return {
      validateMessage: "",
      validateState: "",
    };
  },
  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value;
        this.validateState = value ? "error" : "";
      },
    },
  },
  computed: {
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== "mintForm") {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
    fieldValue() {
      const model = this.form.model;
      if (!model || !this.prop) {
        return;
      }

      let path = this.prop;
      if (path.indexOf(":") !== -1) {
        path = path.replace(/:/, ".");
      }
      return getPropByPath(model, path, true).v;
    },
    isRequired() {
      let rules = this.getRules();
      let isRequired = false;

      if (rules && rules.length) {
        rules.every((rule) => {
          if (rule.required) {
            isRequired = true;
            return false;
          }
          return true;
        });
      }
      return isRequired;
    },
  },
  methods: {
    validate(trigger, callback = () => {}) {
      this.validateDisabled = false;
      const rules = this.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback();
        return true;
      }

      this.validateState = "validating";

      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach((rule) => {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[this.prop] = this.fieldValue;
      validator.validate(
        model,
        { firstFields: true },
        (errors, invalidFields) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";

          callback(this.validateMessage, invalidFields);
          this.elForm &&
            this.elForm.$emit(
              "validate",
              this.prop,
              !errors,
              this.validateMessage || null
            );
        }
      );
    },
    clearValidate() {
      this.validateState = "";
      this.validateMessage = "";
      this.validateDisabled = false;
    },
    resetField() {
      this.validateState = "";
      this.validateMessage = "";

      let model = this.form.model;
      let value = this.fieldValue;
      let path = this.prop;
      if (path.indexOf(":") !== -1) {
        path = path.replace(/:/, ".");
      }

      let prop = getPropByPath(model, path, true);

      this.validateDisabled = true;
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue);
      } else {
        prop.o[prop.k] = this.initialValue;
      }

      // reset validateDisabled after onFieldChange triggered
      this.$nextTick(() => {
        this.validateDisabled = false;
      });
    },
    getRules() {
      let formRules = this.form.rules;
      const selfRules = this.rules;
      const requiredRule =
        this.required !== undefined ? { required: !!this.required } : [];

      const prop = getPropByPath(formRules, this.prop || "");
      formRules = formRules ? prop.o[this.prop || ""] || prop.v : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();

      return rules
        .filter((rule) => {
          if (!rule.trigger || trigger === "") return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1;
          } else {
            return rule.trigger === trigger;
          }
        })
        .map((rule) => objectAssign({}, rule));
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }

      this.validate("change");
    },
    addValidateEvents() {
      const rules = this.getRules();

      if (rules.length || this.required !== undefined) {
        this.$on("mint.form.blur", this.onFieldBlur);
        this.$on("mint.form.change", this.onFieldChange);
      }
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch("mintForm", "mint.form.addField", [this]);

      let initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, "initialValue", {
        value: initialValue,
      });

      this.addValidateEvents();
    }
  },
  beforeDestroy() {
    this.dispatch("mintForm", "mint.form.removeField", [this]);
  },
};
</script>