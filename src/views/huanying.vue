<template>
  <div class="huanyin">
      欢迎
  </div>
</template>

<script>
export default {
  
 mounted () {
   let id =localStorage.getItem('userId')
   this.$emit('quId',id)
 }
}
</script>

<style>

</style>