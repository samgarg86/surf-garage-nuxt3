<template>
  <section id="contact" class="section contact">
    <h2 class="contact__title section__title font-metalsmith">
      <span>{{ $t("contact.title") }}</span>
    </h2>
    <div class="p-5 md:grid grid-cols-3 gap-5 font-metalsmith">
      <LazyInstaFeed/>
      <ContactLinks class="contact__grid-item contact__links lowercase"/>
      <div class="contact__grid-item contact__form w-full lowercase">
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
.contact {
  background-color: theme('colors.black');
  max-width: 100%;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.4)
  ),
  url('@/assets/images/surf-bg.jpg');
  background-repeat: repeat;

  &__title {
    padding-top: 50px;
    padding-bottom: 50px;
    text-align: center;

    span {
      background: theme('colors.lightYellow');
      color: theme('colors.black');
      padding: 0.5rem 1rem;
    }
  }

  &__address {
    color: theme('colors.lightYellow');
  }

  .contact-links__link {
    span {
      background: theme('colors.lightYellow');
      padding: 0 1rem;
      margin-left: 1rem;
      color: theme(colors.black);
      border: 1px solid transparent;
    }

    &:hover span {
      background: transparent;
      color: theme('colors.lightYellow');
      border-color: theme('colors.lightYellow');
    }
  }
}
</style>
