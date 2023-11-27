<script setup>
const endpoint = 'https://formspree.io/f/xwkzrzpj'
// TODO: Move this to axios submit (but need to implement recaptcha myself)
// import {ref} from "vue";
// import axios from 'axios'
//
// let name = ref('')
// let contact = ref('')
// let message = ref('')
//
// const submitForm = () => {
//   const data = {
//     name: name.value,
//     contact: contact.value,
//     message: message.value,
//   }
//   axios.post(endpoint, data).then((res) => {
//     alert(`Form Submitted Successfully : ${res}`)
//   })
// }
</script>

<template>
  <form class="contact-form w-full grid gap-1 mb-1" :action="endpoint" method="POST">
    <input
        class="contact-form__input"
        :placeholder="$t('contact.form.name')"
        name="name"
        required
        style="grid-area: name"
    />
    <input
        class="contact-form__input"
        :placeholder="$t('contact.form.phone')"
        type="tel"
      name="phone"
      style="grid-area: phone"
    />
    <input
        class="contact-form__input"
        :placeholder="$t('contact.form.email')"
        name="email"
        style="grid-area: email"
    />
    <textarea
      class="contact-form__textarea"
      :placeholder="$t('contact.form.message')"
      name="message"
      required
      style="grid-area: message"
    />
    <div class="contact-form__send" style="grid-area: send">
      <button type="submit" class="contact-form__btn-send">
        {{ $t("contact.form.send") }}
      </button>
    </div>
  </form>
</template>

<style lang="postcss">
.contact-form {
  grid-template-areas:
    "name"
    "phone"
    "email"
    "message"
    "send";

  grid-template-rows: 1fr 1fr 1fr 3fr 1fr;

  @media screen(md) {
    grid-template-rows: 1fr 1fr 3fr 1fr;
    grid-template-areas:
      "name name name"
      "phone email email"
      "message message message"
      ". . send";
  }

  &__input {
    @apply w-full py-1 px-2 bg-white border-0;
  }

  &__textarea {
    @apply w-full h-full py-1 px-2 bg-white border-0 outline-0 outline-offset-0;
  }

  &__send {
    @apply text-right;

    button {
      @apply border-0 bg-white text-black py-1 px-2 cursor-pointer w-full md:w-auto
    }
  }

  &.lowercase {
    input, textarea, button {
      text-transform: lowercase;
    }
  }
}
</style>
