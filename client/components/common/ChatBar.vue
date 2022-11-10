<template>
    <nav>
        <router-link to="/chat">
            Chat
        </router-link>

        <p>Points: {{$store.state.points}}</p>

        <router-link to="/contacts">
            Contacts
        </router-link>
    </nav>
</template>

<script>
// export default {
//     name: 'ChatBar',
//     // data(){
//     //     return {
//     //         points: 0
//     //     }
//     // }
// }
</script>

<style scoped>
nav {
    padding: 1vw 2vw;
    background-color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
</style>