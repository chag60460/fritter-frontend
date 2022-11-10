<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'deleteFriendForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/friends/',
      method: 'DELETE',
      hasBody: true,
      title: 'Delete A Friend',
      fields: [
        {id: 'user', label: 'Friend Username', value: ''},
      ],
      callback: () => {
        const message = 'Successfully deleted a friend!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
