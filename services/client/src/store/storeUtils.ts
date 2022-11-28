import create, { StateCreator, StoreApi, UseBoundStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { flowRight as compose } from "lodash";
type StoreWithMiddleware = <T extends object>(
  initializer: StateCreator<T, [], [], T>
) => UseBoundStore<StoreApi<T>>;

export const createImmerStore: StoreWithMiddleware = compose(create, immer);
