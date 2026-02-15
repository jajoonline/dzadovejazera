<?php
require __DIR__ . '/i18n.php';
$layout = $layout ?? [];
$site_name = $layout['site_name'] ?? t('site.name');
$page_title = $layout['page_title'] ?? (($layout['page_title_key'] ?? '') !== '' ? t($layout['page_title_key']) : '');
$header_title = $layout['header_title'] ?? $site_name;
$head_title = $page_title !== '' ? ($site_name . ' / ' . $page_title) : $site_name;
?>
<!DOCTYPE HTML>

<html lang="<?php echo htmlspecialchars($current_lang, ENT_QUOTES, 'UTF-8'); ?>">
	<head>
		<title><?php echo htmlspecialchars($head_title, ENT_QUOTES, 'UTF-8'); ?></title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
	</head>
			<body class="is-preload">
				<nav id="navigation">
					<ul>
						<li><a href="#menu"><?php echo htmlspecialchars(t('nav.menu'), ENT_QUOTES, 'UTF-8'); ?></a></li>
					</ul>
					<div class="lang-switch" aria-label="Language switcher">
						<a href="<?php echo htmlspecialchars(lang_switch_url('sk'), ENT_QUOTES, 'UTF-8'); ?>" class="<?php echo $current_lang === 'sk' ? 'is-active' : ''; ?>">SK</a>
						<a href="<?php echo htmlspecialchars(lang_switch_url('en'), ENT_QUOTES, 'UTF-8'); ?>" class="<?php echo $current_lang === 'en' ? 'is-active' : ''; ?>">EN</a>
					</div>
				</nav>
			<!-- Wrapper -->
				<div id="wrapper">
				<div id="rainfx" aria-hidden="true"></div>

				<!-- Header -->
					<header id="header">
						<div class="inner">

							<!-- Logo -->
								<a href="index.php" class="logo">
									<span class="symbol"><img src="images/logo.svg" alt="" /></span><span class="title"><?php echo htmlspecialchars($header_title, ENT_QUOTES, 'UTF-8'); ?></span>
								</a>

							</div>
						</header>

				<!-- Menu -->
				<?php include __DIR__ . '/menu.php'; ?>

				<!-- Main -->
					<div id="main">
						<div class="inner">
