<template>
  <p class="text-1.8 md:text-2 font-avenir">
<!--    <pre>{{content}}</pre>-->
    <template v-for="(node, i) in content" :key="i">
      <span v-if="node.nodeType === 'text' && node.value">{{node.value}}</span>
      <a v-if="node.nodeType === 'hyperlink'" :href="node.data.uri" target="_blank" class="underline">{{node.content[0].value}}</a>
    </template>
  </p>
</template>
<script setup>
defineProps({
  content: Array
})
</script>
