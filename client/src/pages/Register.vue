<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800">ลงทะเบียน</h2>
        <p class="text-gray-500 text-sm mt-2">กรอกข้อมูลเพื่อเข้าใช้งานระบบ</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              เลขประจำตัว
            </span>
          </label>
          <input 
            v-model="form.student_id" 
            type="text" 
            required
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-lg"
            placeholder="กรอกเลขประจำตัว"
          />
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              ชื่อ-นามสกุล
            </span>
          </label>
          <input 
            v-model="form.name" 
            type="text" 
            required
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-lg"
            placeholder="กรอกชื่อ-นามสกุล"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              ชื่อคลาส
            </span>
          </label>
          <input 
            v-model="form.class_name" 
            type="text" 
            required
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-lg"
            placeholder="เช่น ม.4/1, ป.6/2"
          />
        </div>

        <button 
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 md:py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            กำลังลงทะเบียน...
          </span>
          <span v-else class="flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            ลงทะเบียน
          </span>
        </button>
      </form>

      <div v-if="message" :class="messageClass" class="mt-6 p-4 rounded-xl text-center animate-fade-in">
        <div class="flex items-center justify-center">
          <svg v-if="isSuccess" class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-semibold">{{ message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const API_URL = 'http://127.0.0.1:8787';

const form = ref({
  student_id: '',
  name: '',
  class_name: ''
});

const loading = ref(false);
const message = ref('');
const isSuccess = ref(false);

const messageClass = computed(() => 
  isSuccess.value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
);

const handleSubmit = async () => {
  loading.value = true;
  message.value = '';

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    const data = await response.json();

    if (data.success) {
      isSuccess.value = true;
      message.value = data.message;
      form.value = { student_id: '', name: '', class_name: '' };
    } else {
      isSuccess.value = false;
      message.value = data.error;
    }
  } catch (error) {
    isSuccess.value = false;
    message.value = 'เกิดข้อผิดพลาดในการเชื่อมต่อ';
  } finally {
    loading.value = false;
  }
};
</script>
