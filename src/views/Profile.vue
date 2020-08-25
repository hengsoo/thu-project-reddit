<template>
  <div class="container p-5 mx-auto flex flex-col items-center">
    <InfiniteScroll route-name="Profile" :user-id="userData.id"/>
  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'

export default {
  name: 'Profile',
  components: { InfiniteScroll },

  props: {
    userData: {
      type: Object,
      required: true
    }
  }
}
</script>
