import {CollectionResponse, ModelSchema, State, StateKey} from 'schema/State/State';

export function getCollectionResults<T = ModelSchema>(state: State, key: StateKey): Optional<T[]> {
    let collection = (state && state[key]) as Optional<CollectionResponse<T>>;

    if (collection && collection.results) {
        return collection.results;
    }
}
