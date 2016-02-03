/** File 'EventHandler.js' created on 25. Jan 2016 at 11:17 */
function EventHandler(sliderInstance) {
	this.EventHandler = function() {
		this.addMouseListener();
		this.addKeyListener();
		this.addResizeListener();
	};
	// MouseListener
	this.addMouseListener = function() {
		$(sliderInstance).find('.gis-outer-border').mousewheel(function(e, delta) {
			sliderInstance.moveImageRow(delta < 0);
			e.preventDefault();
			e.stopPropagation();
		});
		$(sliderInstance).find('.arrow-up, .arrow-down').mousedown(function() {
			sliderInstance.moveImageRow($(this).hasClass('arrow-up'));
		});
		if(sliderInstance.hasAutoSlide() && sliderInstance.hasAutoSlideStopOnHover()) {
			$(sliderInstance).find('.gis-outer-border, .fancybox-overlay').mouseenter(function() {
				sliderInstance.setAutoSlide(false);
			});
			$(sliderInstance).find('.gis-outer-border, .fancybox-overlay').mouseleave(function() {
				sliderInstance.setAutoSlide(true);
			});
		}
	};
	// KeyListener
	this.addKeyListener = function() {
		if(sliderInstance.isReady() && sliderInstance.keyNavigationEnabled()) {
			$(document).keydown(function(e) {
				// @formatter:off
				switch(e.keyCode) {
					case 33: case 38: case 87: sliderInstance.moveImageRow(true); break;
					case 34: case 40: case 83: sliderInstance.moveImageRow(false); break;
				}
				// @formatter:on
			});
		}
	};
	// ResizeListener
	this.addResizeListener = function() {
		$(window).resize(function() {
			sliderInstance.recalculateVisibleCols();
			sliderInstance.reloadImages();
		});
	};
	// Konstruktoraufruf
	this.EventHandler();
}