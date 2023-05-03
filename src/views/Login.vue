<template>
  <div id="my-template">
    <!-- 這邊語謙的login要加 才不會有上面白白的 -->
    <br>
    <br>
    <br>
    <br>
    <div style="text-align:center; margin-top: 90px;">
      <font size="36" color="white" face="Arial Black">Teamatch</font>

    </div>
    <br>
    <div class="center">
      <div
        id="g_id_onload"
        data-client_id="768305533256-eg3ift96spolgtm69bo6r3423df13c73.apps.googleusercontent.com"
        data-callback="handleCallback"
        data-auto_prompt="false"
        style="text-align: center;"
      ></div>
      <div
        class="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="center"
        data-width="328"
        style="text-align: center;"
      ></div>
    </div>
  </div>
</template>
  <script>
  window.handleCallback = (response) => {
   console.log('here')
   console.log(response)
   console.log(response.credential)
   fetch('http://localhost:8000/api/v1/auth/sso-login', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ credential: response.credential })
    })
    .then(response => response.json())
    .then(data => {
      sessionStorage.removeItem('token');
      console.log('okkk')
      console.log(data.data.access_token)
      sessionStorage.setItem('token', data.data.access_token)
      const token = sessionStorage.getItem('token')
      console.log('111')
      console.log(token)
      window.location.href = 'http://localhost:8080/'
    })
    .catch(error => {
      console.error('Error:', error)
    })
  }
  </script>
  <style>
      .center {
    display: flex;
    justify-content: center;
    height: 100vh;
  }
  .hihiLogin{
    margin-top: 100px;
  }
  #my-template {
  background-color: black;
  }
  </style>
