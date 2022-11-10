<script>
import ChatForm from '@/components/Chat/ChatForm.vue';

export default {
  name: 'sendMessageForm',
  mixins: [ChatForm],
  data() {
    return {
      url: '/api/messages/',
      method: 'POST',
      hasBody: true,
      title: 'Message A Friend',
      //callback is a var holding a reference to a function
      // asyc def callback() in python
      // callback = async lambda x: x
      callback: async () => {
        const message = 'Successfully messaged a friend!';
        this.$set(this.alerts, message, 'success');
        const points_options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin', // Sends express-session credentials with request
            body: JSON.stringify({operation: "add"})
        }
        const response = await fetch('/api/users/points', points_options);
        const res_message = await response.json(); 
        this.$store.commit('updatePoints', res_message.user.points);
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
