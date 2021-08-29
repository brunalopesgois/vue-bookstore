<template>
  <b-alert
    :show="show"
    class="position-fixed fixed-top m-0 rounded-0"
    style="z-index: 2000;"
    fade
    :variant="variant"
  >
    <slot></slot>
  </b-alert>
</template>

<script>
import { BAlert } from 'bootstrap-vue';
export default {
  components: {
    'b-alert': BAlert
  },
  props: ['show', 'variant']
}
</script>

<style>

</style>
