<!-- Reusable component representing a form in a block style -->
<!-- This is just an example; feel free to define any reusable components you want! -->
<template>
  <main>
    <form @submit.prevent="submit">
      <h3>{{ title }}</h3>
          <input v-model="friend" placeholder="type in friend's username">
          <span>Message to Friend: </span>
          <textarea v-model="message" placeholder="type in your message"></textarea>
    
      <button type="submit" @click="show_message"> {{ title }} </button>

      <section class="alerts">
        <article
          v-for="(status, alert, index) in alerts"
          :key="index"
          :class="status"
        >
          <p>{{ alert }}</p>
        </article>
      </section>
    </form>
    
    <div v-for="message in message_array">
      <b> {{$store.state.username}}: </b> {{message}}
    </div>

  </main>
</template>

<script>

export default {
  name: 'ChatForm',
  data() {
    /**
     * Options for submitting this form.
     */
    return {
      url: '', // Url to submit form to
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      setUsername: false, // Whether or not stored username should be updated after form submission
      refreshFreets: false, // Whether or not stored freets should be updated after form submission
      alerts: {}, // Displays success/error messages encountered during form submission
      friend: '',
      message: '',
      message_array: [],
      callback: null // Function to run after successful form submission
    };
  },
  methods: {
    async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };

      if (this.hasBody) {
        let payload = {};
        payload.user = this.friend;
        payload.message = this.message;
        options.body = JSON.stringify(payload);
      }

      try {
        const r = await fetch(this.url, options);
        const response_message = await r.json();
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.setUsername) {
          const text = await r.text();
          const res = text ? JSON.parse(text) : {user: null};
          this.$store.commit('setUsername', res.user ? res.user.username : null);
        }

        if (this.refreshFreets) {
          this.$store.commit('refreshFreets');
        }

        if (this.callback) {
          await this.callback(response_message);
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },

    show_message() {
      this.message_array.push(this.message);
    }
  }
};
</script>

<style scoped>
form {
  border: 1px solid #111;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
}

article > div {
  display: flex;
  flex-direction: column;
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}

textarea {
   font-family: inherit;
   font-size: inherit;
}
</style>
