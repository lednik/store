<template>
<div class="player">
	<div class="player__content">
		<div class="player__info">
			<div class="player__name">
				{{ track.title }}
			</div>
			<div class="player__author">
				{{ track.artist }}
			</div>
		</div>
		<div class="player__controls">
			<div class="player__control player__prev scale" @click="playPrev">
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M27 30V10L13 19.7872L27 30Z" fill="white"/>
				<rect width="2" height="19" transform="matrix(-1 0 0 1 15 10.5)" fill="white"/>
				</svg>
			</div>
			<div
				class="player__control player__play scale"
				@click="toggleTrack"
			>
				<svg v-if="!isPlaying" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M4 30V2L32 15.7021L4 30Z" fill="white"/>
				</svg>
				<svg v-else width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="6" y="2" width="6" height="28" fill="white"/>
				<rect x="20" y="2" width="6" height="28" fill="white"/>
				</svg>

			</div>
			<div class="player__control player__next scale" @click="playNext">
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M13 30V10L27 19.7872L13 30Z" fill="white"/>
				<rect x="25" y="10.5" width="2" height="19" fill="white"/>
				</svg>
			</div>
		</div>
		<div class="player__current">
			{{ currentTime }}
		</div>
		<div class="player__bar" ref="progressbar" @click="moveTrack">
			<div class="player__bar-progress" ref="progress">
				<div class="player__bar-line">
					<div class="player__bar-circle" />
				</div>
			</div>
		</div>
		<div class="player__total">
			{{ track.duration }}
		</div>
		<div class="player__volume">
			<div class="player__volume-icon" @click="isVolumeBar = !isVolumeBar">
				<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M18.0558 6.70779V4C23.1732 5.19325 27 9.88114 27 15.5C27 21.1189 23.1732 25.8067 18.0558 27V24.2922C21.7485 23.1645 24.4445 19.6568 24.4445 15.5C24.4445 11.3432 21.7485 7.83553 18.0558 6.70779Z" fill="white"/>
				<path d="M4 11.5662V19.434H9.11095L15.4997 25.9904V5.00974L9.11095 11.5662H4Z" fill="white"/>
				<path d="M21.2502 15.5C21.2502 13.1856 19.9469 11.1858 18.0558 10.222V20.7845C19.9469 19.8142 21.2502 17.8144 21.2502 15.5Z" fill="white"/>
				</svg>
			</div>
			<div class="player__volume-wrapper dt">
				<div class="player__volume-bar" ref="valuebar" @click="changeValue">
					<div ref="value" class="player__volume-progress">
						<div class="player__volume-line">
							<div class="player__volume-circle" />
						</div>
					</div>
				</div>
			</div>
			<div v-if="isVolumeBar" class="player__volume-wrapper mb">
				<div class="player__volume-bar" ref="valuebar" @click="changeValue">
					<div ref="value" class="player__volume-progress">
						<div class="player__volume-line">
							<div class="player__volume-circle" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<audio ref="player">
		<source ref="source" type="audio/mpeg">
	</audio>
</div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex';
import Vue from 'vue'
export default {
	computed: {
		...mapState('playlist', ['currentIndex', 'isPlaying', 'waitingToggle']),
		...mapGetters('playlist', ['getTrack']),
	},
	watch: {
		'currentIndex': function () {
			this.track = Object.assign({}, this.getTrack)
			this.$refs.player.src = this.getTrack.track_url
			this.play()
		},
		'waitingToggle': function () {
			if(this.waitingToggle == true) {
				this.toggleTrack()
				this.setWaitingToggle()
			}
		},
	},
	data() {
        return {
            track: {},
			currentTime: '',
			isVolumeBar: false
        }
    },
  	methods: {
		...mapMutations('playlist', ['playNext','playPrev', 'setIsPlaying', 'setWaitingToggle']),
		toggleTrack() {
			if(this.$refs.player.paused) {
				this.play()
			} else {
				this.pause()
			}
		},
		getClickPosition(e, ref) {
			let rect = this.$refs[ref].getBoundingClientRect();
			let width = rect.right - rect.left;
			let x = (e.offsetX === undefined) ? e.layerX : e.offsetX;
			let value = (x / width)
			return value
		},
		changeValue(e) {
			let value = this.getClickPosition(e, 'valuebar')
			console.log(value);
			let percent = value * 100
			this.$refs.player.volume = value
			this.$refs.value.style.width = percent + '%';
		},
		moveTrack(e) {
			let value = this.getClickPosition(e, 'progressbar')
			let percent = value * 100
    		let allTime = this.$refs.player.duration;
    		let time = Math.floor(allTime * (value));
    		this.$refs.player.currentTime = time;
			this.$refs.progress.style.transition = '0s';
    		this.$refs.progress.style.width = percent + '%';
			setTimeout(() => {
				this.$refs.progress.style.transition = '0.5s';
			}, 100)
    	},
		// toNextTrack() {

		// },
		progressBarWidth() {
			return this.$refs.player.currentTime / this.$refs.player.duration * 100
		},
		play() {
			this.setIsPlaying(true)
			// this.playing = true
			this.$refs.player.play()
		},
		pause() {
			this.setIsPlaying(false)
			// this.playing = false
			this.$refs.player.pause()
		},
		secondsToTime(seconds) {
			seconds = Number(seconds);
			var h = Math.floor(seconds / 3600);
			var m = Math.floor(seconds % 3600 / 60);
			var s = Math.floor(seconds % 3600 % 60);

			var hDisplay = h > 0 ? (h < 10 ? 0 : '') + h + ":" : ''
			var mDisplay = (m < 10 ? '0' : '') + m + ":"
			var sDisplay = (s < 10 ? '0' : '') + s
			return hDisplay + mDisplay + sDisplay; 
		},
		refreshProgressBar() {
			this.currentTime = this.secondsToTime(this.$refs.player.currentTime)
			this.$refs.progress.style.width = `${this.progressBarWidth()}%`
		}
	},
	mounted() {
		this.track = Object.assign({}, this.getTrack)
		this.$refs.player.src = this.getTrack.track_url
		this.play()
		this.$refs.player.ontimeupdate = () => {
			this.refreshProgressBar()
		}
		this.$refs.player.onended = () => {
			this.playNext()
		}
	},
	
}
</script>

<style lang="sass" scoped>
@import '~@styles/components/player.sass'
</style>