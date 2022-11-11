<template>
    <main>
        <link href='https://fonts.googleapis.com/css?family=Goudy Bookletter 1911' rel='stylesheet'>
        <sendMessageForm />
        <ChatBar />
    </main>
</template>
  
<script>
    import sendMessageForm from '@/components/Chat/sendMessageForm.vue';
    import ChatBar from '@/components/common/ChatBar.vue'

    export default {
        name: 'ChatPage',
        components: {sendMessageForm, ChatBar},
    };
</script>

<style scoped>
.boxed {
  border: 1px solid gray ;
  margin: 1px;
}

main {
    background-color: #5CB4B4;
    font-family: 'Goudy Bookletter 1911';
}

</style>