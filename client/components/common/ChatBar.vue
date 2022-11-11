<template>
    <nav>
        <link href='https://fonts.googleapis.com/css?family=Goudy Bookletter 1911' rel='stylesheet'>
        <router-link to="/chat">
            Chat
        </router-link>

        <p>Points: {{$store.state.points}}</p>

        <router-link to="/contacts">
            Contacts
        </router-link>
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
    font-family: 'Goudy Bookletter 1911';
}
</style>