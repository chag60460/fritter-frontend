<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetFreetsForm',
  mixins: [InlineForm],
  data() {
    return {
      value: this.$store.state.filter,
      callback: async () => {
        const message = 'Successfully unlocked posts!';
        this.$set(this.alerts, message, 'success');
        const points_options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin', // Sends express-session credentials with request
            body: JSON.stringify({operation: "deduct"})
        }
        const response = await fetch('/api/users/points', points_options);
        const res_message = await response.json(); 
        this.$store.commit('updatePoints', res_message.user.points);
      }
  }
}
};
</script>
