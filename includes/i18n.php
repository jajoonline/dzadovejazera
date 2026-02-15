<?php

$supported_langs = ['sk', 'en'];
$default_lang = 'sk';

$requested_lang = isset($_GET['lang']) ? strtolower((string) $_GET['lang']) : '';
$cookie_lang = isset($_COOKIE['site_lang']) ? strtolower((string) $_COOKIE['site_lang']) : '';

if (in_array($requested_lang, $supported_langs, true)) {
	$current_lang = $requested_lang;
	setcookie('site_lang', $current_lang, [
		'expires' => time() + (86400 * 365),
		'path' => '/',
		'samesite' => 'Lax',
	]);
} elseif (in_array($cookie_lang, $supported_langs, true)) {
	$current_lang = $cookie_lang;
} else {
	$current_lang = $default_lang;
}

$translations = require __DIR__ . '/translations.php';

if (!function_exists('t')) {
	function t(string $key): string
	{
		global $translations, $current_lang;
		return $translations[$current_lang][$key] ?? $translations['sk'][$key] ?? $key;
	}
}

if (!function_exists('lang_switch_url')) {
	function lang_switch_url(string $lang): string
	{
		$uri = $_SERVER['REQUEST_URI'] ?? '/';
		$parts = parse_url($uri);
		$path = $parts['path'] ?? '/';
		$query = [];
		if (!empty($parts['query'])) {
			parse_str($parts['query'], $query);
		}
		$query['lang'] = $lang;
		$qs = http_build_query($query);
		return $path . ($qs !== '' ? ('?' . $qs) : '');
	}
}
