<template>

  <div class="container p-5 mx-auto flex flex-col items-center">

    <!-- Create Post Form  -->
    <div class="w-full md:mr-20 max-w-lg">
      <PostForm/>
    </div>
    <!--  Infinite Scroll of all posts  -->
    <InfiniteScroll route-name="Home" ref="post-board"/>
  </div>

</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'
import WysiwygEditor from '@/components/WysiwygEditor'
import { EventBus } from '@/helpers/EventBus'
import PostForm from '@/components/PostForm'

export default {
  name: 'Home',
  components: {
    PostForm,
    InfiniteScroll,
    WysiwygEditor
  },

  methods: {
    refreshPostBoard(){
      this.$refs['post-board'].refreshPostBoard()
    }
  },

  beforeMount () {
    EventBus.$on('update-post-board', this.refreshPostBoard)
  }
}

</script>

