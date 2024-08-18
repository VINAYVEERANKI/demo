import { lineString } from "@turf/helpers";
import lineIntersect from "@turf/line-intersect";
import { polygon } from "@turf/helpers";
import length from "@turf/length";
import kinks from "@turf/kinks";
import booleanWithin from "@turf/boolean-within";
import booleanContains from "@turf/boolean-contains";
export const latLangKeyRemover = (data) =>
  data.map((item) => [item.lat, item.lng]);
export const latLangKeyAdder = (data) =>
  data.map((item) => {
    return { lat: item[0], lng: item[1] };
  });
/*****CONDITIONS TO CHECK*******/
/*
1 Main zones should not overlap with other zones
2 local zones should be inside main zone
3.Zone lines should not self intersect
4.zone max size limit
5. zones should be inside INDIA
 */
/*CONDITION CHECKER FNs. */
export const overLapChecker = (curr, all) => {
  let newCurr = [...curr];
  newCurr.push(curr[0]);
  return all.length === 0
    ? []
    : all.filter((item) => {
      let newCoord = [...item.coord];
      // newCoord.push(item.coord[0]);
      let pol1 = lineString(newCoord);
      let pol2 = lineString(newCurr);
      let intersects = lineIntersect(pol1, pol2);
      return intersects.features.length !== 0;
    });
};
export const isSelfIntersected = (coord) => {
  let newCoord = [...coord];
  newCoord.push(coord[0]);
  let intersects = kinks(polygon([newCoord]));
  return intersects.features.length !== 0;
};
export const isInsideMainChecker = (curr, all) => {
  let newCurr = [...curr];
  newCurr.push(curr[0]);
  return all.some((item) => {
    let newCoord = [...item.coord];
    // newCoord.push(item.coord[0]);
    return booleanWithin(polygon([newCurr]), polygon([newCoord]));
  });
};
export const isOutsideMainChecker = (curr, all) => {
  let newCurr = [...curr];
  newCurr.push(curr[0]);
  return all.some((item) => {
    let newCoord = [...item.coord];
    // newCoord.push(item.coord[0]);
    return booleanContains(polygon([newCurr]), polygon([newCoord]));
  });
};
export const isOutsideInnerChecker = (curr, all) => {
  let newCurr = [...curr];
  newCurr.push(curr[0]);
  return all.every((item) => {
    let newCoord = [...item.coord];
    // newCoord.push(item.coord[0]);
    return booleanContains(polygon([newCurr]), polygon([newCoord]));
  });
};
export const isChanged = (curr = [], prev = []) => {
  return curr.length !== prev.length
    ? true
    : curr.some(function (item, index) {
      return (
        item.lat.toString() !== prev[index].lat.toString() &&
        item.lng.toString() !== prev[index].lng.toString()
      );
    });
};
export const isWithInMaxLength = (coord = [], limit = 100) => {
  let newCoord = lineString(coord);
  let currLength = length(newCoord);
  // console.log(currLength);
  return currLength >= limit;
};
export const polygonStyle = (type, visibility = []) => {
  if (type === "Z") {
    return { ...zoneStyles.mainZone, visible: visibility.includes(type) };
  }
  if (type === "L") {
    return { ...zoneStyles.localZone, visible: visibility.includes(type) };
  }
  if (type === "O") {
    return { ...zoneStyles.outStation, visible: visibility.includes(type) };
  }
  if (type === "B") {
    return { ...zoneStyles.blockedZone, visible: visibility.includes(type) };
  }
  if (type === "T") {
    return { ...zoneStyles.toll, visible: visibility.includes(type) };
  }
  if (type === "S") {
    return { ...zoneStyles.specialZone, visible: visibility.includes(type) };
  }
};

/*POLYGON ZONE BASED STYLE */
// export const mapStyle = [
//     {
//         "featureType": "administrative",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.land_parcel",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.neighborhood",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road",
//         "elementType": "labels",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "transit",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     }
// ]

export const mapStyle = [
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#d3d3d3",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        color: "#808080",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#b3b3b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ffffff",
      },
      {
        weight: 1.8,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#d7d7d7",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ebebeb",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#a7a7a7",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#efefef",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#696969",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#737373",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#d6d6d6",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {},
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
];

export const zoneStyles = {
  currentZone: {
    fillOpacity: 0.3,
    fillColor: "#0060FF33",
    strokeColor: "#0060FF",
    strokeWeight: 2,
    // draggable: true,#0060FF33
    // editable: true,
  },
  mainZone: {
    fillOpacity: 0.3,
    fillColor: "#959595",
    strokeColor: "#687284",
    strokeWeight: 2,
    // strokePattern: "Dash",
    // draggable: false,
    // editable: true,
  },
  outStation: {
    fillOpacity: 0.3,
    fillColor: "#3BE81A",
    strokeColor: "#3BE81A",
    strokeWeight: 2,
    // draggable: true,
    // editable: true,
  },
  specialZone: {
    fillOpacity: 0.3,
    fillColor: "#FFF06980",
    strokeColor: "#FFF069",
    strokeWeight: 2,
    zIndex: 8,
    // draggable: true,
    // editable: true,
  },
  localZone: {
    fillOpacity: 0.3,
    fillColor: "#99EAF6CC",
    strokeColor: "#99EAF6",
    strokeWeight: 2,
    clickable: true,
    zIndex: 8,
    // draggable: true,
    // editable: true,
  },
  toll: {
    fillOpacity: 0.3,
    fillColor: "#9A00FF69",
    strokeColor: "#9A00FF42",
    strokeWeight: 2,
    zIndex: 8,
    // draggable: true,
    // editable: true,
  },
  blockedZone: {
    fillOpacity: 0.3,
    fillColor: "#FDC1B766",
    strokeColor: "#FDC1B7",
    strokeWeight: 2,
    zIndex: 8,
    // draggable: true,
    // editable: true,
  },
};
