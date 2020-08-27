import { EventBus } from '@/helpers/EventBus'

let SubmitReplyMixin = {

  computed:{
    authUserId (){
      return this.$store.state.userData.id
    }
  },

  methods: {
    findReplyEditor (replyId, edit = false) {

      const reference = edit === true ? 'reply-edit-editor-' : 'reply-editor-'

      let replyEditor = this.$refs[reference + replyId]

      if (!Array.isArray(replyEditor)) {
        replyEditor = [replyEditor]
      }

      return replyEditor[0]
    },

    findReplyContent (replyId) {
      let replyContent = this.$refs['reply-content-' + replyId]

      if (!Array.isArray(replyContent)) {
        replyContent = [replyContent]
      }

      return replyContent[0]
    },

    submitReply (postId, replyId, edit = false) {

      const replyEditor = this.findReplyEditor(replyId, edit)

      const content = replyEditor.editor.getHTML()

      let url = '/api/v1/post/' + postId + '/reply'
      let submitMethod = this.$http.post

      if (edit === true) {
        url += '/' + replyId
        submitMethod = this.$http.put
      }

      submitMethod(url, {
        replyId: replyId,
        content: content
      })
        .then(res => {
          EventBus.$emit('post-update-reply')
          this.toggleEditorState(replyId, edit)
        })
        .catch(error => console.error('Submit Reply Failed: ', error))
    },

    toggleEditorState (replyId, edit = false) {
      const replyEditor = this.findReplyEditor(replyId, edit)
      replyEditor.$el.classList.toggle('hidden')

      if (edit === true) {
        const replyContent = this.findReplyContent(replyId)
        replyContent.classList.toggle('hidden')
      } else {
        replyEditor.editor.clearContent()
      }

    },
  }
}

export default SubmitReplyMixin
