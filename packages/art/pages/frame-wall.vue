<template>
  <div class="min-h-screen bg-grey-30">
    <FrameWall :columns="columns"/>
  </div>
</template>

<script setup>
const columns = [
  {
    width: 'min(14vw, 16rem)',
    frames: [
      { src: '/frames/DJI_0496.jpg', alt: 'Aerial beach' },
      { src: '/frames/Furgo Vintage 1.jpg', alt: 'Vintage van' }
    ]
  },
  {
    width: 'min(14vw, 16rem)',
    frames: [
      { src: '/frames/One More Wave Poster.jpg', alt: 'One more wave poster' },
      { src: '/frames/DSCF9598.jpg', alt: 'Palm sunset' }
    ]
  },
  {
    width: 'min(25vw, 30rem)',
    frames: [
      {
        html: `THAT FEELING<br>FROM YOUR<br>LAST<br>SURF TRIP.<br>FRAMED.`,
        aspect: 'aspect-[4/6]'
      }
    ]
  },
  {
    width: 'min(14vw, 16rem)',
    frames: [
      { src: '/frames/Hang Heels Color.jpg', alt: 'Hang heels' },
      { src: '/frames/Two Morning Birds_.jpg', alt: 'Two morning birds' }
    ]
  },
  {
    width: 'min(14vw, 16rem)',
    frames: [
      { src: '/frames/DSCF0500.jpg', alt: 'Surfer' },
      { src: '/frames/DSCF9557.jpg', alt: 'One more wave poster' },
    ]
  }
]
</script>
