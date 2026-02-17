(function () {
	var logoImg = document.querySelector('#header .logo .symbol img');
	if (!logoImg) return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	var videoWrap = document.querySelector('.cta-video-player');
	var mainEl = document.getElementById('main');
	if (!videoWrap || !mainEl) return;
	var videoEl = videoWrap.querySelector('video');
	if (!videoEl) return;

	var rect = logoImg.getBoundingClientRect();
	if (!rect.width || !rect.height) return;

	var startLeft = rect.left + window.scrollX;
	var startTop = rect.top + window.scrollY;

	var margin = 24;
	var docWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, window.innerWidth);
	var docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight);

	function rand(min, max) {
		return Math.random() * (max - min) + min;
	}

	function clamp(v, min, max) {
		return Math.max(min, Math.min(max, v));
	}

	function pose(x, y, rotate, flipX) {
		var mirror = flipX < 0 ? -1 : 1;
		return 'translate(' + x.toFixed(2) + 'px, ' + y.toFixed(2) + 'px) rotate(' + rotate.toFixed(2) + 'deg) scaleX(' + mirror + ')';
	}

	var v = videoWrap.getBoundingClientRect();
	var videoLeft = v.left + window.scrollX;
	var videoTop = v.top + window.scrollY;
	var videoRight = videoLeft + v.width;
	var videoBottom = videoTop + v.height;
	var videoCenterX = videoLeft + v.width / 2;

	var zonePadding = 140;
	var videoZone = {
		minX: clamp(videoLeft - zonePadding, margin, docWidth - rect.width - margin),
		maxX: clamp(videoRight + zonePadding - rect.width, margin, docWidth - rect.width - margin),
		minY: clamp(videoTop - zonePadding, margin, docHeight - rect.height - margin),
		maxY: clamp(videoBottom + zonePadding - rect.height, margin, docHeight - rect.height - margin)
	};

	if (videoZone.minX > videoZone.maxX || videoZone.minY > videoZone.maxY) {
		videoZone = {
			minX: margin,
			maxX: Math.max(margin, docWidth - rect.width - margin),
			minY: margin,
			maxY: Math.max(margin, docHeight - rect.height - margin)
		};
	}

	var mainRect = mainEl.getBoundingClientRect();
	var mainLeft = mainRect.left + window.scrollX;
	var mainRight = mainLeft + mainRect.width;
	var mainBottom = mainRect.top + window.scrollY + mainRect.height;
	var emPx = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
	var bandHeight = 18 * emPx;

	var bottomZone = {
		minX: clamp(mainLeft + 20, margin, docWidth - rect.width - margin),
		maxX: clamp(mainRight - rect.width - 20, margin, docWidth - rect.width - margin),
		minY: clamp(mainBottom - bandHeight, margin, docHeight - rect.height - margin),
		maxY: clamp(mainBottom - rect.height - 8, margin, docHeight - rect.height - margin)
	};

	if (bottomZone.minX > bottomZone.maxX || bottomZone.minY > bottomZone.maxY) {
		bottomZone = Object.assign({}, videoZone);
	}

	function randomPoint(zone) {
		return {
			x: rand(zone.minX, zone.maxX),
			y: rand(zone.minY, zone.maxY)
		};
	}

	function randomVideoStart() {
		return randomPoint(videoZone);
	}

	function createFlyer(options) {
		var flyer = logoImg.cloneNode(true);
		flyer.classList.add('dragonfly-flyer');
		if (options.swarm) flyer.classList.add('dragonfly-flyer--swarm');
		flyer.setAttribute('aria-hidden', 'true');
		if (options.src) flyer.src = options.src;
		flyer.style.left = startLeft + 'px';
		flyer.style.top = startTop + 'px';
		flyer.style.width = (rect.width * options.size).toFixed(2) + 'px';
		flyer.style.height = (rect.height * options.size).toFixed(2) + 'px';
		if (options.filter) flyer.style.filter = options.filter;
		if (typeof options.opacity === 'number') flyer.style.opacity = String(options.opacity);
		return flyer;
	}

	function buildIntroToTarget(startAbs, zone, baseRotate, flipX, finalRel) {
		var keyframes = [];
		var roamEnd = 0.82;
		var hops = 6;
		var cursor = 0;
		var lastX = startAbs.x - startLeft;
		var lastY = startAbs.y - startTop;

		keyframes.push({ offset: 0, transform: pose(lastX, lastY, baseRotate, flipX) });

		for (var i = 0; i < hops; i++) {
			var remaining = roamEnd - cursor;
			if (remaining <= 0.02) break;

			var flight = Math.min(rand(0.06, 0.12), remaining * 0.68);
			var hold = Math.min(rand(0.03, 0.08), remaining - flight);
			if (hold < 0.015) hold = 0.015;

			var next = randomPoint(zone);
			var x = next.x - startLeft;
			var y = next.y - startTop;

			var midOffset = Math.min(cursor + flight * 0.55, roamEnd - 0.005);
			var midX = lastX + (x - lastX) * 0.55 + rand(-10, 10);
			var midY = lastY + (y - lastY) * 0.55 + rand(-10, 10);

			if (midOffset > cursor + 0.003) {
				keyframes.push({ offset: midOffset, transform: pose(midX, midY, baseRotate, flipX) });
			}

			cursor = Math.min(cursor + flight, roamEnd);
			keyframes.push({ offset: cursor, transform: pose(x, y, baseRotate, flipX) });

			cursor = Math.min(cursor + hold, roamEnd);
			keyframes.push({ offset: cursor, transform: pose(x, y, baseRotate, flipX) });

			lastX = x;
			lastY = y;
		}

		keyframes.push({
			offset: 0.93,
			transform: pose(lastX + (finalRel.x - lastX) * 0.45, lastY + (finalRel.y - lastY) * 0.45, baseRotate, flipX)
		});
		keyframes.push({ offset: 1, transform: pose(finalRel.x, finalRel.y, baseRotate, flipX) });

		return keyframes;
	}

	function buildBottomLoop(startRel, baseRotate, flipX) {
		var keyframes = [];
		var steps = 10;
		var cursor = 0;
		var lastX = startRel.x;
		var lastY = startRel.y;

		keyframes.push({ offset: 0, transform: pose(lastX, lastY, baseRotate, flipX) });

		for (var i = 0; i < steps; i++) {
			var remaining = 1 - cursor;
			if (remaining <= 0.08) break;

			var flight = Math.min(rand(0.06, 0.11), remaining * 0.7);
			var hold = Math.min(rand(0.02, 0.07), remaining - flight);
			if (hold < 0.012) hold = 0.012;

			var p = randomPoint(bottomZone);
			var x = p.x - startLeft;
			var y = p.y - startTop;

			var midOffset = Math.min(cursor + flight * 0.5, 1 - 0.01);
			var midX = lastX + (x - lastX) * 0.5 + rand(-12, 12);
			var midY = lastY + (y - lastY) * 0.5 + rand(-12, 12);

			if (midOffset > cursor + 0.003) {
				keyframes.push({ offset: midOffset, transform: pose(midX, midY, baseRotate, flipX) });
			}

			cursor = Math.min(cursor + flight, 1);
			keyframes.push({ offset: cursor, transform: pose(x, y, baseRotate, flipX) });

			cursor = Math.min(cursor + hold, 1);
			keyframes.push({ offset: cursor, transform: pose(x, y, baseRotate, flipX) });

			lastX = x;
			lastY = y;
		}

		keyframes.push({ offset: 1, transform: pose(startRel.x, startRel.y, baseRotate, flipX) });
		return keyframes;
	}

	function applyFadeIn(keyframes, targetOpacity) {
		var fadeWindow = 0.08;
		return keyframes.map(function (frame) {
			var o = targetOpacity;
			if (frame.offset <= 0) {
				o = 0;
			} else if (frame.offset < fadeWindow) {
				o = targetOpacity * (frame.offset / fadeWindow);
			}
			return {
				offset: frame.offset,
				transform: frame.transform,
				opacity: Math.max(0, Math.min(targetOpacity, o))
			};
		});
	}

	var introPhaseEnded = false;
	var introEndRequested = false;
	var introStartTs = Date.now();
	var introEndTimer = null;
	var introAnimations = [];
	var swarmLoopStarters = [];
	var mainFlyer = null;
	var mainAnimation = null;
	var sessionMainKey = 'dragonfly_main_intro_played';
	var shouldAnimateMain = true;

	try {
		shouldAnimateMain = window.sessionStorage.getItem(sessionMainKey) !== '1';
	} catch (e) {
		shouldAnimateMain = true;
	}

	if (shouldAnimateMain) {
		try {
			window.sessionStorage.setItem(sessionMainKey, '1');
		} catch (e) {}
	}

	function endIntroPhase() {
		if (introPhaseEnded) return;
		introPhaseEnded = true;
		videoEl.removeEventListener('loadeddata', requestEndIntroPhase);
		videoEl.removeEventListener('canplay', requestEndIntroPhase);
		videoEl.removeEventListener('canplaythrough', requestEndIntroPhase);
		if (introEndTimer) {
			window.clearTimeout(introEndTimer);
			introEndTimer = null;
		}

		if (mainFlyer && mainAnimation && mainAnimation.playState !== 'finished') {
			var total = 10000;
			try {
				if (mainAnimation.effect && typeof mainAnimation.effect.getTiming === 'function') {
					total = Number(mainAnimation.effect.getTiming().duration) || total;
				}
			} catch (e) {}

			var current = Number(mainAnimation.currentTime) || 0;
			var remaining = Math.max(0, total - current);
			if (remaining > 0) {
				// Mild acceleration only for the main dragonfly final approach.
				var targetMs = 1400;
				var speedUp = Math.max(1, remaining / targetMs);
				speedUp = Math.min(speedUp, 2.1);
				mainAnimation.playbackRate = speedUp;
			}
			try {
				mainAnimation.play();
			} catch (e) {}
		}

		// Keep all intros natural (no forced speed-up). Only ensure finished swarms enter loop.
		for (var i = 0; i < introAnimations.length; i++) {
			var anim = introAnimations[i];
			if (!anim) continue;
			if (anim === mainAnimation) continue;
			if (anim.playState === 'finished') {
				if (typeof anim.__startLoop === 'function') {
					anim.__startLoop();
				}
			}
		}
	}

	function requestEndIntroPhase() {
		if (introPhaseEnded || introEndRequested) return;
		introEndRequested = true;
		var elapsed = Date.now() - introStartTs;
		var minIntroDuration = 4000;
		var wait = Math.max(0, minIntroDuration - elapsed);
		if (!wait) {
			endIntroPhase();
			return;
		}
		introEndTimer = window.setTimeout(endIntroPhase, wait);
	}

	var mainCleaned = false;

	function cleanupMain() {
		if (mainCleaned) return;
		mainCleaned = true;
		if (!mainFlyer) return;

		// Prevent flash when swapping animated flyer for the static logo.
		logoImg.style.transition = 'none';
		logoImg.style.opacity = '1';
		document.body.classList.remove('logo-intro-active');

		// Brief crossfade out of the animated flyer avoids a single-frame blink.
		mainFlyer.style.transition = 'opacity 80ms linear';
		mainFlyer.style.opacity = '0';
		window.setTimeout(function () {
			mainFlyer.remove();
		}, 90);
	}

	if (shouldAnimateMain) {
		mainFlyer = createFlyer({ size: 1, swarm: false });
		var mainStart = randomVideoStart();
		var mainKeyframes = applyFadeIn(buildIntroToTarget(mainStart, videoZone, 0, 1, { x: 0, y: 0 }), 1);
		mainFlyer.style.transform = mainKeyframes[0].transform;
		document.body.appendChild(mainFlyer);
		document.body.classList.add('logo-intro-active');

		mainAnimation = mainFlyer.animate(mainKeyframes, {
			duration: 10000,
			iterations: 1,
			easing: 'ease-in-out',
			fill: 'forwards'
		});
		introAnimations.push(mainAnimation);
		mainAnimation.addEventListener('finish', cleanupMain);
		window.setTimeout(cleanupMain, 10200);
	} else {
		logoImg.style.opacity = '1';
		document.body.classList.remove('logo-intro-active');
	}

	for (var i = 0; i < 2; i++) {
		var flipX = i % 2 === 0 ? -1 : 1;
		var baseRotate = rand(-22, 22);
		var swarmFlyer = createFlyer({
			size: rand(0.72, 1.12),
			swarm: true,
			src: 'images/logo-dragonfly-light.svg',
			opacity: 0.9
		});

		var swarmStart = randomVideoStart();
		var bottomEntryAbs = randomPoint(bottomZone);
		var bottomEntryRel = {
			x: bottomEntryAbs.x - startLeft,
			y: bottomEntryAbs.y - startTop
		};
		var swarmIntro = applyFadeIn(buildIntroToTarget(swarmStart, videoZone, baseRotate, flipX, bottomEntryRel), 0.9);
		swarmFlyer.style.transform = swarmIntro[0].transform;
		document.body.appendChild(swarmFlyer);

		var introDelay = Math.round(rand(0, 600));
		var introAnim = swarmFlyer.animate(swarmIntro, {
			duration: 10000,
			delay: introDelay,
			iterations: 1,
			easing: 'ease-in-out',
			fill: 'forwards'
		});

		var startLoop = (function (node, rotate, mirror, startPoint) {
			var loopStarted = false;
			return function () {
				if (loopStarted) return;
				loopStarted = true;
				var loopKeyframes = buildBottomLoop(startPoint, rotate, mirror);
				node.animate(loopKeyframes, {
					duration: Math.round(rand(7000, 9800)),
					iterations: Infinity,
					easing: 'ease-in-out',
					fill: 'forwards'
				});
			};
		})(swarmFlyer, baseRotate, flipX, bottomEntryRel);
		introAnimations.push(introAnim);
		swarmLoopStarters.push(startLoop);
		introAnim.__startLoop = startLoop;
		introAnim.addEventListener('finish', startLoop);
	}

	if (videoEl.readyState >= 3) {
		requestEndIntroPhase();
	} else {
		videoEl.addEventListener('loadeddata', requestEndIntroPhase);
		videoEl.addEventListener('canplay', requestEndIntroPhase);
		videoEl.addEventListener('canplaythrough', requestEndIntroPhase);
	}
})();
