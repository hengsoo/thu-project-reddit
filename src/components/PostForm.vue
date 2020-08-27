<template>
  <div class="md:mr-20">
    <label class="px-4 mt-2">
      <input type="text" v-model="postTitle" placeholder="Make a title!"
             class="font-bold text-xl focus:outline-none">
    </label>

    <WysiwygEditor class="w-full" ref="post-editor"
                   :placeholder="`What's on your mind, ${nickname}`">
      <div class="mt-1 pb-2 mx-2 flex justify-end" slot="footer">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-3 rounded
          focus:outline-none focus:shadow-outline" type="button"
          @click="submitPost(postTitle, postContent)">
          Done
        </button>
      </div>
    </WysiwygEditor>

  </div>
</template>

<script>
import { EventBus } from '@/helpers/EventBus'
import WysiwygEditor from '@/components/WysiwygEditor'

export default {
  name: 'CreatePostForm',

  components:{
    WysiwygEditor
  },

  data(){
    return {
      postTitle: ''
    }
  },

  computed:{
    nickname () {
      return this.$store.state.userData.nickname
    },

    postEditor() {
      return this.$refs['post-editor'].editor
    },

    postContent () {
      return this.postEditor.getHTML()
    }
  },

  methods: {
    submitPost (title, content, editPostId = null) {

      let url = '/api/v1/post'
      let submitMethod = this.$http.post

      if (editPostId !== null) {
        url += '/' + editPostId
        submitMethod = this.$http.put
      }

      submitMethod(url, {
        title: title,
        content: content
      })
        .then(res => {

          if (editPostId !== null) {
            EventBus.$emit('post-update-details')
          } else {
            EventBus.$emit('update-post-board')
          }

          this.postEditor.clearContent()
          this.postTitle = ''
        })
        .catch(error => console.error('Submit Post Failed: ', error))
    }
  }
}
</script>

