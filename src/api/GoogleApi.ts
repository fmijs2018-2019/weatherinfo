import { Prediction } from '../models/IPlacesAutocompleteResponse';

const autocompleteService = new (window as any).google.maps.places.AutocompleteService();

export default {
	getPlacesAutocomplete (input: string, callback: (predictions: Prediction[]) => void) {
		const request = {
			input,
			types: [ "(cities)" ],
		};
		autocompleteService.getPlacePredictions(request, callback);
	}
}