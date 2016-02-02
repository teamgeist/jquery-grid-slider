/** File created on 25. Jan 2016 at 11:16 */
function SliderImage(sliderInstance, imageID, imageSrc, imageHref, imageCaption, imageElement) {
	this.imageID = -1;
	this.imageSrc = '';
	this.imageHref = '';
	this.imageCaption = '';
	this.imageObject = null; // jQuery-Objekt

	this.SliderImage = function() {
		this.imageID = imageID;
		this.imageSrc = imageSrc;
		this.imageCaption = imageCaption;
		this.imageHref = sliderInstance.fancyboxEnabled() ? imageHref : '#';
		$(imageElement).remove();
		this.createNewImageElement();
		this.setResponsiveWidth();
	};
	// Gibt das jQuery-Objekt zurück
	this.getImageObject = function() {
		return this.imageObject;
	};
	// Erzeugt ein neues jQuery-Objekt dieses Bildelementes
	this.createNewImageElement = function() {
		// TODO: data-gisIndex wird nirgendwo genutzt und kann entfernt werden - dient derzeit nur als Orientierung beim Entwickeln
		var imageObjectHTML = '<div class="gis-image-container" data-gisIndex="' + imageID + '"><a href="' + this.imageHref + '" data-fancybox-group="gis-fbgroup"><img  class="gis-image" src="' + this.imageSrc + '"></a></div>';
		this.imageObject = $(imageObjectHTML);
		this.addImageNumber();
		this.addImageCaption();
		this.imageObject.find('a').css('cursor', sliderInstance.fancyboxEnabled() ? 'pointer' : 'default').attr('title', this.imageCaption);

		if(sliderInstance.fancyboxEnabled()) {
			// TODO: Fancybox wirkt nur auf Elementen mit HREF-Tag (.add(this.imageObject.find('.img-caption'))) - Was ist mit Fancybox beim Klick auf Bildunterschriften und Bildnummern?
			// TODO: Callback-Funktion wird beim Öffnen der Lightbox für jedes Bild ausgeführt (sollte nur für eins)
			// TODO: autoSlide stoppt manchmal nicht, wenn Fancybox geöffnet wird
			this.imageObject.find('a').fancybox({
				helpers : {
					title : {
						type : 'inside',
						position : 'bottom'
					}
				},
				'afterClose' : function() {
					sliderInstance.setAutoSlide(true);
				}, 'afterShow' : function() {
					sliderInstance.setAutoSlide(false);
				}
			});
		}
	};
	// Setzt Bildgröße prozentual zur möglichen Anzahl in einer Reihe
	this.setResponsiveWidth = function() {
		var imageBorderWidth = sliderInstance.getImageBorderWidth();
		this.imageObject.css({
			'width' : (100 / sliderInstance.getVisibleCols() + '%'),
			'border' : imageBorderWidth + 'px solid transparent'
		});
	};
	// Bildnummern
	this.addImageNumber = function() {
		if(sliderInstance.imageNumbersEnabled()) {
			this.imageObject.append('<div class="img-number"><span>' + (this.imageID + 1) + '</span></div>');
		}
	};
	// Bildunterschriften
	this.addImageCaption = function() {
		if(sliderInstance.imageCaptionsEnabled()) {
			if(this.imageCaption != undefined) {
				this.imageObject.append('<span class="img-caption">' + this.imageCaption + '</span>');
			}
		}
	};
	// Konstruktoraufruf
	this.SliderImage();
}