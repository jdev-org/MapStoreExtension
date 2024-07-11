import Rx from "rxjs";

import { TOGGLE_CONTROL } from "@mapstore/actions/controls";
import { CONTROL_NAME } from "../../constants/main";

import {
    purgeMapInfoResults,
    hideMapinfoMarker,
} from "@mapstore/actions/mapInfo";

import {
    registerEventListener,
    unRegisterEventListener,
} from "@mapstore/actions/map";

import {
    UPDATE_MAP_LAYOUT,
    updateMapLayout,
} from "@mapstore/actions/maplayout";

import { enable } from '../selectors/selectors';

import { SIZE } from "../../constants/main";

export const onOpenComponent = (action$, store) =>
    action$
        .ofType(TOGGLE_CONTROL)
        .filter((action) => {
            return action.control === CONTROL_NAME && enable(store.getState());
        })
        .switchMap(() => {
            return Rx.Observable.from([
                purgeMapInfoResults(),
                hideMapinfoMarker(),
                registerEventListener("click", CONTROL_NAME),
            ]);
        });

export const closeSampleComponentEpic = (action$, store) =>
    action$
        .ofType(TOGGLE_CONTROL)
        .filter((action) => {
            return action.control === CONTROL_NAME && !enable(store.getState());
        })
        .switchMap(() => {
            return Rx.Observable.from([
                purgeMapInfoResults(),
                hideMapinfoMarker(),
                unRegisterEventListener("click", CONTROL_NAME)
            ]);
        });

export const updateTbarSearchBarPositions = (action$, store) =>
    action$
        .ofType(UPDATE_MAP_LAYOUT)
        .filter(() => {
            return enable(store.getState());
        })
        .filter(({ source }) => {
            return source !== CONTROL_NAME;
        })
        .map(({ layout }) => {
            const action = updateMapLayout({
                ...layout,
                right: SIZE + (layout?.boundingSidebarRect?.right ?? 0),
                boundingMapRect: {
                    ...(layout.boundingMapRect || {}),
                    right: SIZE + (layout?.boundingSidebarRect?.right ?? 0),
                },
                rightPanel: true,
            });
            return { ...action, source: CONTROL_NAME }; // add an argument to avoid infinite loop.
        });

export const logCounterValue = (action$, store) =>
    action$.ofType("INCREASE_COUNTER").switchMap(() => {
        /* eslint-disable */
        console.log("CURRENT VALUE: " + store.getState().sampleExtension.value);
        /* eslint-enable */
        return Rx.Observable.empty();
    });