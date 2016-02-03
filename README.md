************************************************************************************************************************
# jQuery-Grid-Slider
Der Grid-Image-Slider ist eine responsive und dynamische Bildergalerie - basierend auf jQuery.
Das Hauptmerkmal liegt hierbei auf der Rasterdarstellung, die es ideal ermöglicht endlos viele Bilder darzustellen.

## Features
* Leichte Einbindung
* Beliebige Anzahl an Bildern
* Über 12 anpassbare Einstellungen
* Leicht konfigurierbar per JavaScript-Parametern
* Automatische Slider-Bewegungen oder via Navigationspfeile, Mausrad und Tasten
* Integrierte Fancybox
* Automatisches Stoppen von Slider-Bewegungen, wenn sich der Mauszeiger auf dem Slider befindet
************************************************************************************************************************
## Benötigte Scripte und CSS-Dateien
```html
https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js
https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.pack.js
https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css
GridImageSlider.js
SliderImage.js
EventHandler.js
gis-stylesheet.css

// Scripte:
<script type=text/javascript src="Dateipfad/Link"></script>

// CSS:
<link type="text/css" rel="stylesheet" media="all" href="Dateipfad/Link">
```

## 'meinSlider' ist die ID des Elementes, auf das der Grid-Image-Slider angewendet werden soll
```html
<div id=meinSlider>
  <a href="Bilder_groß/Bild_(0).jpg"><img src="Bilder_klein/Bild_(0).jpg" alt=""></a>
  <a href="Bilder_groß/Bild_(1).jpg"><img src="Bilder_klein/Bild_(1).jpg" alt=""></a>
  <a href="Bilder_groß/Bild_(2).jpg"><img src="Bilder_klein/Bild_(2).jpg" alt=""></a>
  ...
</div>
<div class=clear></div>
```

## Initialisieren des jQuery-Grid-Sliders
```javascript
$('#meinSlider').gridImageSlider();

// oder mit Optionen:
$('#meinSlider').gridImageSlider({

});
```

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

## Standardeinstellungen
| Option                | Wert   | Typ     | Kurzbeschreibung                                                                                           |
| --------------------- |:------:|:-------:|------------------------------------------------------------------------------------------------------------|
| maxImageRowCount      | 3      | Integer | Maximale Anzahl von Bildreihen                                                                             |
| maxImageColumnCount   | 4      | Integer | Maximale Anzahl von Bildspalten                                                                            |
| minImageWidth         | 300    | Integer | Minimale Bildbreite *(in Pixel)*                                                                           |
| imageBorderWidth      | 4      | Integer | Abstand zwischen den Einzelnen Bildern und zum Rand *(in Pixel)*                                           |
| animationTime         | 4000   | Integer | Zeit, bis die Animation eines Bildwechsels vollendet wurde *(in Millisekunden, mind. 500)*                 |
| enableImageNumbers    | true   | Boolean | Zeigt in der rechten unteren Ecke eines Bildes die aktuelle Bildnummer an                                  |
| enableArrowNavigation | false  | Boolean | Zeigt Pfeile zur Navigation über bzw. unter dem Slider an                                                  |
| enableKeyNavigation   | true   | Boolean | Ermöglicht das Bildverschieben per Tasten                                                                  |
| enableFancybox        | true   | Boolean | Ermöglicht das Vergrößern eines Bildes durch einen einfachen Klick auf dieses                              |
| autoSlide             | true   | Boolean | Automatische Slider-Bewegungen                                                                             |
| autoSlideDelay        | 14000  | Integer | Zeit, bis zur nächsten automatischen Bewegung *(in Millisekunden, nur wenn 'autoSlide = true', mind. 500)* |
| autoSlideDirection    | 1      | Integer | Richtung der automatischen Bewegung *(0 = Bilder kommen von oben nach, 1 = Bilder kommen von unten nach)*  |
| autoSlideStopOnHover  | true   | Boolean | Stoppt Bildverschiebungen, wenn sich die Maus auf dem Slider bzw. auf der geöffneten Fancybox befindet     |
| outerBorderWidth      | 20     | Integer | Legt die Breite der äußersten Border fest *(in Pixel, mind. 0)*                                            |
| animation             | swing  | String  | Animation *('swing' oder 'linear')*                                                                        |
**Hinweis:** Es kann eine beliebige Anzahl von Bildern hinzugefügt werden. Jedoch sollte beachtet werden, dass leere
Felder entstehen und der Slider ggf. nicht richtig arbeitet, sofern in den Einstellungen die Anzahl der Spalten multipliziert mit der Anzahl der Reihen, die Summe der eingefügten Bilder überschreitet. Sollte der Grid-Image-Slider nach dessen Initialisierung nicht zu sehen sein, bitte die Browserkonsole auf mögliche Fehler überprüfen.