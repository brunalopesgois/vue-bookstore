<template>
    <div class="shaded-section">
      <slot></slot>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.shaded-section {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  padding: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
