import {CollectionResponse, State, StateKey} from 'schema/State/State';

export function isCollectionLoading(state: State, key: StateKey): boolean {
    let collection = (state && state[key]) as Optional<CollectionResponse<any>>;

    return Boolean(collection && (collection._loading || collection._errorLoading));
}
