<script setup>
const endpoint = "https://formspree.io/f/xwkzrzpj";
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
  <form class="contact-form" :action="endpoint" method="POST">
    <input
      class="contact-form__input"
      placeholder="contact.form.name"
      name="name"
      style="grid-area: name"
    />
    <input
      class="contact-form__input"
      placeholder="contact.form.phone"
      type="tel"
      name="phone"
      style="grid-area: phone"
    />
    <input
      class="contact-form__input"
      placeholder="contact.form.email"
      name="email"
      style="grid-area: email"
    />
    <textarea
      class="contact-form__textarea"
      placeholder="contact.form.message"
      name="message"
      style="grid-area: message"
    ></textarea>
    <div class="contact-form__send" style="grid-area: send">
      <button type="submit" class="contact-form__btn-send">
        {{ $t("contact.form.send") }}
      </button>
    </div>
  </form>
</template>

<style lang="postcss">
.contact-form {
  width: 100%;
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    "name"
    "phone"
    "email"
    "message"
    "send";

  grid-template-rows: 1fr 1fr 1fr 3fr 1fr;

  @media screen(md) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 3fr 1fr;
    grid-template-areas:
      "name name name"
      "phone email email"
      "message message message"
      ". . send";
  }

  margin-bottom: 1rem;
  align-content: stretch;

  &__input {
    width: 100%;
    padding: 1rem 2rem;
    background: var(--c-lighter-yellow);
    border: none;
    text-transform: lowercase;
  }

  &__textarea {
    width: 100%;
    height: 100%;
    padding: 1rem 2rem;
    background: var(--c-lighter-yellow);
    border: none;
    outline: none;
    outline-offset: 0;
    text-transform: lowercase;
  }

  &__send {
    text-align: right;

    button {
      border: none;
      background: var(--c-lighter-yellow);
      color: var(--c-black);
      padding: 1rem 2rem;
      cursor: pointer;
      text-transform: lowercase;
      width: 100%;

      @media screen(md) {
        width: auto;
      }
    }
  }
}
</style>
