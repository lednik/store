export default {
	namespaced: true,
	state: {
        email: '',
        name: '',
        phone: '',
        tariff: '' 
	},
	getters: {
	},
	mutations: {
        setProfile(state, data) {
            if(state.email) {
                state.email = data.email
            }
            if(state.name) {
                state.name = data.name
            }
            if(state.phone) {
                state.phone = data.phone
            }
            if(state.tariff) {
                state.tariff = data.tariff
            }
        },
        closeModal(state) {
        }
	},
	actions: {
	}
};
