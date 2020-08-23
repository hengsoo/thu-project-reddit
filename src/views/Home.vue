<template>
  <div class="container mx-auto">
    <h2 @click="test">This is home page</h2>
  </div>

</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    test () {
      this.$http.defaults.headers.common['Authorization'] = 'aaaa';
      this.$http.get('/api/v1/user').then(
        response => console.log(response.data)
      ).catch(err => console.error('Error', err))
    }
  }
}
</script>
