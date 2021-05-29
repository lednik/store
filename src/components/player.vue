<template>
<div class="player">
	<div class="player__content">
		<div class="player__info">
			<div class="player__name">
				Название трека
			</div>
			<div class="player__author">
				Имя исполнителя
			</div>
		</div>
		<div class="player__controls">
			<div class="player__control player__prev scale">
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M27 30V10L13 19.7872L27 30Z" fill="white"/>
				<rect width="2" height="19" transform="matrix(-1 0 0 1 15 10.5)" fill="white"/>
				</svg>
			</div>
			<div
				class="player__control player__play scale"
				@click="toggleTrack"
			>
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M4 30V2L32 15.7021L4 30Z" fill="white"/>
				</svg>
			</div>
			<div class="player__control player__next scale">
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M13 30V10L27 19.7872L13 30Z" fill="white"/>
				<rect x="25" y="10.5" width="2" height="19" fill="white"/>
				</svg>
			</div>
		</div>
		<div class="player__current">
			2:48
		</div>
		<div class="player__bar" ref="progressbar" @click="moveTrack">
			<div class="player__bar-progress" ref="progress">
				<div class="player__bar-line">
					<div class="player__bar-circle" />
				</div>
			</div>
		</div>
		<div class="player__total">
			12:48
		</div>
		<div class="player__volume">
			<div class="player__volume-icon">
				<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M18.0558 6.70779V4C23.1732 5.19325 27 9.88114 27 15.5C27 21.1189 23.1732 25.8067 18.0558 27V24.2922C21.7485 23.1645 24.4445 19.6568 24.4445 15.5C24.4445 11.3432 21.7485 7.83553 18.0558 6.70779Z" fill="white"/>
				<path d="M4 11.5662V19.434H9.11095L15.4997 25.9904V5.00974L9.11095 11.5662H4Z" fill="white"/>
				<path d="M21.2502 15.5C21.2502 13.1856 19.9469 11.1858 18.0558 10.222V20.7845C19.9469 19.8142 21.2502 17.8144 21.2502 15.5Z" fill="white"/>
				</svg>
			</div>
			<div class="player__volume-bar">
				<div class="player__volume-progress">
					<div class="player__volume-line">
						<div class="player__volume-circle" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<audio ref="player">
		<source src="src/assets/images/file_example_MP3_700KB.mp3" type="audio/mpeg">
	</audio>
</div>
</template>

<script>
export default {
	computed: {
	},
  methods: {
		toggleTrack() {
			if(this.$refs.player.paused) {
				this.play()
			} else {
				this.pause()
			}
		},
		moveTrack(e) {
			console.log('here');
      let rect = this.$refs.progressbar.getBoundingClientRect();
      let width = rect.right - rect.left;
			// let el = document.querySelector('.player__bar')
			// let width =  el.clientWidth
      let x = (e.offsetX === undefined) ? e.layerX : e.offsetX;
      let value = (x / width) * 100;
      let allTime = this.$refs.player.duration;
      let time = Math.floor(allTime * (x / width));
      this.$refs.player.currentTime = time;
			this.$refs.progress.style.transition = '0s';
      this.$refs.progress.style.width = value + '%';
			setTimeout(() => {
				this.$refs.progress.style.transition = '0.5s';
			}, 100)
    },
		progressBarWidth() {
			return this.$refs.player.currentTime / this.$refs.player.duration * 100
		},
		play() {
			this.$refs.player.play()
		},
		pause() {
			this.$refs.player.pause()
		},
		refreshProgressBar() {
			this.$refs.progress.style.width = `${this.progressBarWidth()}%`
		}
	},
	mounted() {
		this.$refs.player.ontimeupdate = () => {
			this.refreshProgressBar()
		}
	},
	
}
</script>

<style lang="sass" scoped>
@import '~@styles/components/player.sass'
</style>