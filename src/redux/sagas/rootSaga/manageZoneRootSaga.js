import { all } from "redux-saga/effects";
import {
  watchAddMainZoneWorker,
  watchEditMainZoneWorker,
  watchFindAllCoordinatesWorker,
  watchMainZoneViewWorker,
  watchManageZonesListWorker,
  watchManagezoneDrpdwnWorker,
} from "../manageZonesSaga/manageZonesSaga";
import {
  watchLocalZoneViewWorker,
  watchaddLocalZoneWorker,
  watchaupdateLocalZoneWorker,
  watchdeleteLocalZoneWorker,
  watchlocalZonesListWorker,
} from "../manageZonesSaga/localZoneSaga";
import {
  watchArchivezoneDrpdwnWorker,
  watchaddArchiveZoneWorker,
  watcharchiveZoneViewWorker,
  watcharchiveZonesListWorker,
  watchrestoreArchiveZoneWorker,
} from "../manageZonesSaga/archiveZoneSaga";
import {
  watchSpecialZoneViewWorker,
  watchaddSpecialZoneWorker,
  watchaupdateSpecialZoneWorker,
  watchdeleteSpecialZoneWorker,
  watchspecialZonesListWorker,
} from "../manageZonesSaga/specialZoneSaga";
import {
  watchTollsZoneViewWorker,
  watchaddTollsZoneWorker,
  watchaupdateTollsZoneWorker,
  watchdeleteTollsZoneWorker,
  watchtollsZonesListWorker,
} from "../manageZonesSaga/tollsZoneSaga";
import {
  watchOutstationZoneViewWorker,
  watchaddOutstationZoneWorker,
  watchaupdateOutstationZoneWorker,
  watchdeleteOutstationZoneWorker,
  watchoutstationZonesListWorker,
} from "../manageZonesSaga/outstationZoneSaga";
import {
  watchBlockZoneViewWorker,
  watchBlockZonesListWorker,
  watchaddBlockZoneWorker,
  watchunblockZoneWorker,
  watchupdateBlockZoneWorker,
  watchBlockedzoneDrpdwnWorker
} from "../manageZonesSaga/blockedZoneSaga";
import {
  watchDeleteintrazoneDrpdwnWorker,
  watchdeleteLocalIntraZonePermanentlyWorker,
  watchdeleteOutstationintraZonePermanentlyWorker,
  watchdeleteSpecialintraZonePermanentlyWorker,
  watchdeleteTollintraZonePermanentlyWorker,
  watchdeletedIntraZoneListWorker,
  watchrestoreDeletedLocalIntraZoneWorker,
  watchrestoreDeletedOutstationIntraZoneWorker,
  watchrestoreDeletedSpecialIntraZoneWorker,
  watchrestoreDeletedTollIntraZoneWorker,
} from "../manageZonesSaga/deletedIntraZoneSaga";

export default function* manageZoneRootSaga() {
  yield all([
    watchManageZonesListWorker(),
    watchAddMainZoneWorker(),
    watchMainZoneViewWorker(),
    watchFindAllCoordinatesWorker(),
    watchEditMainZoneWorker(),
    watchlocalZonesListWorker(),
    watchaddLocalZoneWorker(),
    watchaupdateLocalZoneWorker(),
    watchLocalZoneViewWorker(),
    watchdeleteLocalZoneWorker(),
    watcharchiveZonesListWorker(),
    watchaddArchiveZoneWorker(),
    watcharchiveZoneViewWorker(),
    watchrestoreArchiveZoneWorker(),
    watchspecialZonesListWorker(),
    watchaddSpecialZoneWorker(),
    watchaupdateSpecialZoneWorker(),
    watchSpecialZoneViewWorker(),
    watchdeleteSpecialZoneWorker(),
    watchtollsZonesListWorker(),
    watchaddTollsZoneWorker(),
    watchaupdateTollsZoneWorker(),
    watchTollsZoneViewWorker(),
    watchdeleteTollsZoneWorker(),
    watchoutstationZonesListWorker(),
    watchaddOutstationZoneWorker(),
    watchaupdateOutstationZoneWorker(),
    watchOutstationZoneViewWorker(),
    watchdeleteOutstationZoneWorker(),
    watchBlockZonesListWorker(),
    watchaddBlockZoneWorker(),
    watchupdateBlockZoneWorker(),
    watchBlockZoneViewWorker(),
    watchunblockZoneWorker(),
    watchdeletedIntraZoneListWorker(),
    watchrestoreDeletedLocalIntraZoneWorker(),
    watchrestoreDeletedOutstationIntraZoneWorker(),
    watchrestoreDeletedSpecialIntraZoneWorker(),
    watchrestoreDeletedTollIntraZoneWorker(),
    watchdeleteLocalIntraZonePermanentlyWorker(),
    watchdeleteOutstationintraZonePermanentlyWorker(),
    watchdeleteSpecialintraZonePermanentlyWorker(),
    watchdeleteTollintraZonePermanentlyWorker(),
    watchManagezoneDrpdwnWorker(),
    watchArchivezoneDrpdwnWorker(),
    watchBlockedzoneDrpdwnWorker(),
    watchDeleteintrazoneDrpdwnWorker(),
  ]);
}
