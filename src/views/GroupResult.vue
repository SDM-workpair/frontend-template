<template>
  <div>
    這個是結果
{{ groupID }}
  </div>
</template>
<script>
    // import axios from 'axios'

    export default {
    name: 'GroupResult',
      data () {
        return {
        //   loading: true,
        //   show: [],
        //   groups: [],
          groupID: this.$route.query.groupID
        }
      }
        }
  </script>
