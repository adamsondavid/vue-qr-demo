<template>
  <div class="qr-scanner">
    <h1 v-if="!initialized">Loading the Camera...</h1>
    <qrcode-stream v-if="!payload" @decode="onDecode" @init="onInit"></qrcode-stream>

    <h1 v-if="error">{{ error }}</h1>

    <div v-if="payload">
      <h1>Der Code wurde erfolgreich gescannt.</h1>
      <div>Payload: <pre>{{ payload }}</pre></div>
      <p><router-link to="/">Go Back</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "QrScanner",
  data() {
    return {
      initialized: false,
      error: null,
      payload: null
    }
  },
  methods: {
    onDecode(payload) {
      this.payload = payload;
    },
    async onInit(promise){
      try {
        await promise;
        this.initialized = true;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }
}
</script>

<style scoped>
.qr-scanner {
  width: 100%;
  height: 100%;
}
</style>
