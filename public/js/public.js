/**
 * Created by zhisongli on 14-9-29.
 */
function sleep(sleepTime) {
    for(var start = Date.now(); Date.now() - start <= sleepTime; ) { }
}

//百度地图的样式JSON
var styleJSON = [
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "building",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "manmade",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "highway",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "arterial",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "local",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "railway",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "building",
        "elementType": "all",
        "stylers": {
            "color": "#ff0000",
            "visibility": "off"
        }
    },
//        {
//            "featureType": "subway",
//            "elementType": "geometry.fill",
//            "stylers": {
//                "color": "#cccccc",
//                "visibility": "on"
//            }
//        },
    {
        "featureType": "label",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }
]