<template>
  <section id="contact" class="section contact">
    <h2 class="contact__title section__title font-metalsmith">
      <span>{{ $t("contact.title") }}</span>
    </h2>
    <div class="section__content contact__content full-width">
      <ContactLinks class="contact__grid-item contact__links"/>
      <div class="contact__grid-item contact__form">
        <ContactForm />
      </div>
      <div class="contact__grid-item contact__insta-widget">
        <!-- SnapWidget -->
        <iframe
          class="contact__insta-iframe snapwidget-widget"
          src="https://snapwidget.com/embed/1014556"
          allowtransparency="true"
          frameborder="0"
          scrolling="no"
        >
        </iframe>
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

  &__content {
    @media screen(md) {
      display: grid;
    }
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 5rem;
    justify-items: center;
    font-family: theme('fontFamily.metalsmith');
    text-transform: lowercase;
  }

  &__grid-item {
    margin-bottom: 4rem;

    @media screen(md) {
      margin-bottom: 0;
    }
  }

  &__form {
    width: 100%;
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

  &__insta {
    &-widget {
      background: theme('colors.black');
      width: 100%;
      margin: 0 auto;
      padding-bottom: 66.667%;
      position: relative;

      @media screen(md) {
        order: -1;
      }
    }

    &-iframe {
      border: none;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
