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
         @click="toggleEditorState(reply.id)">
        Reply
      </p>

      <WysiwygEditor class="w-full hidden" :id="'reply-editor' + reply.id"
                     placeholder="Write a reply...">
        <div class="mt-1 pb-2 mx-2 flex justify-end" slot="footer">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-3 rounded
            focus:outline-none focus:shadow-outline" type="button">
            Reply
          </button>
        </div>
      </WysiwygEditor>

      <Reply v-if="reply.children.length > 0" :replies="reply.children" class="pl-5 border-l-2"/>

    </div>
  </div>

</template>

<script>

import WysiwygEditor from '@/components/WysiwygEditor'

export default {
  name: 'Reply',

  components: {
    WysiwygEditor
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
    toggleEditorState (replyId) {
      document.getElementById('reply-editor' + replyId).classList.toggle('hidden')
    },
  },

}
</script>

<style scoped>

</style>
