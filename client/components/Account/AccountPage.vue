<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <link href='https://fonts.googleapis.com/css?family=Goudy Bookletter 1911' rel='stylesheet'>
    <section>
      <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
    </section>
    
    <section>
      <header>
        <h2>Time Limit Settings for @{{ $store.state.username }}</h2>
      </header>
      <SetTimeLimit />
    </section>
    
    <section>
      <header>
        <h2>Get Time Remaining on Fritter for @{{ $store.state.username }}</h2>
      </header>
      <GetCountDown />
    </section>
    
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm />
      <DeleteAccountForm />
    </section>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';
import SetTimeLimit from '@/components/Account/SetTimeLimit.vue';
import GetCountDown from '@/components/Account/GetCountDown.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
    SetTimeLimit,
    GetCountDown
  }
};
</script>

<style>
main {
    background-color: #5CB4B4;
    font-family: 'Goudy Bookletter 1911';
}

</style>