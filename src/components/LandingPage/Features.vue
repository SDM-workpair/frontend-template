<template>
  <section class="bg-bookmark-purple py-20 mt-20 pb-60 lg:mt-60">
    <!-- Heading-->
    <div class="sm:w-3/4 lg:w-5/12 mx-auto px-2">
      <h1 class="text-4xl text-center text-bookmark-white">{{ $t('room.logintitle1') }}</h1>
      <h1 class="text-4xl text-center text-bookmark-white">{{ $t('room.logintitle2') }}</h1>
      <p class="text-center text-bookmark-grey mt-4"></p>
    </div>
    <!-- Feature #1-->
    <div class="relative mt-20 lg:mt-24">
      <div class="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
        <!-- Feature #1-->
        <div class="flex flex-1 justify-center z-10 mb-10 lg:mb-0">
          <img src="@/assets/images/flag.png" alt="" class="w-5/6 h-5/6 sm:w-3/4 sm:3/4 md:w-full md:h-full rounded-md">
        </div>
        <!-- Content-->
        <div class="flex flex-1 flex-col items-center lg:items-start">
          <h1 class="text-3xl text-bookmark-white">{{ $t('room.logintitle3') }}</h1>
          <p class="text-bookmark-white my-4 text-center lg:text-left sm:w-5 lg:w-full">{{ $t('room.loginmsg1') }}</p>
          <p class="text-bookmark-white my-4 text-center lg:text-left sm:w-5 lg:w-full">{{ $t('room.loginmsg2') }}</p>
          <p class="text-bookmark-white my-4 text-center lg:text-left sm:w-5 lg:w-full">{{ $t('room.loginmsg3') }}</p>
        </div>
      </div>
      <!-- Rounded rectangle -->
      <div
        class="
                    hidden
                    lg:block
                    overflow-hidden
                    bg-bookmark-dark
                    rounded-r-full
                    absolute
                    h-80
                    w-2/4
                    -bottom-24
                    -left-36
                ">
      </div>
    </div>

  </section>
</template>

<script>
    export default {

    }
</script>
