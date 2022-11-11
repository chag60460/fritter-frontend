<!-- Default page that also displays freets -->

<template>
  <main>
    <link href='https://fonts.googleapis.com/css?family=Goudy Bookletter 1911' rel='stylesheet'>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <CreateFreetForm />
    </section>
    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to create, edit, and delete freets.
        </h3>
      </article>
    </section>
    
    <section>
      <header>
        <h2>Take the Survey</h2>
      </header>
      <takeSurveyForm />
    </section>

    <section>
      <header>
        <h2>Update the Survey</h2>
      </header>
      <updateSurveyForm />
    </section>

    <section>
      <header>
        <div class="left">
          <h2>
            Viewing all freets
            <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetFreetsForm
            ref="getFreetsForm"
            value="author"
            placeholder="🔍 Filter by author (optional)"
            button="🔄 Get freets"
          />
          <h2>Current Points: {{$store.state.points}}</h2>
        </div>
      </header>
      <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';
import takeSurveyForm from '@/components/Freet/takeSurveyForm.vue';
import updateSurveyForm from '@/components/Freet/updateSurveyForm.vue';

export default {
  name: 'FreetPage',
  components: {FreetComponent, GetFreetsForm, CreateFreetForm, takeSurveyForm, updateSurveyForm},
  mounted() {
    this.$refs.getFreetsForm.submit();
  }
};
</script>

<style scoped>
main {
  background-color: #5CB4B4;
  font-family: 'Goudy Bookletter 1911';
}
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
