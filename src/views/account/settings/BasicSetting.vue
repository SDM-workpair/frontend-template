<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">
        <a-form layout="vertical">
          <a-form-item
            :label="$t('account.settings.basic.nickname')"
          >
            <a-input v-model="name" disabled/>
          </a-form-item>

          <!-- <a-form-item
            :label="$t('account.settings.basic.profile')"
          >
            <a-textarea rows="4" :placeholder="$t('account.settings.basic.profile-message')"/>
          </a-form-item> -->

          <a-form-item
            :label="$t('account.settings.basic.email')"
            :required="false"
          >
            <a-input v-model="email" disabled/>
          </a-form-item>

          <a-form-item
            :label="$t('account.settings.basic.lid')"
            :required="false"
          >
            <a-input v-model="line_id" :disabled="!isEditing"/>
          </a-form-item>

          <!-- <a-form-item>
            <a-button type="primary">{{ $t('account.settings.basic.update') }}</a-button>
          </a-form-item> -->

          <a-form-item>
            <a-button v-if="!isEditing" @click="startEditing">
              {{ $t('account.settings.basic.update') }}
            </a-button>
            <a-button v-else type="primary" @click="saveChanges">
              {{ $t('account.settings.basic.save') }}
            </a-button>
            <a-button v-if="isEditing" @click="cancelEditing">
              {{ $t('account.settings.basic.cancel') }}
            </a-button>
          </a-form-item>

        </a-form>

      </a-col>

      <!-- <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <img class="avatar" id="photo" alt="User Avatar">
      </a-col> -->

      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <!-- <img :src="option.img" /> -->
          <!-- <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
            AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
                9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" /> -->
          <img :src="photo" />
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar"/>

  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { baseMixin } from '@/store/app-mixin'
import axios from 'axios'

export default {
  mixins: [baseMixin],
  components: {
    AvatarModal
  },
  data () {
    return {
      name: '',
      email: '',
      line_id: '',
      photo: '',
      isEditing: false,
      originalData: {},
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  methods: {

    setavatar (url) {
      this.option.img = url
    },

    // async fetchUserProfile() {
    //   console.log('1111')
    //   try {
    //     // Fetch user profile data
    //     console.log('1111')
    //     const response = await fetch('/api/v1/users/profile/me', {
    //       headers: {
    //         'Authorization': 'Bearer ' + token,
    //         'Content-Type': 'application/json'
    //       },
    //       method: 'GET'
    //     });

    //     const data = await response.json();
    //     console.log('heee')
    //     this.nickname = data.data.name; // Set the nickname value
    //     this.nickname = 'test'
    //   } catch (error) {

    //     console.error('There was a problem with the fetch operation:', error);
    //   }
    // },
    async fetchUserProfile () {
      console.log('1111')
      const token = sessionStorage.getItem('token')
      try {
        const response = await axios.get('/api/v1/users/profile/me', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })

        const data = response.data
        this.name = data.data.name
        this.email = data.data.email
        this.line_id = data.data.line_id
        this.photo = data.data.image
        // document.getElementById('photo').src = this.photo
        this.originalData = { name: this.name, line_id: this.line_id }
        console.log('this.line_idgettt', this.originalData.line_id)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    },
    startEditing () {
      this.isEditing = true
    },
    async saveChanges () {
      const token = sessionStorage.getItem('token')
      // get new line id?
      const requestData = { line_id: this.line_id }
      // Make API call to save the changes
      try {
          const response = await axios.put('/api/v1/users/profile', requestData, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          // Update original data with the new values
          this.originalData = { name: this.name, line_id: this.line_id }
          // Exit editing mode and display the "Edit" button again
          this.isEditing = false
        } catch (error) {
          console.error('There was a problem with the API request:', error)
      }
    },

    cancelEditing () {
        // Restore the original values from the originalData object
        // this.name = this.originalData.name;
        console.log('this.line_idcancelEditing', this.originalData.line_id)
        this.line_id = this.originalData.line_id
        // Exit editing mode and display the "Edit" button again
        this.isEditing = false
    }
  },

  created () {
    console.log('here')
    this.fetchUserProfile()
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: gray;
    margin-top: 50px;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
