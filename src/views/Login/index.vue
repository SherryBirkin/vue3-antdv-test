<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { FormInstance } from 'ant-design-vue';
import { accountLogin } from '@/api/account/login';
import GloMethods from '@/utils/gloMethods';
import { useRouter } from 'vue-router';

const formRef = ref<FormInstance>();
const router = useRouter();

const formState = reactive({
  username: '',
  password: '',
});
const formRules = {
  username: [{ required: true, message: '用户名不能为空' }],
  password: [{ required: true, message: '密码不能为空' }],
};
const labelCol = {
  style: {
    width: '80px',
  }
};

const loginReq = async function() {
  const { isSuc } = await GloMethods.commonReqHandler(accountLogin, {
    username: 'henry',
    password: '123',
  });

  if (isSuc) {
    router.push({ name: 'home' });
  }
};
const handleLoginBtnClick = function() {
  formRef.value
    ?.validate()
    .then((res) => {
      console.log('表单校验成功！', res);
      loginReq();
    })
    .catch((error) => {
      console.log('表单校验失败！', error);
    });
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="formRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
      >
        <a-form-item
          label="用户名"
          name="username"
        >
          <a-input v-model:value="formState.username"></a-input>
        </a-form-item>
        <a-form-item
          label="密码"
          name="password"
        >
          <a-input-password v-model:value="formState.password"></a-input-password>
        </a-form-item>
      </a-form>
      <div class="form-btn-panel">
        <a-button
          type="primary"
          @click="handleLoginBtnClick"
        >登录</a-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  position: relative;
  height: 100%;
  background-color: #639bcb;

}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  padding: 60px 40px;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.form-btn-panel {
  text-align: center;
}
</style>
