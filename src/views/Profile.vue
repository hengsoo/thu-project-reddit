<template>
  <div class="container p-5 mx-auto flex flex-col items-center divide-y divide-teal-500">

    <div class="text-left md:mr-20 w-full flex items-baseline max-w-lg">
      <h2 class="font-bold text-3xl mr-2">{{ nickname }}</h2>
      <p>@{{ username }}</p>
    </div>

    <div class="md:mr-20 w-full max-w-lg pt-2">
      <div class="w-full md:mr-20 max-w-lg">
        <PostForm/>
      </div>

      <InfiniteScroll route-name="Profile" :user-id="userId" ref="profile-post-board"/>
    </div>

  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'
import PostForm from '@/components/PostForm'
import { EventBus } from '@/helpers/EventBus'

export default {
  name: 'Profile',
  components: {
    InfiniteScroll,
    PostForm
  },
  computed: {
    nickname () {
      return this.$store.state.userData.nickname
    },
    username () {
      return this.$store.state.userData.username
    },
    userId () {
      return this.$store.state.userData.id
    }
  },
  methods: {
    refreshPostBoard () {
      this.$refs['profile-post-board'].refreshPostBoard()
    }
  },
  beforeMount () {
    EventBus.$on('update-post-board', this.refreshPostBoard)
  }
}
</script>
