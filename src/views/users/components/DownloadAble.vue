<template>
  <div @click="download">
    <slot />
  </div>
</template>
<script>
import { downloadFile } from '@/views/users/utils'

export default {
  name: 'DownloadAble',
  props: {
    url: {
      type: String,
      default: () => ('')
    },
    name: {
      type: String,
      default: () => ('')
    }
  },
  data() {
    return {}
  },
  methods: {
    download() {
      downloadFile(this.url, this.name)
    }
  }
}
</script>
