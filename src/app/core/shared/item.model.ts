import { DSpaceObject } from "./dspace-object.model";
import { Collection } from "./collection.model";
import { RemoteData } from "../data/remote-data";
import { Bundle } from "./bundle.model";
import { Bitstream } from "./bitstream.model";
import { Observable } from "rxjs";
import { hasValue } from "../../shared/empty.util";

export class Item extends DSpaceObject {

    /**
     * A string representing the unique handle of this Item
     */
    handle: string;

    /**
     * The Date of the last modification of this Item
     */
    lastModified: Date;

    /**
     * A boolean representing if this Item is currently archived or not
     */
    isArchived: boolean;

    /**
     * A boolean representing if this Item is currently withdrawn or not
     */
    isWithdrawn: boolean;

    /**
     * An array of Collections that are direct parents of this Item
     */
    parents: Array<RemoteData<Collection>>;

    /**
     * The Collection that owns this Item
     */
    owner: Collection;

    bundles: Array<RemoteData<Bundle>>;


    /**
     * Retrieves the thumbnail of this item
     * @returns {Observable<Bitstream>} the primaryBitstream of the "THUMBNAIL" bundle
     */
    getThumbnail(): Observable<Bitstream> {
        const bundle: Observable<Bundle> = this.getBundle("THUMBNAIL");
        return bundle.flatMap(
            bundle => {
                if (bundle != null) {
                    return bundle.primaryBitstream.payload;
                }
                else {
                    return Observable.of(undefined);
                }
            }
        );
    }

    /**
     * Retrieves all files that should be displayed on the item page of this item
     * @returns {Observable<Array<Observable<Bitstream>>>} an array of all Bitstreams in the "ORIGINAL" bundle
     */
    getFiles(): Observable<Array<Observable<Bitstream>>> {
        const bundle: Observable <Bundle> = this.getBundle("ORIGINAL");
        return bundle.map(bundle => {
            if (hasValue(bundle) && Array.isArray(bundle.bitstreams)) {
                return bundle.bitstreams.map(bitstream => bitstream.payload)
            }
        });
    }

    /**
     * Retrieves the bundle of this item by its name
     * @param name The name of the Bundle that should be returned
     * @returns {Observable<Bundle>} the Bundle that belongs to this item with the given name
     */
    getBundle(name: String): Observable<Bundle> {
        return Observable.combineLatest(
            ...this.bundles.map(b => b.payload),
            (...bundles: Array<Bundle>) => bundles)
            .map(bundles => {
                return bundles.find((bundle: Bundle) => {
                    return bundle.name === name
                });
            });
    }

    /**
     * Retrieves all direct parent collections of this item
     * @returns {Array<Observable<Collection>>} an array of all Collections that contain this item
     */
    getCollections(): Array<Observable<Collection>> {
        return this.parents.map(collection => collection.payload.map(parent => parent));
    }

}