<script setup>
import ContactForm from "@/components/ContactForm.vue";
import ContactLinks from "@/components/ContactLinks.vue";
</script>

<template>
  <section id="contact" class="section contact">
    <h2 class="contact__title section__title">
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
  background-color: var(--c-black);
  max-width: 100%;
  @include bg-repeat("@/assets/images/surf-bg.jpg");

  &__title {
    padding-top: 50px;
    padding-bottom: 50px;
    text-align: center;

    span {
      background: var(--c-lighter-yellow);
      color: var(--c-black);
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
    font-family: var(--font-metalsmith);
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
    color: var(--c-lighter-yellow);
  }

  .contact-links__link {
    span {
      background: var(--c-lighter-yellow);
      padding: 0 1rem;
      margin-left: 1rem;
      color: var(--c-black);
      border: 1px solid transparent;
    }

    &:hover span {
      background: transparent;
      color: var(--c-lighter-yellow);
      border-color: var(--c-lighter-yellow);
    }
  }

  &__insta {
    &-widget {
      background: var(--c-black);
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
