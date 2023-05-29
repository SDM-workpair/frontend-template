<template>

  <a-modal
    title=""
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="800"
    :footer="null"
    @cancel="cancelHandel">
    <a-row>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img"/>
        </div>
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :lg="2" :md="2">
        <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
          <a-button icon="upload"> {{ $t('account.settings.basic.choose') }}</a-button>
        </a-upload>
      </a-col>
      <a-col :lg="{span: 1, offset: 2}" :md="2">
        <a-button icon="plus" @click="changeScale(1)"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="minus" @click="changeScale(-1)"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="undo" @click="rotateLeft"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="redo" @click="rotateRight"/>
      </a-col>
      <a-col :lg="{span: 2, offset: 6}" :md="2">
        <a-button @click="finish('blob')">{{ $t('account.settings.basic.save') }}</a-button>
      </a-col>
    </a-row>
  </a-modal>

</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      base64Data: '',
      visible: false,
      id: null,
      confirmLoading: false,
      fileList: [],
      uploading: false,
      options: {
        // img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        img: '',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      },
      previews: {}
    }
  },
  methods: {
    edit (id) {
      this.visible = true
      this.id = id
      /* 获取原始头像 */
    },
    close () {
      this.id = null
      this.visible = false
    },
    cancelHandel () {
      this.close()
      location.reload()
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    beforeUpload (file) {
      const reader = new FileReader()
      // 把Array Buffer转化为blob 如果是base64不需要
      // 转化为base64
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.options.img = reader.result
      }
      // 转化为blob
      // reader.readAsArrayBuffer(file)

      return false
    },

    finish (type) {
      const _this = this
      const formData = new FormData()

      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          // name: "邱語謙",
          // line_id: "hihi",
          console.log(data)
          const img = window.URL.createObjectURL(data)
          console.log(img)

          const reader = new FileReader()
          reader.onloadend = () => {
            this.base64Data = reader.result
            console.log(this.base64Data)
            // Perform further operations with the base64Data
          }
          reader.readAsDataURL(data)

          const token = sessionStorage.getItem('token')
          axios.put('/api/v1/users/profile', {
            image: this.base64Data
          }, {
              headers: {
                'Authorization': 'Bearer ' + token
              }
          }).then(response => {
            // Handle the response
            console.log(response.data)
          })
          .catch(error => {
            // Handle the error
            console.error(error)
          })
          // formData.append('image', data, this.fileName);
          // const token = sessionStorage.getItem('token')
          // axios
          //   .post('/api/v1/users/profile', formData, {
          //     headers: {
          //       'Authorization': 'Bearer ' + token,
          //       'Content-Type': 'multipart/form-data',
          //     },
          //   })
          //   .then((response) => {
          //     // 在这里处理上传成功后的逻辑
          //     const imageUrl = response.data.imageUrl; // 假设服务器返回了图片的 URL
          //     // 将 imageUrl 存储到数据库中，你可以通过发送请求到适当的 API 端点来实现存储操作

          //     _this.$message.success('上传成功');
          //     _this.$emit('ok', imageUrl);
          //     _this.visible = false;
          //   })
          //   .catch((error) => {
          //     // 在这里处理上传失败后的逻辑
          //     console.error('上传失败:', error);
          //     _this.$message.error('上传失败');
          //   });
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          // 处理非 Blob 类型的数据，例如裁剪后的 Base64 编码字符串
        })
      }
    },
    // 上传图片（点击上传按钮）
    // finish (type) {
    //   console.log('finish')
    //   const _this = this
    //   const formData = new FormData()
    //   // 输出
    //   if (type === 'blob') {
    //     this.$refs.cropper.getCropBlob((data) => {
    //       const img = window.URL.createObjectURL(data)
    //       this.model = true
    //       this.modelSrc = img
    //       formData.append('file', data, this.fileName)
    //       this.$http.post('https://www.mocky.io/v2/5cc8019d300000980a055e76', formData, { contentType: false, processData: false, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    //         .then((response) => {
    //           console.log('upload response:', response)
    //           // var res = response.data
    //           // if (response.status === 'done') {
    //           //   _this.imgFile = ''
    //           //   _this.headImg = res.realPathList[0] // 完整路径
    //           //   _this.uploadImgRelaPath = res.relaPathList[0] // 非完整路径
    //           //   _this.$message.success('上传成功')
    //           //   this.visible = false
    //           // }
    //           _this.$message.success('上传成功')
    //           _this.$emit('ok', response.url)
    //           _this.visible = false
    //         })
    //     })
    //   } else {
    //     this.$refs.cropper.getCropData((data) => {
    //       this.model = true
    //       this.modelSrc = data
    //     })
    //   }
    // },
    okHandel () {
      const vm = this

      vm.confirmLoading = true
      setTimeout(() => {
        vm.confirmLoading = false
        vm.close()
        vm.$message.success('上传头像成功')
      }, 2000)
    },

    realTime (data) {
      this.previews = data
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-preview {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
