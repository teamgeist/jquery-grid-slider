# jQuery-Grid-Slider [![Build Status](https://travis-ci.org/cldwalker/table.png?branch=master)](https://travis-ci.org/cldwalker/rubydoc)
Der Grid-Image-Slider ist eine responsive und dynamische Bildergalerie - basierend auf jQuery.
Das Hauptmerkmal liegt hierbei auf der Rasterdarstellung, die es ideal ermöglicht endlos viele Bilder darzustellen.

Features
--------
* Leichte Einbindung
* Beliebige Anzahl an Bildern
* Über 12 anpassbare Einstellungen
* Leicht konfigurierbar per JavaScript-Parametern
* Automatische Slider-Bewegungen oder via Navigationspfeile, Mausrad und Tasten
* Integrierte Fancybox
* Automatisches Stoppen von Slider-Bewegungen, wenn sich der Mauszeiger auf dem Slider befindet

Standardeinstellungen
---------------------
| Option                | Wert   | Typ     | Kurzbeschreibung                                                                                            |
| --------------------- |:------:| :------:|-----------------------------------------------------------------------------------------------------------: |
| maxImageRowCount      | 3      | Integer | Maximale Anzahl von Bildreihen
| maxImageColumnCount   | 4      | Integer | Maximale Anzahl von Bildspalten
| minImageWidth         | 300    | Integer | Minimale Bildbreite *(in Pixel)*
| imageBorderWidth      | 4      | Integer | Abstand zwischen den Einzelnen Bildern und zum Rand *(in Pixel)*
| animationTime         | 4000   | Integer | Zeit, bis die Animation eines Bildwechsels vollendet wurde *(in Millisekunden, mind. 500)*
| enableImageNumbers    | true   | Boolean | Zeigt in der rechten unteren Ecke eines Bildes die aktuelle Bildnummer an
| enableArrowNavigation | false  | Boolean | Zeigt Pfeile zur Navigation über bzw. unter dem Slider an
| enableKeyNavigation   | true   | Boolean | Ermöglicht das Bildverschieben per Tasten
| enableFancybox        | true   | Boolean | Ermöglicht das Vergrößern eines Bildes durch einen einfachen Klick auf dieses
| autoSlide             | true   | Boolean | Automatische Slider-Bewegungen
| autoSlideDelay        | 14000  | Integer | Zeit, bis zur nächsten automatischen Bewegung *(in Millisekunden, nur wenn 'autoSlide = true', mind. 500)*
| autoSlideDirection    | 1      | Integer | Richtung der automatischen Bewegung *(0 = Bilder kommen von oben nach, 1 = Bilder kommen von unten nach)*
| autoSlideStopOnHover  | true   | Boolean | Stoppt Bildverschiebungen, wenn sich die Maus auf dem Slider bzw. auf der geöffneten Fancybox befindet
| outerBorderWidth      | 20     | Integer | Legt die Breite der äußersten Border fest *(in Pixel, mind. 0)*
| animation             | swing  | String  | Animation *('swing' oder 'linear')*