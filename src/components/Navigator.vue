<template>

  <nav class="bg-teal-500 px-3 pt-3 pb-2">

    <div class="container mx-auto sm:px-10 flex items-baseline justify-between flex-wrap ">
      <!--   Title   -->
      <div class="flex items-center flex-shrink-0 text-white mr-6 ml-3 cursor-pointer"
           @click="$router.replace('/').catch(err =>{})">
        <span class="font-semibold text-3xl tracking-tight">Tokok</span>
      </div>

      <!--  Show Menu Icon   -->
      <div class="block md:hidden" v-if="isAuth">
        <button @click="showMenu = !showMenu"
                class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>

      <!--   Menu Contents   -->
      <div class="w-full md:flex flex-grow md:items-center md:w-auto"
           v-bind:class='{block: showMenu, hidden: !showMenu}'>

        <div class="text-sm flex-grow ml-4 md:ml-0" v-bind:class='{hidden: !isAuth}'>
          <slot></slot>
        </div>

        <div class="ml-4 md:ml-0 items-center  pb-2" :class='{flex: isAuth, hidden: !isAuth}'>
          <slot name="button"></slot>
        </div>

      </div>
    </div>

  </nav>

</template>

<script>
export default {
  name: 'Navigator',
  data () {
    return {
      showMenu: false,
    }
  },
  computed:{
    isAuth (){
      return this.$store.state.isAuth
    }
  }
}
</script>
