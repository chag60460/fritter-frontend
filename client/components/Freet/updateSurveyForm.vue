<script>
import SurveyForm from '@/components/common/SurveyForm.vue';

//to do - overwrite the fields with a multiple choice or select choice
export default {
  name: 'updateSurveyForm',
  mixins: [SurveyForm],
  data() {
    return {
      url: '/api/survey',
      method: 'PUT',
      hasBody: true,
      topics: {id: 'topics', label: 'Choose Your Topics', value: ''},
      title: 'Update Your Daily Content',
      options: [
        { name: 'Animals' },
        { name: 'Art' },
        { name: 'Beauty' },
        { name: 'Books' },
        { name: 'Campus' },
        { name: 'Career' },
        { name: "Dance" },
        { name: "DIY" },
        { name: "Food" },
        { name: "Fitness" },
        { name: "Gaming" },
        { name: "Hairstyle" },
        { name: "Knowledge" },
        { name: "Love" },
        { name: "Learning" },
        { name: "Makeup" },
        { name: "Politics" },
        { name: "Recipe" },
        { name: "Stationery" },
        { name: "Travel" }
      ],
      callback: () => {
        const message = 'Successfully updated your preference!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
