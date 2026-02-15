(function () {
	var wrapper = document.getElementById('wrapper');
	var layer = document.getElementById('rainfx');
	if (!wrapper || !layer) return;

	var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reducedMotion) return;

	var mobile = window.matchMedia('(max-width: 736px)').matches;
	var dropSvg = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 46"><path fill="rgba(92, 122, 148, 0.72)" d="M14 1C14 1 2 17 2 28c0 7.4 5.8 13 12 13s12-5.6 12-13C26 17 14 1 14 1z"/></svg>');
	var drops = [];
	var resizeTimer = null;

	function getWrapperHeight() {
		return Math.max(wrapper.scrollHeight, wrapper.offsetHeight, window.innerHeight);
	}

	function updateDurations() {
		var wrapperHeight = getWrapperHeight();
		var travelDistance = wrapperHeight * 1.2;

		for (var i = 0; i < drops.length; i++) {
			var drop = drops[i];
			var speed = parseFloat(drop.dataset.speed);
			var duration = travelDistance / speed;
			var phase = parseFloat(drop.dataset.phase);
			drop.style.setProperty('--duration', duration.toFixed(2) + 's');
			drop.style.setProperty('--delay', (-phase * duration).toFixed(2) + 's');
		}
	}

	function getDropCount() {
		var wrapperHeight = getWrapperHeight();
		var density = mobile ? 170 : 120;
		var minDrops = mobile ? 28 : 52;
		var maxDrops = mobile ? 80 : 140;
		return Math.max(minDrops, Math.min(maxDrops, Math.round(wrapperHeight / density)));
	}

	var dropCount = getDropCount();

	for (var i = 0; i < dropCount; i++) {
		var drop = document.createElement('span');
		drop.className = 'rain-drop';
		drop.dataset.speed = (Math.random() * 70 + 140).toFixed(2);
		drop.dataset.phase = Math.random().toFixed(4);
		drop.style.setProperty('--x', (Math.random() * 100).toFixed(2));
		drop.style.setProperty('--drift', (Math.random() * 8 - 4).toFixed(2));
		drop.style.setProperty('--size', (Math.random() * 0.55 + 0.5).toFixed(2) + 'rem');
		drop.style.setProperty('--opacity', (Math.random() * 0.24 + 0.30).toFixed(2));
		drop.style.backgroundImage = 'url("data:image/svg+xml;utf8,' + dropSvg + '")';
		layer.appendChild(drop);
		drops.push(drop);
	}

	updateDurations();

	window.addEventListener('load', updateDurations);
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(updateDurations, 120);
	});
})();
