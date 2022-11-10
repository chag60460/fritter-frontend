<!-- Form for changing password (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'GetCountDown',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users/countdown',
      method: 'GET',
      hasBody: false,
      title: 'See Time Remaining',
      fields: [],
      callback: (response_message) => {
        this.$set(this.alerts, response_message["message"], 'success');
      }
    };
  }
};
</script>
