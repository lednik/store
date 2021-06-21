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
			<svg v-if="!track.cover_file_id_url" width="53" height="60" viewBox="0 0 53 60" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M52 13.2477V2L18.7872 6.77855V18.0262M52 13.2477L18.7872 18.0262M52 13.2477V46.9908M18.7872 18.0262V51.7693M18.7872 51.7693C18.7872 55.7627 14.8054 59 9.89362 59C4.98181 59 1 55.7627 1 51.7693C1 47.776 4.98181 44.5387 9.89362 44.5387C14.8054 44.5387 18.7872 47.776 18.7872 51.7693ZM52 46.9908C52 50.9842 48.0182 54.2215 43.1064 54.2215C38.1946 54.2215 34.2128 50.9842 34.2128 46.9908C34.2128 42.9974 38.1946 39.7601 43.1064 39.7601C48.0182 39.7601 52 42.9974 52 46.9908Z" stroke="white" stroke-width="2"/>
			</svg>
			<img v-else :src="track.cover_file_id_thumb" alt="poster">
		</div>
		<div class="player-mobile__name">
			{{ track.title }}
		</div>
		<div class="player-mobile__author">
			{{ track.artist }}
		</div>
		<div class="player-mobile__bar">
			<div class="player__bar" ref="progressbarmobile">
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
		<div class="player__bar" ref="progressbar">
			<div class="player__bar-progress" ref="progress">
				<div class="player__bar-line">
					<div ref="barcircle" class="player__bar-circle" />
				</div>
			</div>
		</div>
		<div class="player__total">
			{{ track.duration_str }}
		</div>
		<div class="player__volume">
			<div class="player__volume-icon" @click="toggleVolume">
				<svg v-if="volume > 0.6" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M18.0558 6.70779V4C23.1732 5.19325 27 9.88114 27 15.5C27 21.1189 23.1732 25.8067 18.0558 27V24.2922C21.7485 23.1645 24.4445 19.6568 24.4445 15.5C24.4445 11.3432 21.7485 7.83553 18.0558 6.70779Z" fill="white"/>
					<path d="M4 11.5662V19.434H9.11095L15.4997 25.9904V5.00974L9.11095 11.5662H4Z" fill="white"/>
					<path d="M21.2502 15.5C21.2502 13.1856 19.9469 11.1858 18.0558 10.222V20.7845C19.9469 19.8142 21.2502 17.8144 21.2502 15.5Z" fill="white"/>
				</svg>

				<svg v-if="volume <= 0.6 && volume > 0" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4 11.5662V19.434H9.11095L15.4997 25.9905V5.00977L9.11095 11.5662H4Z" fill="white"/>
					<path d="M21.2502 15.5C21.2502 13.1856 19.9469 11.1858 18.0558 10.222V20.7845C19.9469 19.8142 21.2502 17.8144 21.2502 15.5Z" fill="white"/>
				</svg>

				<svg v-if="volume == 0" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4 19.434V11.5662H9.11095L15.4997 5.00977V25.9905L9.11095 19.434H4Z" fill="white"/>
					<path d="M28.1818 9L24 13.1818L19.8182 9L18 10.8182L22.1818 15L18 19.1818L19.8182 21L24 16.8182L28.1818 21L30 19.1818L25.8182 15L30 10.8182L28.1818 9Z" fill="white"/>
				</svg>
			</div>
			<div class="player__volume-wrapper dt">
				<div class="player__volume-bar" ref="valuebar">
					<div ref="value" class="player__volume-progress">
						<div class="player__volume-line">
							<div ref="circle" class="player__volume-circle" />
						</div>
					</div>
				</div>
			</div>
			<div v-show="isVolumeBar" class="player__volume-wrapper mb">
				<div class="player__volume-bar" ref="valuebartablet">
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
export default {
	computed: {
		...mapState('playlist', ['currentIndex', 'isPlaying', 'waitingToggle']),
		...mapGetters('playlist', ['getTrack']),
	},
	watch: {
		'currentIndex': function () {
			this.setTrack()
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
			isTablet: false,
			source: true,
			volume: 1,
			prevVolume: 1
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
		setVolume(value) {
			this.volume = value
			this.$refs.player.volume = value
		},
		toggleVolume() {
			if (this.isTablet) {
				this.isVolumeBar = !this.isVolumeBar
			} else {
				if (this.$refs.player.volume == 0) {
					this.$refs.player.volume = this.prevVolume
					this.volume = this.prevVolume
					this.$refs.value.style.width = this.prevVolume * 100 + '%';
					this.$refs.value.style.width = this.prevVolume * 100 + '%';
				} else {
					this.prevVolume = this.volume
					this.volume = 0
					this.$refs.player.volume = 0
					this.$refs.value.style.width = '0%';
					this.$refs.value.style.width = '0%';
				}
			}
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
			var mDisplay = m > 0 ?  m + ":" :  '0:'
			var sDisplay = (s < 10 ? '0' : '') + s
			return hDisplay + mDisplay + sDisplay; 
		},
		refreshProgressBar(ref) {
			if(this.$refs[ref]) {
				this.currentTime = this.secondsToTime(this.$refs.player.currentTime)
				this.$refs[ref].style.width = `${this.progressBarWidth()}%`	
			}
		},
		dragAndDropPosition(e, parentRef) {
			let rect = this.$refs[parentRef].getBoundingClientRect()
			let x
			if(e.pageX) {
				x = e.pageX
			} else if(e.touches[0] && e.touches[0].clientX) {
				x = e.touches[0].clientX
			} else {
				x = e.changedTouches[0].clientX
			}

			let value
			if (x < rect.left) {
				value = 0
			} else if (x > rect.right) {
				value = 1
			} else {
				value =  (x - rect.left) / (rect.right - rect.left)
			}
			return value
		},
		dragItem(e, ref, parentRef) {
			let position = this.dragAndDropPosition(e, parentRef)
			let percent = position * 100
			this.$refs[ref].style.width = percent + '%';
			return position
		},
		refreshVolume(e, ref, parentRef) {
			let position = this.dragItem(e, ref, parentRef)
			this.$refs.player.volume = position
			this.volume = position
		},
		refreshProgressBarLine(e, ref, parentRef, isMouseUp = false) {
			let position = this.dragItem(e, ref, parentRef)
			if (isMouseUp) {
				let allTime = this.$refs.player.duration;
				let time = Math.floor(allTime * (position));
    			this.$refs.player.currentTime = time;
			}
		},
		startOnTimeUpdateEvents() {
			console.log('here');
			this.$refs.player.ontimeupdate = () => {
				this.refreshProgressBar('progress')
				this.refreshProgressBar('progressmobile')
			}
		},
		startValueEvents(ref, parentRef) {
			if (this.$refs[parentRef]) {
				this.$refs[parentRef].onmousedown = (e) => {
					document.onmousemove = (e) => {
						this.refreshVolume(e, ref, parentRef)
					}
					document.onmouseup = (e) => {
						this.refreshVolume(e, ref, parentRef)
						document.onmousemove = null
						document.onmouseup = null
					}
				}
			}
		},
		startBarEvents(ref, parentRef) {
			let event = this.isMobile ? 'ontouchstart' : 'onmousedown'
			let moveEvent = this.isMobile ? 'ontouchmove' : 'onmousemove'
			let endEvent = this.isMobile ? 'ontouchend' : 'onmouseup'
			
			this.$refs[parentRef][event] = () => {
				this.$refs.player.ontimeupdate = null
				document[moveEvent] = (e) => {
					this.refreshProgressBarLine(e, ref, parentRef)
				}
				document[endEvent] = (e) => {
					this.refreshProgressBarLine(e, ref, parentRef, true)
					document[moveEvent] = null
					document[endEvent] = null
					this.startOnTimeUpdateEvents()
				}
			}
		},
		setTrack() {
			this.track = Object.assign({}, this.getTrack)
			this.$refs.source.src = this.getTrack.demo_file_id_url
			this.$refs.player.load()
			this.play()
		}
	},
	mounted() {
		let screenWidth = window.innerWidth
		if (screenWidth < 768) {
			this.isMobile = true
		}
		if (screenWidth < 1025 && screenWidth > 767) {
			this.isTablet = true
		}
		this.$refs.player.volume = 1
		this.volume = 1
		this.setTrack()
		this.startOnTimeUpdateEvents()
		this.$refs.player.onended = () => {
			this.playNext()
		}
		this.startValueEvents('value', 'valuebar')
		this.startValueEvents('valuetablet', 'valuebartablet')
		this.startBarEvents('progress' ,'progressbar')
		this.startBarEvents('progressmobile' ,'progressbarmobile')
	}
}
</script>

<style lang="sass" scoped>
@import '~@styles/components/player.sass'
</style>