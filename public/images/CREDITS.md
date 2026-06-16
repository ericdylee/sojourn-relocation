# Image credits

All photos below are sourced from Wikimedia Commons and re-encoded (resized ≤1600px wide,
re-compressed, EXIF stripped) for use on the SOJOURN KOREA site. Attribution is provided here
per each license's requirements. No raw/proprietary Sojourn Korea assets were reused for these
files (the original `assets/raw/sojourn-korea-imgs/` files were either UI screenshots with
branding baked in, or low-resolution square icon graphics, so none were suitable as
standalone section photos).

| File | Subject | Source page | Author | License |
|---|---|---|---|---|
| `visa.jpg` | Korea Immigration Service sign, Incheon Airport | https://commons.wikimedia.org/wiki/File:Korea_Immigration_Service_logo_at_the_Incheon_International_Airport.jpg | Vuong Tri Binh | CC BY-SA 4.0 |
| `settle.jpg` | Seomyeon, Busan at night (banks & city life) | https://commons.wikimedia.org/wiki/File:Seomyeon_Rotary.jpg | Christophe95 | CC BY-SA 4.0 |
| `home.jpg` | Marine City residential towers (daytime), Busan | https://commons.wikimedia.org/wiki/File:Marine_City,_Busan.jpg | Brit in Seoul | CC BY-SA 4.0 |
| `tenancy.jpg` | Modern apartment living room | https://commons.wikimedia.org/wiki/File:Modern_living_room_with_stylish_furniture_and_a_view_of_the_outdoors_in_a_cozy_apartment_setting.jpg | Shixart1985 | CC BY 2.0 |
| `transport.jpg` | Incheon International Airport, Terminal 1 departures | https://commons.wikimedia.org/wiki/File:Incheon_International_Airport_Terminal_1_Departure.jpg | Arne Müseler | CC BY-SA 3.0 de |
| `tour-busan.jpg` | Gwangan Bridge & Marine City skyline, Busan | https://commons.wikimedia.org/wiki/File:Gwangan_Bridge_seen_Marine_City_at_Night_01.jpg | Jeena Paradies | Public domain |
| `gamcheon.jpg` | Gamcheon Culture Village, Busan | https://commons.wikimedia.org/wiki/File:Gamcheon_Culture_Village.jpg | Bernard Gagnon | CC0 |
| `jagalchi.jpg` | Jagalchi Fish Market, Busan | https://commons.wikimedia.org/wiki/File:Jagalchi_Market_01.jpg | Bernard Gagnon | CC0 |
| `haeundae.jpg` | Haeundae Beach, Busan | https://commons.wikimedia.org/wiki/File:Haeundae_Beach_in_Busan.jpg | StephNurnberg | CC BY 2.0 |
| `gyeongbokgung.jpg` | Geunjeongjeon Hall, Gyeongbokgung Palace, Seoul | https://commons.wikimedia.org/wiki/File:Front_view_of_the_Imperial_Throne_Hall_Geunjeongjeon_at_Gyeongbokgung_Palace_with_blue_sky_in_Seoul.jpg | Basile Morin | CC BY-SA 4.0 |
| `gwangjang.jpg` | Gwangjang Market entrance, Seoul | https://commons.wikimedia.org/wiki/File:Gwangjang_Market,_Seoul_01.jpg | Bgag | CC0 |
| `seoul-city.jpg` | Seoul skyline at dusk, from Namsan | https://commons.wikimedia.org/wiki/File:Skyline_view_from_Seoul_City_(South_Korea).jpg | Laurie Nevay (Flickr) | CC BY-SA 2.0 |

## Processing

Each file was downloaded via the Commons API `imageinfo` thumbnail (`iiurlwidth=1600`), then
normalized with:

```
magick "<file>" -resize '1600x1600>' -strip -quality <78-82, lowered as needed to stay ≤350KB> "<file>"
```

EXIF/metadata was stripped (`-strip`) for privacy and file-size reasons. No content edits
(generative image manipulation, etc.) were made beyond resize/recompress.
