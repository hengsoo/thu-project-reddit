<template>
  <infinite-scroll route-name="UserDetails" :user-id="Number($route.params.id)"/>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'
export default {
name: "UserDetails",
  components: { InfiniteScroll }
}
</script>
