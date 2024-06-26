// import { AccessStoreState } from "redux/store/access";
// import { AsyncProcessStatus } from "redux/store/processing";
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
// import { StoreState } from "redux/store";
// export interface ExtendedMiddleware<StateType> extends Middleware {
//     <S extends StateType>(api: MiddlewareAPI<S>): (next: Dispatch<S>) => Dispatch<S>;
// }

// export const logger: Middleware<
//   {}, // Most middleware do not modify the dispatch return value
//   S
// > = (storeApi) =>
//   (next) =>
//     (action) => {
//       console.log("MY MIDDLEWARE", action);
//       return next(action);
//     };

export type AsyncProxyFun<S> = ({ action, state, next }: {
    action: any;
    dispatch: Dispatch;
    state: S;
    next: Dispatch<AnyAction>;
}) => Promise<boolean>;

export interface Fan<S> {
    fun: AsyncProxyFun<S>;
}

export class AsyncProxyFactory<S> {
    fans: Array<Fan<S>>;
    constructor() {
        this.fans = [];
    }

    add(fun: AsyncProxyFun<S>) {
        this.fans.push({
            fun,
        });
    }

    createMiddleware(): Middleware<{}, S> {
        return (storeApi) =>
            (next) =>
                async (action) => {
                    for (const fan of this.fans) {
                        try {
                            if (
                                await fan.fun({
                                    action,
                                    state: storeApi.getState(),
                                    dispatch: storeApi.dispatch,
                                    next,
                                })
                            ) {
                                return;
                            }
                        } catch (ex) {
                            console.error("ERROR", ex);
                        }
                    }
                    // if nothing claims to have terminated the
                    // action, move along.
                    next(action);
                };
    }
}
