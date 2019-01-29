import * as mapOverlay from './parkCoordinates';
import { unitCode } from './base';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ubW9vcm1hbiIsImEiOiJjam5tNDNrbnIwMzFkM3ZtejUwd2w2Z3NlIn0.POFHvcHBgNbwKHO8rQpiFg';

export const returnMap = (latLong, parkCode) => {
    const coordinatesSplit = latLong.split(', ');
    const lat = coordinatesSplit[0].replace('lat:', '');
    const long = coordinatesSplit[1].replace('long:', '');
    const Map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/jonmoorman/cjr2gu2970x752sl1dir85s8s',
        center: [long, lat],
        zoom: 10.0
    });

    Map.on('load', function () {

        Map.addLayer({
            'id': 'parksMap',
            'type': 'fill',
            'source': {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [mapOverlay.parkCoordinates[parkCode]]
                }
            },
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.3
            }
        });
    });

}
