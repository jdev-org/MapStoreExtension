import Rx from "rxjs";
import { TOGGLE_CONTROL } from "@mapstore/actions/controls";
import { isActive } from "../selector/selector";
import { CONTROL_NAME } from "@js/extension/constants";
import { resetDocsManagerState } from "../actions/actions";

export const closeExtension = (action$, store) =>
    action$
        .ofType(TOGGLE_CONTROL)
        .filter(
            ({ control }) =>
                control === CONTROL_NAME && !isActive(store.getState())
        )
        .switchMap(() => {
            return Rx.Observable.of(resetDocsManagerState());
        });
