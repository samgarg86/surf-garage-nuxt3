<template>
  <div>
    <template v-for="(item, i) in contentMap" :key="i">
      <RichTextHeading
        v-if="item.type === 'heading'"
        class="mt-3 mb-2"
        :format="item.format"
        :text="item.content"
      />
      <RichTextParagraph
        v-if="item.type == 'text'"
        class="mb-2"
        :content="item.content"
      />
      <Image
        v-if="item.type == 'image'"
        class="mb-2 lg:mb-4 mx-auto"
        :src="`${item.content}?w=800&fm=webp`"
      />
      <video
        v-if="item.type == 'video'"
        class="mb-2 lg:mb-4 w-full max-w-[60rem] mx-auto"
        controls
      >
        <source :src="item.content" :type="item.format" />
      </video>
      <Gallery
        v-if="item.type == 'gallery'"
        class="mb-2 lg:mb-4"
        :images="mapImages(item.content)"
        :width="600"
        fillHeight
      />
    </template>
    <!--    <pre>{{content}}</pre>-->
  </div>
</template>
<script setup>
const { mapImages } = useImages();
const props = defineProps({
  content: Array
});

const contentMap = props.content?.map(
  ({ content, nodeType, data: { target } }) => {
    switch (true) {
      case nodeType === 'paragraph':
        return {
          type: 'text',
          content
        };
      case nodeType.startsWith('heading-'):
        return {
          type: 'heading',
          format: nodeType,
          content: content[0].value
        };
      case nodeType === 'embedded-asset-block' &&
        target.fields.file.url.startsWith('//images'):
        return {
          type: 'image',
          content: target.fields.file.url
        };
      case nodeType === 'embedded-asset-block' &&
        target.fields.file.url.startsWith('//videos'):
        return {
          type: 'video',
          format: target.fields.file.contentType,
          content: target.fields.file.url
        };
      case nodeType === 'embedded-entry-block' &&
        target.sys?.contentType.sys.id === 'contentGallery':
        return {
          type: 'gallery',
          content: target.fields.images
        };
      default:
        return {
          type: 'unsupported',
          value: ''
        };
    }
  }
);
</script>
