<template>
  <div class="min-h-screen bg-grey-30 p-8">
    <h1 class="font-primary text-2xl mb-6 text-center uppercase tracking-widest">Mockup Generator</h1>

    <div class="flex justify-center mb-10">
      <input
        type="file"
        accept="image/*"
        class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white cursor-pointer"
        @change="onFileSelected"
      />
    </div>

    <template v-if="imageUrl">
      <!-- Frame view -->
      <div class="bg-grey-30 px-2 py-6 md:px-5 md:py-10 mb-10">
        <div class="image-frame image-frame__pdp max-w-[50rem] mx-auto">
          <img
            :src="imageUrl"
            alt="Mockup frame view"
            class="bg-white mx-auto border-[2rem] border-white w-full"
          />
        </div>
      </div>

      <!-- Living room view -->
      <div class="relative mb-10 max-w-[50rem] mx-auto aspect-[4/5]">
        <img
          src="/Sofa-wall-surf-boards.jpg"
          alt="Living room"
          class="w-full object-cover"
        />
        <div class="absolute bottom-[50%] left-1/2 -translate-x-1/2 ">
          <div class="image-frame image-frame__mockup mx-auto">
            <img
              :src="imageUrl"
              alt="Mockup living room view"
              class="bg-white mx-auto h-[40%] max-h-25"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
const imageUrl = ref(null)

function onFileSelected (event) {
  const file = event.target.files[0]
  if (!file) return
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }
  imageUrl.value = URL.createObjectURL(file)
}
</script>

<style lang="postcss">
.image-frame__mockup {
  @apply p-[0.4rem] bg-black;
  box-shadow: 4px 2px 6px rgba(0,0,0,.3);

  &::after {
    @apply m-[0.4rem];
    box-shadow: inset 2px 0 3px rgba(0,0,0,0.3);
  }

  img {
    @apply border-[0.8rem] md:border-[1rem] border-white;
  }
}
</style>
