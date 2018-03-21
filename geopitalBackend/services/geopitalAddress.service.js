

_this = this

exports.getHospitals = async function(){

/*	var Hospital{
		name: String,
		street: String,
		streetNumber: String,
		plz: String,
		city: String
	}
*/
	var bern = {
		name: "Inselspital",
		street: "Bahnhof",
		streetNumber:"1",
		plz: "3000",
		city:"Bern"
}
	var zuerich = {
		name: "Unispital",
		street: "Bahnhof",
		streetNumber:"1",
		plz: "8000",
		city:"Zuerich"
}
	var hospitals = [bern, zuerich];
       try {

        // Return the todod list that was retured by the mongoose promise
        return hospitals;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Todos')
    }
}

exports.getDummyHospitals = async function(){

/*	var Hospital{
		name: String,
		street: String,
		streetNumber: String,
		plz: String,
		city: String
	}
*/
	var bern = {
		name: "Inselspital",
		address: {
			street: "Freiburgstrasse",
			streetNumber: "8",
			plz: "3010",
			city: "Bern"
		},
		coordinates: {
			latitude: "46°56'52.7N",
			longitude : "7°25'29.2E"
		}
}
	var zuerich = {
		name: "Unispital Zürich",
		address: {
			street: "Rämisstrasse",
			streetNumber: "100",
			plz: "8091",
			city: "Zürich"
		},
		coordinates: {
			latitude: "47°22'36.4N",
			longitude: "8°33'03.8E"
		}
}
	var basel = {
		name: "Unispital Basel",
		address: {
			street: "Spitalstrasse",
			streetNumber: "21",
			plz: "4031",
			city: "Basel"
		},
		coordinates: {
			latitude: "47°33'44.3N",
			longitude: "7°34'59.7E"
		}
	}
	var hospitals = [bern, zuerich, basel];
       try {

        // Return the todod list that was retured by the mongoose promise
        return hospitals;

    } catch (e) {

        // return a Error message describing the reason
        throw Error('Error while Paginating Todos')
    }
}
