<template>
  <InfiniteScroll route-name="Profile" :user-id="userData.id"/>
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
