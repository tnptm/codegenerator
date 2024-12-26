import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
            isLoggedIn: false,
            userName: '',
    }), 
    actions: { 
        login(p) { 
            this.isLoggedIn = true;
            this.userName = p;
        }, 
        logout() { 
            this.isLoggedIn = false; 
            this.userName = '';
        } 
    }
});