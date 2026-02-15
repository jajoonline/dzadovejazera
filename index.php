<?php
$layout = [
	'page_title_key' => 'page.home',
];
include __DIR__ . '/includes/layout-start.php';
?>
							<header>

								<div class="cta-video-player" data-video-player>
									<video class="cta-video" preload="metadata">
										<source src="videos/dazdove_jazera.mp4" type="video/mp4" />
										Váš prehliadač nepodporuje prehrávanie videa.
									</video>
									<div class="cta-video-controls">
										<button type="button" class="button small primary cta-control-btn" data-action="toggle" aria-label="Prehrať alebo pozastaviť video">
											<span class="icon solid fa-play" aria-hidden="true"></span>
										</button>
										<input type="range" min="0" max="100" value="0" step="0.1" data-action="seek" aria-label="Priebeh videa" />
										<button type="button" class="button small cta-control-btn" data-action="mute" aria-label="Zapnúť alebo vypnúť zvuk">
											<span class="icon solid fa-volume-up" aria-hidden="true"></span>
										</button>
										<button type="button" class="button small cta-control-btn" data-action="fullscreen" aria-label="Celá obrazovka">
											<span class="icon solid fa-expand" aria-hidden="true"></span>
										</button>
									</div>
									</div>
									<div class="intro-copy">
										<p><?php echo htmlspecialchars(t('index.intro.1'), ENT_QUOTES, 'UTF-8'); ?></p>
										<h3 class="cta-contact"><?php echo htmlspecialchars(t('index.cta'), ENT_QUOTES, 'UTF-8'); ?> <a href="#footer"><?php echo htmlspecialchars(t('index.cta.link'), ENT_QUOTES, 'UTF-8'); ?></a>.</h3>
										<p style="text-align: justify;"><?php echo htmlspecialchars(t('index.intro.2'), ENT_QUOTES, 'UTF-8'); ?></p>
										<p style="text-align: justify;"><?php echo htmlspecialchars(t('index.intro.3'), ENT_QUOTES, 'UTF-8'); ?></p>
									</div>
								</header>
							<section class="tiles">
								<article class="style1">
									<span class="image">
										<img src="images/pic01.jpg" alt="" />
									</span>
									<a href="generic.php">
										<h2>Magna</h2>
										<div class="content">
											<p>Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.</p>
										</div>
									</a>
								</article>
								<article class="style2">
									<span class="image">
										<img src="images/pic02.jpg" alt="" />
									</span>
									<a href="generic.php">
										<h2>Lorem</h2>
										<div class="content">
											<p>Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.</p>
										</div>
									</a>
								</article>
								<article class="style3">
									<span class="image">
										<img src="images/pic03.jpg" alt="" />
									</span>
									<a href="generic.php">
										<h2>Feugiat</h2>
										<div class="content">
											<p>Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.</p>
										</div>
									</a>
								</article>
									</section>
									<section style="margin-top: 3em;" class="intro-copy">
										<h2 id="prirodne"><?php echo htmlspecialchars(t('index.natural.title'), ENT_QUOTES, 'UTF-8'); ?></h2>
										<p style="text-align: justify;"><?php echo htmlspecialchars(t('index.natural.1'), ENT_QUOTES, 'UTF-8'); ?></p>
	
										<p style="text-align: justify;"><?php echo htmlspecialchars(t('index.natural.2'), ENT_QUOTES, 'UTF-8'); ?></p>
									</section>
									<section class="intro-copy">
										<h2 id="poloprirodne"><?php echo htmlspecialchars(t('index.semi.title'), ENT_QUOTES, 'UTF-8'); ?></h2>
										<p style="text-align: justify;"><?php echo htmlspecialchars(t('index.semi.1'), ENT_QUOTES, 'UTF-8'); ?></p>
	
										<p style="margin-bottom: 2em; text-align: justify;"><?php echo htmlspecialchars(t('index.semi.2'), ENT_QUOTES, 'UTF-8'); ?></p>
									</section>
		<?php include __DIR__ . '/includes/layout-end.php'; ?>
