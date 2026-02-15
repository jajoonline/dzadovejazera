<?php
$layout = [
	'page_title' => 'Úvod',
	'header_title' => 'Dažďové jazerá',
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
									<p>Navrhujeme a realizujeme vodozádržné vodné plochy, slúžiace na zabránenie alebo spomalenie odtoku zrážkových vôd do vodných tokov, z lokality ich spadnutia.</p>
									<h3 class="cta-contact">Ak si prajete dozvedieť viac, alebo zvažujete realizáciu, tak nás <a href="#footer">KONTAKTUJTE</a>.</h3>
									<p style="text-align: justify;">Dažďové jazerá zachytávajú dažďovú vodu zo striech, spevnených aj nespevnených plôch, drenáží, priesakov a prameňov. Vodu zadržia priamo v mieste, kde spadla. Nepoužívame pritom vodu zo studní ani vrtov, aby sme neodčerpávali cenné podzemné zásoby. K doplneniu z týchto zdrojov pristupujeme len výnimočne a iba v nevyhnutnom rozsahu počas extrémneho sucha alebo pri dlhších obdobiach s nízkymi zrážkami, aby biotop nezanikol.</p>
									<p style="text-align: justify;">
									Prirodzeným odparovaním pomáhajú ochladzovať okolie a zlepšujú mikroklímu. Podľa riešenia dokážu vracať vlhkosť aj do pôdy v okolí, čím krajina menej vysychá a suché miesta sa postupne obnovujú.</p>
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
									<h2>Prírodné dažďové jazerá</h2>
									<p style="text-align: justify;">Bezfóliové dažďové jazerá sa hodia najmä do horských oblastí a tam, kde má pôda nízku priepustnosť. Výborne fungujú aj v lokalitách po melioráciách, kde pomáhajú obnoviť prirodzené zavodnenie krajiny. Ideálne sú miesta s trvalými alebo občasnými povrchovými prameňmi, s vyústením drenáží, prípadne so zvodmi dažďovej vody zo striech a spevnených plôch. Vhodné môžu byť aj lokality s vyššou hladinou podzemnej vody.</p>

									<p style="text-align: justify;">Pri bezfóliových jazerách je prirodzené, že hladina vody sa mení. Kolíše podľa ročného obdobia, množstva zrážok, odparu a vsakovania do pôdy.</p>
								</section>
								<section class="intro-copy">
									<h2>Poloprírodné dažďové jazerá</h2>
									<p style="text-align: justify;">Niektoré jazerá majú hlbokú časť riešenú ako nepriepustnú, aby si udržali stabilnú hladinu aj v suchších obdobiach. Plytšie zóny sú izolované prírodnými materiálmi, najčastejšie ílom, a môžu byť čiastočne priepustné. Táto kombinácia zabezpečí, že voda neklesne pod požadovanú úroveň, no zároveň sa zachytí čo najväčší objem zrážkovej vody.</p>

									<p style="margin-bottom: 2em; text-align: justify;">Plytké časti slúžia ako prirodzený „záchytný priestor“. Voda v nich zostáva dovtedy, kým sa postupne neodparí alebo nevsiakne do pôdy, čím podporuje vlhkosť v okolí a zlepšuje miestnu mikroklímu.</p>
								</section>
	<?php include __DIR__ . '/includes/layout-end.php'; ?>
