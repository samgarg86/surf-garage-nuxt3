<template>
  <!-- <MenuHamburger black class="hamburger-menu-boards"/> -->
  <main id="page-wrap" class="mx-1 md:mx-2 mb-1 md:mb-2">
    <BlogHeader/>
    <slot/>
    <Footer/>
  </main>
  <div hidden
       id="snipcart"
       data-api-key="YWZhYTMyNDUtZWY4Ny00ZDg0LTk1ZjYtMzMzZDFjN2NjNzYxNjM4MjE1NzE4NjM4MjYyMjk0"
       data-config-modal-style="side">
  </div>
</template>
