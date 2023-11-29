<template>
  <p class="text-2 font-avenir text-justify ">
<!--    <pre>{{content}}</pre>-->
    <template v-for="(node, i) in content" :key="i">
      <span v-if="node.nodeType === 'text' && node.value"
            class="whitespace-pre-wrap"
            :class="node.marks.map(mapMark).join(' ')">
        {{node.value}}
      </span>
      <a v-if="node.nodeType === 'hyperlink'"
         :href="node.data.uri.includes('https://') ? node.data.uri : localePath(node.data.uri)" :target="node.data.uri.includes('https://') ? '_blank' : ''"
         class="underline inline-block">{{node.content[0].value}}</a>
    </template>
  </p>
</template>
<script setup>
const localePath = useLocalePath()
defineProps({
  content: Array
})
const mapMark = (mark) => {
  switch (mark.type) {
    case 'bold': return 'font-bold'
    case 'italic': return 'italic'
    case 'underline': return 'underline'
    default: return mark.type
  }
}
</script>
