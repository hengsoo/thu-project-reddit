<template>

  <div>

    <div v-for="reply in replies" v-if="(reply.userId === postUserId || !showAuthorCommentOnly)" class="py-1">

      <!--   Reply's info   -->
      <div class="inline-flex justify-between w-full">
        <div class="inline-flex text-sm text-gray-700">
          <p v-text="reply.nickname" class="mr-2 hover:underline cursor-pointer"
             @click="$router.push(
               { path: `/user/${reply.userId}`,query:{username: reply.username}}).catch(err => {})"></p>
          <p v-text="reply.datetime.fromNow()"></p>
        </div>
        <font-awesome-icon icon="edit" class="text-gray-400 cursor-pointer"
                           @click="toggleEditorState(reply.id, true)" v-if="reply.userId === authUserId"/>
      </div>


      <div v-html="reply.content" class="overflow-x-auto" :ref="'reply-content-' + reply.id"></div>

      <WysiwygEditor class="w-full hidden" :ref="'reply-edit-editor-' + reply.id"
                     :initial-content="reply.content" v-if="reply.userId === authUserId">
        <div class="mt-1 pb-2 mx-2 flex justify-end" slot="footer">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-3 rounded
          focus:outline-none focus:shadow-outline" type="button"
            @click="submitReply(reply.postId, reply.id, true)">
            Done
          </button>
        </div>
      </WysiwygEditor>

      <p class="text-blue-500 text-sm font-semibold cursor-pointer"
         @click="toggleEditorState(reply.id)">
        Reply
      </p>

      <WysiwygEditor class="w-full hidden" :ref="'reply-editor-' + reply.id"
                     placeholder="Write a reply...">
        <div class="mt-1 pb-2 mx-2 flex justify-end" slot="footer">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-3 rounded
          focus:outline-none focus:shadow-outline" type="button"
            @click="submitReply(reply.postId, reply.id)">
            Reply
          </button>
        </div>
      </WysiwygEditor>

      <Reply v-if="reply.children.length > 0" :replies="reply.children" :post-user-id="postUserId"
             :show-author-comment-only="showAuthorCommentOnly" class="pl-5 border-l-2"/>

    </div>
  </div>

</template>

<script>

import WysiwygEditor from '@/components/WysiwygEditor'
import SubmitReplyMixin from '@/helpers/SubmitReplyMixin'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit)

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
    },
    postUserId:{
      type: Number,
      required: true
    },
    showAuthorCommentOnly:{
      type: Boolean,
      default: false
    }
  },

  mixins: [SubmitReplyMixin]

}
</script>

<style scoped>

</style>
