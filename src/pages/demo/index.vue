<template>
  <div>
    <mt-form>
      <mt-form-item>
        <mt-input v-model="form.name" />
      </mt-form-item>
    </mt-form>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      form: {
        name: '',
        gender: '',
        age: '',
        like: [],
      },
    }
  }
}
</script>