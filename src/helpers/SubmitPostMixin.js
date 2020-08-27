import { EventBus } from '@/helpers/EventBus'

let SubmitPostMixin = {

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

        })
        .catch(error => console.error('Submit Post Failed: ', error))
    }
  }

}

export default SubmitPostMixin
