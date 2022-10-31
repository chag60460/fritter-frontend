<!-- Form for changing password (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'SetTimeLimit',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users/limit',
      method: 'PUT',
      hasBody: true,
      fields: [
        {id: 'limit', label: 'Limit', value: ''}
      ],
      title: 'Set New Time Limit',
      callback: () => {
        const message = 'Successfully set new time limit!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
