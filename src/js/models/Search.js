import axios from 'axios';

// PARK LOOKUP
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getData() {
        const key = 'SKgbqmYr2RDnZeLnPhM0PphErCot2FVM2mD7BjPe';
        try {
            const res = await axios(`https://developer.nps.gov/api/v1/parks?parkCode=${this.query}&fields=addresses,entranceFees,operatingHours,contacts,entrancePasses,images&api_key=${key}`);
            this.result = res.data.data[0];
        } catch (error) {
            alert(error);
        }
    }
}
