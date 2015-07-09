module Service {
    export class InsertTripService {
        stateStored:any = false;
        allValues:any = {};
        newCreatedLocationId;

        constructor() {
        }

        setStateStored(state) {
            this.stateStored = state;
        }

        getStateStored() {
            return this.stateStored;
        }

        storeAllValues(allValues) {
            this.allValues = allValues;
        }

        getAllValues() {
            return this.allValues;
        }

        static serviceId:string = "InsertTripService";
    }
}

