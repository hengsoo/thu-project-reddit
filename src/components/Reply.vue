<template>

  <div>

    <div v-for="reply in replies" class="py-1">

      <!--   Reply's info   -->
      <div class="inline-flex text-sm text-gray-700">
        <p v-text="reply.nickname" class="mr-2 hover:underline cursor-pointer"
           @click="$router.push('/user/'+ reply.userId ).catch(err => {})"></p>
        <p v-text="reply.datetime"></p>
      </div>

      <div v-html="reply.content"></div>
      <p class="text-blue-500 text-sm font-semibold cursor-pointer"
         @click="launchReplyEditor(reply.id)">
        Reply
      </p>

      <Reply v-if="reply.children.length > 0" :replies="reply.children" class="pl-5 border-l-2"/>

    </div>
  </div>

</template>

<script>

import Editor from '@/components/WysiwygEditor'

export default {
  name: 'Reply',

  components: {
    Editor
  },

  data () {
    return {}
  },

  props: {
    replies: {
      type: Array,
      required: true
    }
  },

  methods: {
    launchReplyEditor (replyId) {
      this.$swal({
        title: '<strong>HTML <u>example</u></strong>',
        html: `
          <Editor></Editor>
        `,
        showConfirmButton: true,
        focusConfirm: false,
        reverseButtons: true,
        showCancelButton: true,
      })
    }
  },

}
</script>

<style scoped>

</style>
