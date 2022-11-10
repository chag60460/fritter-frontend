<template>
    <main>
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