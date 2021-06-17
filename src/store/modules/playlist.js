export default {
	namespaced: true,
	state: {
        id: -1,
        currentIndex: -1,
        playlist: [],
        waitingToggle: false,
        isPlaying: false,
	},
	getters: {
        getTrack: state => {
            return state.playlist[state.currentIndex]
        }
	},
	mutations: {
        setPlaylist(state, data) {
            if (state.playlist == data.playlist && state.currentIndex == data.index) {
                state.waitingToggle =  true
            } else {
                state.playlist = data.playlist
                state.currentIndex = data.index
                state.id = data.id ? data.id : -1
            }
        },
        closePlaylist(state) {
            state.id = -1
            state.currentIndex = -1
            state.playlist = []
            state.waitingToggle = false
            state.isPlaying = false
        },
        setWaitingToggle(state, data) {
            if(data) {
                state.waitingToggle = data
            } else {
                state.waitingToggle = false
            }
        },
        setIsPlaying(state, data) {
            state.isPlaying = data
        },
        playNext(state) {
            if(state.playlist[state.currentIndex + 1]) {
                state.currentIndex++
            } else {
                state.currentIndex = 0
            }
        },
        playPrev(state) {
            if (state.playlist[state.currentIndex - 1]) {
                state.currentIndex--
            } else {
                state.currentIndex = state.playlist.length - 1
            }
        }
	},
	actions: {
	}
};
