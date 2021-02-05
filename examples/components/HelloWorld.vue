<template>
  <div>
    <mt-form :model="form" :rules="rules" ref="form">
      <mt-form-item prop="name" label="姓名">
        <mt-input v-model="form.name" />
      </mt-form-item>
      <mt-form-item prop="gender" label="性别">
        <mt-form-radio v-model="form.gender" :options="gender"></mt-form-radio>
      </mt-form-item>
      <mt-form-item prop="like" label="爱好">
        <mt-form-checklist v-model="form.like" :options="likes"></mt-form-checklist>
      </mt-form-item>
    </mt-form>
    <mt-button type="primary" @click="submit">提交</mt-button>
    <mt-button @click="resetForm">重置</mt-button>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      form: {
        name: "",
        gender: "",
        age: "",
        like: [],
      },
      gender: [
        {
          label: "男",
          value: "boy",
        },
        {
          label: "女",
          value: "girl",
        },
      ],
      likes: [
        {
          label: "吃",
          value: "eat",
        },
        {
          label: "喝",
          value: "drink",
        },
        {
          label: "玩",
          value: "play",
        },
        {
          label: "乐",
          value: "fun",
        },
      ],

      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        gender: [
          { required: true, message: "请选择用户性别", trigger: "change" },
        ],
        like: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个用户爱好",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((res) => {
        console.log(res);
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>