<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <link href='https://fonts.googleapis.com/css?family=Goudy Bookletter 1911' rel='stylesheet'>
    <div class="left">
      <img src="../../public/fish_icon.png">
      <h1 class="title">
        Fritter
      </h1>
    </div>
    <div class="right">
      <router-link to="/">
        <img src="../../public/home_icon.png">
        Home
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/account"
      >
      <img src="../../public/account_icon.png">
        Account
      </router-link>
      <router-link
        v-else
        to="/login"
      >
      <img src="../../public/account_icon.png">
        Login
      </router-link>
      <router-link to="/chat">
        <img src="../../public/chat_icon.png">
        Chat
      </router-link>

    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
    padding: 1vw 2vw;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    font-family: 'Goudy Bookletter 1911';font-size: 22px;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}

.left {
	display: flex;
	align-items: center;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}
</style>
