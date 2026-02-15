<nav id="menu">
	<div class="menu-head">
		<h2><?php echo htmlspecialchars(t('nav.menu'), ENT_QUOTES, 'UTF-8'); ?></h2>
		<div class="menu-lang-switch" aria-label="Language switcher">
			<a href="<?php echo htmlspecialchars(lang_switch_url('sk'), ENT_QUOTES, 'UTF-8'); ?>" class="<?php echo $current_lang === 'sk' ? 'is-active' : ''; ?>">SK</a>
			<a href="<?php echo htmlspecialchars(lang_switch_url('en'), ENT_QUOTES, 'UTF-8'); ?>" class="<?php echo $current_lang === 'en' ? 'is-active' : ''; ?>">EN</a>
		</div>
	</div>
	<ul>
		<li>
			<a href="index.php"><?php echo htmlspecialchars(t('menu.home'), ENT_QUOTES, 'UTF-8'); ?></a>
			<ul>
				<li><a href="index.php#prirodne"><?php echo htmlspecialchars(t('menu.home.natural'), ENT_QUOTES, 'UTF-8'); ?></a></li>
				<li><a href="index.php#poloprirodne"><?php echo htmlspecialchars(t('menu.home.semi_natural'), ENT_QUOTES, 'UTF-8'); ?></a></li>
			</ul>
		</li>
		<li>
			<a href="landscaping.php"><?php echo htmlspecialchars(t('menu.landscaping'), ENT_QUOTES, 'UTF-8'); ?></a>
			<ul>
				<li><a href="landscaping.php#terasy"><?php echo htmlspecialchars(t('menu.landscaping.terraces'), ENT_QUOTES, 'UTF-8'); ?></a></li>
				<li><a href="landscaping.php#oporne-kamenne-mury"><?php echo htmlspecialchars(t('menu.landscaping.walls'), ENT_QUOTES, 'UTF-8'); ?></a></li>
				<li><a href="landscaping.php#infrastruktura"><?php echo htmlspecialchars(t('menu.landscaping.infrastructure'), ENT_QUOTES, 'UTF-8'); ?></a></li>
			</ul>
		</li>
		<li><a href="gallery.php"><?php echo htmlspecialchars(t('menu.gallery'), ENT_QUOTES, 'UTF-8'); ?></a></li>
		<li><a href="elements.php"><?php echo htmlspecialchars(t('menu.elements'), ENT_QUOTES, 'UTF-8'); ?></a></li>
		<li><a href="#footer"><?php echo htmlspecialchars(t('menu.contact'), ENT_QUOTES, 'UTF-8'); ?></a></li>
	</ul>
</nav>
