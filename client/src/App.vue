<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <nav class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 class="text-xl md:text-2xl font-bold">ระบบเช็คชื่อ</h1>
          </div>
          <div class="flex space-x-2 md:space-x-4">
            <router-link 
              to="/checkin" 
              class="px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-200 hover:bg-white/20 text-sm md:text-base"
              :class="$route.path === '/checkin' ? 'bg-white/30 font-semibold' : ''"
            >
              เช็คชื่อ
            </router-link>
            <router-link 
              to="/register" 
              class="px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-200 hover:bg-white/20 text-sm md:text-base"
              :class="$route.path === '/register' ? 'bg-white/30 font-semibold' : ''"
            >
              ลงทะเบียน
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <main class="container mx-auto px-4 py-6 md:py-12">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>
