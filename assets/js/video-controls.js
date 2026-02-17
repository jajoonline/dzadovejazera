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
		var isScrubbing = false;

		function setSeekProgressVisual(value) {
			var percent = Math.max(0, Math.min(100, value || 0));
			seek.style.setProperty('--seek-progress', percent.toFixed(2) + '%');
		}

		function seekToPercent(percent) {
			if (!video.duration || Number.isNaN(video.duration)) return;
			var clamped = Math.max(0, Math.min(100, percent));
			video.currentTime = (clamped / 100) * video.duration;
		}

		function updateToggleIcon() {
			toggleIcon.classList.toggle('fa-play', video.paused);
			toggleIcon.classList.toggle('fa-pause', !video.paused);
		}

		function updateMuteIcon() {
			muteIcon.classList.toggle('fa-volume-up', !video.muted);
			muteIcon.classList.toggle('fa-volume-mute', video.muted);
		}

		function updateProgress() {
			if (isScrubbing) return;
			if (!video.duration || Number.isNaN(video.duration)) {
				seek.value = 0;
				setSeekProgressVisual(0);
				return;
			}

			var percent = (video.currentTime / video.duration) * 100;
			seek.value = percent;
			setSeekProgressVisual(percent);
		}

		function isVideoFullscreen() {
			return document.fullscreenElement === video || document.webkitFullscreenElement === video || !!video.webkitDisplayingFullscreen;
		}

		function updateFullscreenIcon() {
			var full = isVideoFullscreen();
			fullscreenIcon.classList.toggle('fa-expand', !full);
			fullscreenIcon.classList.toggle('fa-compress', full);
		}

		function playWithSound() {
			video.muted = false;
			updateMuteIcon();
			var playPromise = video.play();
			if (playPromise && typeof playPromise.catch === 'function') {
				playPromise.catch(function () {});
			}
			return playPromise;
		}

		function ensureFullscreenPlayback() {
			if (!isVideoFullscreen()) return;
			playWithSound();
		}

		function tryAutoplay(onDone) {
			var playPromise = video.play();

			if (playPromise && typeof playPromise.catch === 'function') {
				playPromise.then(function () {
					if (typeof onDone === 'function') onDone(true);
				}).catch(function () {
					video.muted = true;
					updateMuteIcon();
					var mutedPromise = video.play();
					if (mutedPromise && typeof mutedPromise.catch === 'function') {
						mutedPromise.then(function () {
							if (typeof onDone === 'function') onDone(true);
						}).catch(function () {
							if (typeof onDone === 'function') onDone(false);
						});
						return;
					}
					if (typeof onDone === 'function') onDone(!video.paused);
				});
				return;
			}

			// Browsers without promise support.
			if (typeof onDone === 'function') onDone(!video.paused);
		}

		function requestFullscreenForVideo() {
			if (video.requestFullscreen) {
				video.requestFullscreen();
			} else if (video.webkitRequestFullscreen) {
				video.webkitRequestFullscreen();
			} else if (video.webkitEnterFullscreen) {
				video.webkitEnterFullscreen();
			}
		}

		function enterFullscreenWithPlayback() {
			var playPromise = playWithSound();
			if (playPromise && typeof playPromise.then === 'function') {
				playPromise.then(function () {
					requestFullscreenForVideo();
				}).catch(function () {
					requestFullscreenForVideo();
				});
				return;
			}
			requestFullscreenForVideo();
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
			if (!isVideoFullscreen()) {
				enterFullscreenWithPlayback();
			} else if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		});

		seek.addEventListener('pointerdown', function () {
			isScrubbing = true;
		});
		seek.addEventListener('pointerup', function () {
			isScrubbing = false;
			seekToPercent(parseFloat(seek.value));
			updateProgress();
		});
		seek.addEventListener('pointercancel', function () {
			isScrubbing = false;
			updateProgress();
		});
		seek.addEventListener('touchstart', function () {
			isScrubbing = true;
		}, { passive: true });
		seek.addEventListener('touchend', function () {
			isScrubbing = false;
			seekToPercent(parseFloat(seek.value));
			updateProgress();
		}, { passive: true });
		seek.addEventListener('mousedown', function () {
			isScrubbing = true;
		});
		seek.addEventListener('mouseup', function () {
			isScrubbing = false;
			seekToPercent(parseFloat(seek.value));
			updateProgress();
		});
		seek.addEventListener('input', function () {
			var percent = parseFloat(seek.value);
			setSeekProgressVisual(percent);
			seekToPercent(percent);
		});
		seek.addEventListener('change', function () {
			var percent = parseFloat(seek.value);
			seekToPercent(percent);
			setSeekProgressVisual(percent);
			isScrubbing = false;
			updateProgress();
		});

		video.addEventListener('play', updateToggleIcon);
		video.addEventListener('pause', updateToggleIcon);
		video.addEventListener('loadedmetadata', updateProgress);
		video.addEventListener('timeupdate', updateProgress);
		video.addEventListener('volumechange', updateMuteIcon);
		document.addEventListener('fullscreenchange', updateFullscreenIcon);
		document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
		document.addEventListener('fullscreenchange', ensureFullscreenPlayback);
		document.addEventListener('webkitfullscreenchange', ensureFullscreenPlayback);
		video.addEventListener('webkitbeginfullscreen', ensureFullscreenPlayback);
		video.addEventListener('webkitendfullscreen', updateFullscreenIcon);

		var autoplayTriggered = false;
		var autoplayRequested = false;
		var autoplayInProgress = false;
		var autoplayStartTs = Date.now();
		var autoplayDelayTimer = null;
		var pausedByViewport = false;
		var autoplayDelaySessionKey = 'video_autoplay_min_delay_done';

		function triggerAutoplayOnce() {
			if (autoplayTriggered || autoplayInProgress) return;
			autoplayInProgress = true;
			if (autoplayDelayTimer) {
				window.clearTimeout(autoplayDelayTimer);
				autoplayDelayTimer = null;
			}
			// iOS autoplay reliability: enforce muted before autoplay attempts.
			video.muted = true;
			updateMuteIcon();
			tryAutoplay(function (ok) {
				autoplayInProgress = false;
				if (ok) {
					autoplayTriggered = true;
					window.removeEventListener('scroll', onFirstScroll);
					video.removeEventListener('loadeddata', onVideoReadyForAutoplay);
					video.removeEventListener('canplay', onVideoReadyForAutoplay);
					video.removeEventListener('canplaythrough', onVideoReadyForAutoplay);
					try {
						window.sessionStorage.setItem(autoplayDelaySessionKey, '1');
					} catch (e) {}
					return;
				}

				// Keep trying on iOS/network edge cases where first attempt gets rejected.
				autoplayRequested = false;
				window.setTimeout(function () {
					if (!autoplayTriggered) requestAutoplayOnce();
				}, 1200);
			});
		}

		function requestAutoplayOnce() {
			if (autoplayTriggered || autoplayRequested) return;
			autoplayRequested = true;

			var useMinDelay = true;
			try {
				useMinDelay = window.sessionStorage.getItem(autoplayDelaySessionKey) !== '1';
			} catch (e) {
				useMinDelay = true;
			}

			var elapsed = Date.now() - autoplayStartTs;
			var minAutoplayDelay = useMinDelay ? 4000 : 0;
			var wait = Math.max(0, minAutoplayDelay - elapsed);
			if (!wait) {
				triggerAutoplayOnce();
				return;
			}
			autoplayDelayTimer = window.setTimeout(triggerAutoplayOnce, wait);
		}

		function onFirstScroll() {
			requestAutoplayOnce();
		}

		function onVideoReadyForAutoplay() {
			requestAutoplayOnce();
		}

		function armAutoplayTriggers() {
			window.addEventListener('scroll', onFirstScroll, { passive: true });
			video.addEventListener('loadeddata', onVideoReadyForAutoplay);
			video.addEventListener('canplay', onVideoReadyForAutoplay);
			video.addEventListener('canplaythrough', onVideoReadyForAutoplay);
			// Deadlock breaker for iOS/preload=metadata: start timer path even without canplay.
			window.setTimeout(requestAutoplayOnce, 50);

			if (video.readyState >= 3) {
				requestAutoplayOnce();
			}
		}

		function handleViewportPlayback(visible) {
			if (!visible) {
				if (!video.paused) {
					video.pause();
					pausedByViewport = true;
				}
				return;
			}

			if (pausedByViewport) {
				pausedByViewport = false;
				tryAutoplay();
			}
		}

		function setupViewportWatcher() {
			if ('IntersectionObserver' in window) {
				var observer = new IntersectionObserver(function (entries) {
					if (!entries.length) return;
					handleViewportPlayback(entries[0].isIntersecting && entries[0].intersectionRatio > 0.15);
				}, {
					threshold: [0, 0.15]
				});
				observer.observe(video);
				return;
			}

			function onViewportCheck() {
				var r = video.getBoundingClientRect();
				var vh = window.innerHeight || document.documentElement.clientHeight;
				var vw = window.innerWidth || document.documentElement.clientWidth;
				var visible = r.bottom > 0 && r.right > 0 && r.top < vh && r.left < vw;
				handleViewportPlayback(visible);
			}

			window.addEventListener('scroll', onViewportCheck, { passive: true });
			window.addEventListener('resize', onViewportCheck);
			onViewportCheck();
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
		setSeekProgressVisual(parseFloat(seek.value));
		setupViewportWatcher();
	});
})();
