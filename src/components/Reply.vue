<template>
  <div>
    <div v-for="reply in replies">
      <div>
        <div v-html="reply.content"></div>
        <Reply v-if="reply.children.length > 0" :replies="reply.children" class="pl-5 border-l-2"/>
      </div>
    </div>
  </div>
</template>

<script>

const xss = require('xss')

export default {
  name: 'Reply',
  props: {
    replies: {
      type: Array,
      required: true
    }
  },

}
</script>

<style scoped>

</style>
