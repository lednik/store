<template>
<div class="player">
	<div class="arrow" @click.stop="closePlayer">
        <div class="arrow-content">
            <div class="arrow__line arrow__line_first" />
            <div class="arrow__line arrow__line_second" />
        </div>
    </div>
	<transition name="player">
	<div v-show="fullPlayer" class="player-mobile mb">
		<div class="player-mobile__top">
			<div @click="toggleFullPlayer" class="player-mobile__hide">
				<svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4 5L14 15L24 5" stroke="white" stroke-width="2"/>
				</svg>
			</div>
			<div class="player-mobile__close" @click="closePlayer">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L19 19M19 1L1 19" stroke="white" stroke-width="2" stroke-linecap="round"/>
				</svg>
			</div>
		</div>
		<div class="player-mobile__poster">
			<svg v-if="!track.album_poster_url" width="53" height="60" viewBox="0 0 53 60" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M52 13.2477V2L18.7872 6.77855V18.0262M52 13.2477L18.7872 18.0262M52 13.2477V46.9908M18.7872 18.0262V51.7693M18.7872 51.7693C18.7872 55.7627 14.8054 59 9.89362 59C4.98181 59 1 55.7627 1 51.7693C1 47.776 4.98181 44.5387 9.89362 44.5387C14.8054 44.5387 18.7872 47.776 18.7872 51.7693ZM52 46.9908C52 50.9842 48.0182 54.2215 43.1064 54.2215C38.1946 54.2215 34.2128 50.9842 34.2128 46.9908C34.2128 42.9974 38.1946 39.7601 43.1064 39.7601C48.0182 39.7601 52 42.9974 52 46.9908Z" stroke="white" stroke-width="2"/>
			</svg>
			<img v-else :src="track.album_poster_url" alt="poster">
		</div>
		<div class="player-mobile__name">
			{{ track.title }}
		</div>
		<div class="player-mobile__author">
			{{ track.artist }}
		</div>
		<div class="player-mobile__bar">
			<div class="player__bar" ref="progressbarmobile" @click="moveTrackMobile">
				<div class="player__bar-progress" ref="progressmobile">
					<div class="player__bar-line">
						<div class="player__bar-circle" />
					</div>
				</div>
			</div>
		</div>
		<div class="player-mobile__times">
			<div class="player-mobile__current">
				{{ currentTime }}
			</div>
			<div class="player-mobile__total">
				{{ track.duration_str }}
			</div>
		</div>
		<div class="player-mobile__controls">
			<div class="player-mobile__control player-mobile__prev scale" @click="playPrev">
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M27 30V10L13 19.7872L27 30Z" fill="white"/>
				<rect width="2" height="19" transform="matrix(-1 0 0 1 15 10.5)" fill="white"/>
				</svg>
			</div>
			<div
				class="player-mobile__control player-mobile__play scale"
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
			<div class="player-mobile__control player-mobile__next scale" @click="playNext">
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M13 30V10L27 19.7872L13 30Z" fill="white"/>
				<rect x="25" y="10.5" width="2" height="19" fill="white"/>
				</svg>
			</div>
		</div>
	</div>
	</transition>
	<div @click="toggleFullPlayer" class="player__content">
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
				@click.stop="toggleTrack"
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
			{{ track.duration_str }}
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
				<div class="player__volume-bar" ref="valuebartablet" @click="changeValueTablet">
					<div ref="valuetablet" class="player__volume-progress">
						<div class="player__volume-line">
							<div class="player__volume-circle" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<audio ref="player">
		<source v-if="source" class="source" ref="source" type="audio/mpeg">
	</audio>
</div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex';
// import Vue from 'vue'
export default {
	computed: {
		...mapState('playlist', ['currentIndex', 'isPlaying', 'waitingToggle']),
		...mapGetters('playlist', ['getTrack']),
	},
	watch: {
		'currentIndex': function () {
			// this.source = false
			this.track = Object.assign({}, this.getTrack)
			this.pause()
			this.$refs.source.src = this.getTrack.track_url
			this.$refs.player.load()
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
			isVolumeBar: false,
			fullPlayer: false,
			isMobile: false,
			source: true
        }
    },
  	methods: {
		...mapMutations('playlist', ['playNext','playPrev', 'setIsPlaying', 'setWaitingToggle', 'closePlaylist']),
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
		toggleFullPlayer() {
			if (this.isMobile) {
				document.body.style.overflowY = this.fullPlayer? 'auto' : 'hidden'
				this.fullPlayer = !this.fullPlayer
			}
		},
		closePlayer() {
			this.pause()
			document.body.style.overflowY = 'auto'
			this.closePlaylist()
		},
		changeValue(e) {
			let value = this.getClickPosition(e, 'valuebar')
			let percent = value * 100
			this.$refs.player.volume = value
			this.$refs.value.style.width = percent + '%';
		},
		changeValueTablet(e) {
			let value = this.getClickPosition(e, 'valuebartablet')
			let percent = value * 100
			this.$refs.player.volume = value
			this.$refs.valuetablet.style.width = percent + '%';
		},
		moveTrackMobile(e) {
			let value = this.getClickPosition(e, 'progressbarmobile')
			// let percent = value * 100
    		let allTime = this.$refs.player.duration;
    		let time = Math.floor(allTime * (value));
    		this.$refs.player.currentTime = time;
		},
		moveTrack(e) {
			let value = this.getClickPosition(e, 'progressbar')
    		let allTime = this.$refs.player.duration;
    		let time = Math.floor(allTime * (value));
    		this.$refs.player.currentTime = time;
    	},
		progressBarWidth() {
			return this.$refs.player.currentTime / this.$refs.player.duration * 100
		},
		play() {
			this.setIsPlaying(true)
			this.$refs.player.play()
		},
		pause() {
			this.setIsPlaying(false)
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
		refreshProgressBar(ref) {
			if(this.$refs[ref]) {
				this.currentTime = this.secondsToTime(this.$refs.player.currentTime)
				this.$refs[ref].style.width = `${this.progressBarWidth()}%`	
			}
			
		}
	},
	mounted() {
		if (window.innerWidth < 768) {
			this.isMobile = true
		}
		this.track = Object.assign({}, this.getTrack)
		this.$refs.source.src = this.getTrack.track_url
		this.play()
		this.$refs.player.ontimeupdate = () => {
			this.refreshProgressBar('progress')
			this.refreshProgressBar('progressmobile')
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