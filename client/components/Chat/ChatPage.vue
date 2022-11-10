<template>
    <main>
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
</style>