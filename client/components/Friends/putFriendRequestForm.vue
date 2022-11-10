<script>
import requestResponseForm from '@/components/Friends/requestResponseForm.vue';

export default {
  name: 'putFriendRequestForm',
  mixins: [requestResponseForm],
  data() {
    return {
      url: '/api/friends/',
      method: 'PUT',
      hasBody: true,
      title: 'Respond to A Friend Request',
      fields: [
        {id: 'user', label: 'Friend Username', value: ''},
      ],
      callback: () => {
        const message = 'Successfully responsed to friend request!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
