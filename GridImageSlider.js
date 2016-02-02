/** File created on 25. Jan 2016 at 11:16 */
(function($) {
	$.fn.gridImageSlider = function(options) {
		// @formatter:off
		var settings = $.extend({
			maxImageRowCount : 3, maxImageColumnCount : 4, minImageWidth : 300, imageBorderWidth : 10,
			enableImageCaptions : true, enableImageNumbers : false, enableArrowNavigation : false, enableKeyNavigation : true, enableFancybox : true,
			autoSlide : true, autoSlideDelay : 14000, autoSlideDirection : 1, autoSlideStopOnHover : true,
			outerBorderWidth : 20, animation : 'swing', animationTime : 4000
		}, options || {});
		// @formatter:on

		var instance = this;
		this.visibleCols = settings.maxImageColumnCount, this.ready = true, this.smallestImageHeight = 0;
		this.sliderDesignation = $(this).attr('id') != undefined ? '#' + $(this).attr('id') : '.' + $(this).attr('class');

		// Konstruktor
		this.gridImageSlider = function() {
			this.getOptionSettings();
			if(this.hasValidOptions()) {
				this.extendSliderContainer();
				this.initializeSliderImageArray();
				this.recalculateVisibleCols();
				this.initFirstCSS();
				new EventHandler(this);
				this.startAutoSlide();
			}
			else {
				$(this).find('a').remove();
				$(this).html('[GridImageSlider - ' + this.sliderDesignation + '] Konfigurationsfehler (siehe Entwicklerkonsole).');
				var cause = '[GridImageSlider: ' + this.sliderDesignation + '] Mindestens eine eingestellte Option besitzt ungültige Werte.';
				throw new Error(cause);
			}
		};
		/***************************************************************************************************************************************************************/
		// Initialisiert Variablen mit Nutzerwerten
		this.getOptionSettings = function() {
			this.maxImageRowCount = settings.maxImageRowCount;
			this.maxImageColumnCount = settings.maxImageColumnCount;
			this.minImageWidth = settings.minImageWidth;
			this.imageBorderWidth = settings.imageBorderWidth;
			this.enableImageCaptions = settings.enableImageCaptions;
			this.enableImageNumbers = settings.enableImageNumbers;
			this.enableArrowNavigation = settings.enableArrowNavigation;
			this.enableKeyNavigation = settings.enableKeyNavigation;
			this.enableFancybox = settings.enableFancybox;
			this.autoSlide = settings.autoSlide;
			this.autoSlideDelay = settings.autoSlideDelay;
			this.autoSlideDirection = settings.autoSlideDirection;
			this.autoSlideStopOnHover = settings.autoSlideStopOnHover;
			this.outerBorderWidth = settings.outerBorderWidth;
			this.animation = settings.animation;
			this.animationTime = settings.animationTime;
		};
		// Prüft die Optionen, ob gewisse Minimal- und Maximalwerte eingehalten wurden
		this.hasValidOptions = function() {
			return !((this.maxImageRowCount <= 0 || this.maxImageColumnCount <= 0) || (this.autoSlideDirection < 0 || this.autoSlideDirection > 1)
			|| (!(this.animation == 'swing' || this.animation == 'linear')));
		};
		/***************************************************************************************************************************************************************/
		this.getImageBorderWidth = function() {return this.imageBorderWidth;};
		this.imageCaptionsEnabled = function() {return this.enableImageCaptions;};
		this.imageNumbersEnabled = function() {return this.enableImageNumbers;};
		this.keyNavigationEnabled = function() {return this.enableKeyNavigation;};
		this.fancyboxEnabled = function() {return this.enableFancybox;};
		this.hasAutoSlide = function() {return this.autoSlide;};
		this.hasAutoSlideStopOnHover = function() {return this.autoSlideStopOnHover;};
		this.isReady = function() {return this.ready;};
		this.getVisibleCols = function() {return this.visibleCols;};
		this.getSmallestImageHeight = function() {return this.smallestImageHeight;};
		this.setAutoSlide = function(autoSlide) {this.autoSlide = autoSlide;};
		this.setSmallestImageHeight = function(smallestImageHeight) {
			this.smallestImageHeight = smallestImageHeight;
		};
		/***************************************************************************************************************************************************************/
		// Verschiebung um eine Bildreihe, sofern gerade keine andere Aktion aktiv ist
		this.moveImageRow = function(append) {
			if(!this.isReady()) {
				return;
			}
			this.ready = false;
			this.prepareRow(append);
		};
		// Errechnet die zu fehlenden Bilder, die neu geladen werden müssen. (Für die nächste bzw. vorherige Reihe), append = true ? Bilder werden von unten
		// nachgeschoben und führt die Bewegung aus
		this.prepareRow = function(append) {
			var indexTopLeft = this.getPictureIndexTopLeft();
			var top = $(this).find('.inner-grid-container').position().top;
			var newImages = [];
			var sliderHeight = $(this).find('.gis-outer-border').outerHeight();
			this.recalculateVisibleCols();

			$(this).find('.gis-outer-border').css('height', sliderHeight);
			$(this).find('.gis-inner-border').css('height', sliderHeight - ((this.outerBorderWidth + this.imageBorderWidth) * 2));
			if(append) {
				// 1. Schritt: Berechnen des als letztes benötigten Indexes
				indexTopLeft += this.visibleCols;
				if(indexTopLeft >= this.sliderImageArray.length) {
					indexTopLeft -= this.sliderImageArray.length;
				}
				// 2. Schritt: Hinzufügen der nächsten Bilder
				var latestIndex = parseInt($(this).find('.gis-image-container').last().attr('data-gisindex'));
				var newIndex = latestIndex;
				for(var i = 0; i < this.visibleCols; i++) {
					// newIndex = Bildindex des nächsten benötigten Bildes
					newIndex = latestIndex + (i + 1);
					if(newIndex >= this.sliderImageArray.length) {
						newIndex = Math.abs(this.sliderImageArray.length - newIndex);
					}
					newImages[i] = this.sliderImageArray[newIndex].getImageObject();
					$(this).find('.inner-grid-container').append(newImages[i]);
				}
				// 3. Schritt: top-Position vom sichtbaren Bereich verschieben
				$(this).find('.inner-grid-container').animate({
					top : top - this.getImageContainerHeight()
				}, this.animationTime, this.animation, function() {
					instance.animationCallback(newImages, append);
				});
			} else {
				// 1. Schritt: top-Position vom sichtbaren Bereich verschieben
				$(this).find('.inner-grid-container').css('top', -this.getImageContainerHeight() + 'px');
				// 2. Schritt: Zeilen oben hinzufügen
				for(var i = 0; i < this.visibleCols; i++) {
					indexTopLeft--;
					if(indexTopLeft < 0) {
						indexTopLeft = this.sliderImageArray.length - 1;
					}
					newImages[i] = this.sliderImageArray[indexTopLeft].getImageObject();
					$(this).find('.inner-grid-container').prepend(newImages[i]);
				}
				// 3. Schritt: Weitere Verschiebung der top-Position
				$(this).find('.inner-grid-container').animate({
					top : top
				}, this.animationTime, this.animation, function() {
					instance.animationCallback(newImages, append);
				});
			}
			$('.inner-grid-container').attr('data-gisIndexTopLeft', indexTopLeft);
		};
		// Animation-Callback
		this.animationCallback = function(newImages, append) {
			instance.ready = true;
			// 4. Schritt: Entfernen der untersten Bilder, wenn die Animation beendet wurde
			while(newImages.length > 0) {
				$(instance).find('.inner-grid-container').find('.gis-image-container:' + (append ? 'first' : 'last')).remove();
				newImages.pop();
			}
			// 5. Schritt: Höhe auf 'auto' setzen
			$(instance).find('.gis-outer-border, .gis-inner-border').css('height', 'auto');
			// 6. Schritt: Letztes Verschieben der top-Position
			$(instance).find('.inner-grid-container').css('top', '0px');
		};
		// return: Bildhöhe inkl. Border
		this.getImageContainerHeight = function() {
			return $(this).find('.gis-image-container').outerHeight();
		};
		// return: Index vom Bild oben links
		this.getPictureIndexTopLeft = function() {
			return parseInt($(this).find('.inner-grid-container').first().attr('data-gisIndexTopLeft'));
		};
		// automatische Bewegungen
		this.startAutoSlide = function() {
			if(this.hasAutoSlide()) {
				setTimeout(function() {
					instance.interval = setInterval(function() {
						if(instance.hasAutoSlide()) {
							instance.moveImageRow(instance.autoSlideDirection);
						}
					}, instance.autoSlideDelay);
				}, 0);
			}
		};
		// Erweitert den Slider-Container um eine Klasse, fügt Sub-Container und (sofern aktiv) Navigationspfeile hinzu
		this.extendSliderContainer = function() {
			$(this).addClass('grid-image-slider');
			$(this).append('<div class="gis-outer-border"><div class="gis-inner-border"><div class="gis-grid"><div class="inner-grid-container" data-gisIndexTopLeft="0"></div></div></div></div>');
			if(this.enableArrowNavigation) {
				$(this).prepend('<div class="navigator navigation-top"><div class= "nav-arrow arrow-up"></div></div>');
				$(this).append('<div class="navigator navigation-bottom"><div class="nav-arrow arrow-down"></div></div>');
			}
		};
		// Erzeugt ein neues 'SliderImage'-Objekt für jedes eingefügte Bild
		this.initializeSliderImageArray = function() {
			this.sliderImageArray = [];
			$(this).find('a').each(function(index) {
				var src = $(this).find('img').attr('src'), href = $(this).attr('href'), caption = $(this).attr('data-gisCaption');
				instance.sliderImageArray[index] = new SliderImage(instance, index, src, href, caption, this);
			});
		};
		// Entfernt alle Bilder und läd die sichtbar mögliche Anzahl neu;
		this.initFirstCSS = function() {
			this.reloadImages();
			$(this).find('.gis-outer-border').css({
				'border' : 'solid ' + this.outerBorderWidth + 'px ' + $(this).find('.gis-outer-border').css('border-top-color')
			});
			// TODO: Abstand eigentlich nicht doppelt, muss aber momentan sein, da der Bildabstand zwischen den bildern auch doppelt ist bzw. jedes Bild eine Border an jeder Seite hat
			$(this).find('.gis-inner-border').css('border', (this.getImageBorderWidth() * 2 ) + 'px solid transparent');
		};
		// Berechnet die sichtbaren Bildreihen neu
		this.recalculateVisibleCols = function() {
			var width = $(this).find('.gis-outer-border').outerWidth() - ((this.outerBorderWidth + this.imageBorderWidth) * 2);
			var imageOuterWidth = this.minImageWidth + (this.imageBorderWidth * 2);
			var visibleCols = 0;
			while(width >= imageOuterWidth) {
				width -= imageOuterWidth;
				visibleCols++;
			}
			this.visibleCols = visibleCols > this.maxImageColumnCount ? this.maxImageColumnCount : visibleCols != 0 ? visibleCols : 1;
			for(var i = 0; i < this.sliderImageArray.length; i++) {
				this.sliderImageArray[i].setResponsiveWidth();
			}
		};
		// Entfernt alle Bilder und fügt sie neu hinzu
		this.reloadImages = function() {
			$(this).find('.gis-image-container').remove();
			for(var i = 0; i < this.visibleCols * this.maxImageRowCount; i++) {
				$('.inner-grid-container').append(this.sliderImageArray[i].getImageObject());
			}
			$(this).find('.inner-grid-container').attr('data-gisindextopleft', '0');
		};
		// Konstruktoraufruf
		this.gridImageSlider();
	};
})
(jQuery);