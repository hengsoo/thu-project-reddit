<template>
  <div class="container p-5 mx-auto flex flex-col items-center divide-y divide-teal-500">

    <div class="justify-center w-full flex items-baseline max-w-lg">
      <h2 class="font-bold text-3xl mr-2">{{ nickname }}</h2>
      <p>@{{ username }}</p>
    </div>

    <div class="w-full inline-flex justify-center">
      <div class="w-3/4 max-w-lg pt-2 mx-5">
        <div class="w-full md:mr-20 max-w-lg">
          <PostForm/>
        </div>
        <InfiniteScroll route-name="Profile" :user-id="userId" ref="profile-post-board"/>
      </div>

      <div class="w-1/4 mt-2">
        <div class="bg-white rounded shadow-md mb-4 p-2">
          <h2>Favourite</h2>
          <p v-if="favourites.length === 0">No record</p>
          <div v-else class="divide-y flex flex-col">
            <div v-for="favourite in favourites">
              <a @click="$router.push(favourite.path)" class="my-1 cursor-pointer"> {{ favourite.title }} </a>
            </div>
          </div>
        </div>

        <div class="bg-white rounded shadow-md mb-4 p-2">
          <h2>History</h2>
          <p v-if="histories.length === 0">No record</p>
          <div v-else class="divide-y flex flex-col">
            <div v-for="history in histories">
              <a @click="$router.push(history.path)" class="my-1 cursor-pointer"> {{ history.title }} </a>
            </div>
          </div>
        </div>
      </div>
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
    },
    histories () {
      let histories = JSON.parse(this.$cookie.get('user-history'))
      return histories === null ? [] : histories
    },
    favourites () {
      let favourites = JSON.parse(this.$cookie.get('user-favourite'))
      return favourites === null ? [] : favourites
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
