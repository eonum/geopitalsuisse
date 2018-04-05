exports.getDummyHospitals = async function(){

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
		},
		attributes: [
			{name: 'Anzahl Fälle', value:78410},
			{name: 'Anzahl Ärzte', value: 200},
			{name: 'Personalkosten', value: 2123123}
		]
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
		},
		attributes: [
			{name: 'Anzahl Fälle', value:91238},
			{name: 'Anzahl Ärzte', value: 351},
			{name: 'Personalkosten', value: 4556456}
		]
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
		},
		attributes: [
			{name: 'Anzahl Fälle', value:10123},
			{name: 'Anzahl Ärzte', value: 100},
			{name: 'Personalkosten', value: 1234351}
		]
	}
	var hospitals = [bern, zuerich, basel];
       try {
        return hospitals;

    } catch (e) {
        throw Error('Error while loading dummys')
    }
}
