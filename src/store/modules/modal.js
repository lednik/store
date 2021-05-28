export default {
	namespaced: true,
	state: {
        activeModalName: '',
        props: {},
        list: [],
        success: false,
        message: '',
        isInfoModal: false
	},
	getters: {
	},
	mutations: {
        showModal(state, data) {
            if (data.props) {
                state.props = data.props;
            }

            if (data.message) {
                state.message = data.message;
            }

            if (data.success) {
                state.success = data.success;
            }
            
            if (data.list) {
                state.list = data.list;
            }
            
            if (data.isInfoModal) {
                state.isInfoModal = data.isInfoModal;
            }
            
            state.activeModalName = data.name;
            document.body.style.overflowY = 'hidden';
        },
        closeModal(state) {
            state.activeModalName = '';
            state.props = {};
            state.isInfoModal = false;
            document.body.style.overflowY = 'auto';
        }
	},
	actions: {
	}
};
