<template>
    <main>
        <link href='https://fonts.googleapis.com/css?family=Goudy Bookletter 1911' rel='stylesheet'>
        <sendFriendRequestForm />
        <putFriendRequestForm />
        <deleteFriendForm />
        <ChatBar />
    </main>
</template>

<script>
    import sendFriendRequestForm from '@/components/Friends/sendFriendRequestForm.vue';
    import putFriendRequestForm from '@/components/Friends/putFriendRequestForm.vue';
    import deleteFriendForm from '@/components/Friends/deleteFriendForm.vue';
    import ChatBar from '@/components/common/ChatBar.vue';

    export default {
        name: 'ContactsPage',
        components: {sendFriendRequestForm, ChatBar, putFriendRequestForm, deleteFriendForm},
    };
</script>

<style scoped>
main {
    background-color: #5CB4B4;
    font-family: 'Goudy Bookletter 1911';
}

</style>