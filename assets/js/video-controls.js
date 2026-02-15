(function () {
	var players = document.querySelectorAll('[data-video-player]');
	if (!players.length) return;

	players.forEach(function (player) {
		var video = player.querySelector('video');
		var toggleBtn = player.querySelector('[data-action="toggle"]');
		var muteBtn = player.querySelector('[data-action="mute"]');
		var fullscreenBtn = player.querySelector('[data-action="fullscreen"]');
		var seek = player.querySelector('[data-action="seek"]');
		var toggleIcon = toggleBtn ? toggleBtn.querySelector('.icon') : null;
		var muteIcon = muteBtn ? muteBtn.querySelector('.icon') : null;
		var fullscreenIcon = fullscreenBtn ? fullscreenBtn.querySelector('.icon') : null;

		if (!video || !toggleBtn || !muteBtn || !fullscreenBtn || !seek || !toggleIcon || !muteIcon || !fullscreenIcon) return;

		function updateToggleIcon() {
			toggleIcon.classList.toggle('fa-play', video.paused);
			toggleIcon.classList.toggle('fa-pause', !video.paused);
		}

		function updateMuteIcon() {
			muteIcon.classList.toggle('fa-volume-up', !video.muted);
			muteIcon.classList.toggle('fa-volume-mute', video.muted);
		}

		function updateProgress() {
			if (!video.duration || Number.isNaN(video.duration)) {
				seek.value = 0;
				return;
			}

			seek.value = (video.currentTime / video.duration) * 100;
		}

		function inFullscreen() {
			return document.fullscreenElement === video || document.webkitFullscreenElement === video;
		}

		function updateFullscreenIcon() {
			var full = inFullscreen();
			fullscreenIcon.classList.toggle('fa-expand', !full);
			fullscreenIcon.classList.toggle('fa-compress', full);
		}

			function tryAutoplay() {
				var playPromise = video.play();

				if (playPromise && typeof playPromise.catch === 'function') {
					playPromise.catch(function () {
						video.muted = true;
						updateMuteIcon();
						var mutedPromise = video.play();
						if (mutedPromise && typeof mutedPromise.catch === 'function') {
							mutedPromise.catch(function () {});
						}
					});
				}
			}

		toggleBtn.addEventListener('click', function () {
			if (video.paused) {
				video.play();
			} else {
				video.pause();
			}
		});

		muteBtn.addEventListener('click', function () {
			video.muted = !video.muted;
			updateMuteIcon();
		});

		fullscreenBtn.addEventListener('click', function () {
			if (!inFullscreen()) {
				if (video.requestFullscreen) {
					video.requestFullscreen();
				} else if (video.webkitRequestFullscreen) {
					video.webkitRequestFullscreen();
				} else if (video.webkitEnterFullscreen) {
					video.webkitEnterFullscreen();
				}
			} else if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		});

		seek.addEventListener('input', function () {
			if (!video.duration || Number.isNaN(video.duration)) return;
			video.currentTime = (parseFloat(seek.value) / 100) * video.duration;
		});

		video.addEventListener('play', updateToggleIcon);
		video.addEventListener('pause', updateToggleIcon);
		video.addEventListener('loadedmetadata', updateProgress);
		video.addEventListener('timeupdate', updateProgress);
		video.addEventListener('volumechange', updateMuteIcon);
		document.addEventListener('fullscreenchange', updateFullscreenIcon);
		document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);

		video.addEventListener('click', function () {
			if (video.paused) {
				video.play();
			} else {
				video.pause();
			}
		});

		var autoplayTriggered = false;
		var autoplayTimer = null;

		function triggerAutoplayOnce() {
			if (autoplayTriggered) return;
			autoplayTriggered = true;
			if (autoplayTimer) clearTimeout(autoplayTimer);
			window.removeEventListener('scroll', onFirstScroll);
			tryAutoplay();
		}

		function onFirstScroll() {
			triggerAutoplayOnce();
		}

			function armAutoplayTriggers() {
				autoplayTimer = window.setTimeout(triggerAutoplayOnce, 10000);
				window.addEventListener('scroll', onFirstScroll, { passive: true });
			}

			if (document.readyState === 'complete') {
				armAutoplayTriggers();
			} else {
				window.addEventListener('load', armAutoplayTriggers, { once: true });
			}

			video.muted = true;
			updateToggleIcon();
			updateMuteIcon();
			updateFullscreenIcon();
		updateProgress();
	});
})();
