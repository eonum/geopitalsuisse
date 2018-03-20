

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

