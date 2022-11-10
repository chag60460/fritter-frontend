<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'sendFriendRequestForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/friends/',
      method: 'POST',
      hasBody: true,
      title: 'Send A Friend Request',
      fields: [
        {id: 'user', label: 'Friend Username', value: ''},
      ],
      callback: () => {
        const message = 'Successfully send a Friend Request!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
