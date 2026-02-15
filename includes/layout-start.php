<?php
$layout = $layout ?? [];
$site_name = $layout['site_name'] ?? 'Dažďové jazerá';
$page_title = $layout['page_title'] ?? '';
$header_title = $layout['header_title'] ?? $site_name;
$head_title = $page_title !== '' ? ($site_name . ' / ' . $page_title) : $site_name;
?>
<!DOCTYPE HTML>

<html>
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
					<li><a href="#menu">Menu</a></li>
				</ul>
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
