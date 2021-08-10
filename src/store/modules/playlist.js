export default {
	namespaced: true,
	state: {
        id: -1,
        currentIndex: -1,
        playlist: [],
        waitingToggle: false,
        waitingPlaylist: false,
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
                state.waitingPlaylist = true
            }
        },
        pushToPlaylist(state, data) {
            state.playlist = state.playlist.concat(data)
        },
        closePlaylist(state) {
            state.id = -1
            state.currentIndex = -1
            state.playlist = []
            state.waitingToggle = false
            state.isPlaying = false
        },
        setWaitingPlaylist(state, data) {
            if(data) {
                state.waitingPlaylist = data
            } else {
                state.waitingPlaylist = false
            }
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
