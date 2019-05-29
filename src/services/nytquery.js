class NYTAPI {

    static async beginGetData_archive(dataCallback){
        
        let numResults = 0;
        const firstResponse = await NYTAPI.getOffsetData_archive(0);

        if(firstResponse.status === "OK"){
            numResults = firstResponse.response.meta.hits;
            console.log(`NumResults: ${numResults}`);
            const pages = Math.ceil(numResults / 10.0);

            dataCallback(firstResponse.response, pages - 1);
            console.log(`numpages: ${pages}`);

            for (var i=1; i < pages; i += 1) {
                const data = await NYTAPI.getOffsetData_archive(i);
                dataCallback(data.response, pages - 1 - i);
                console.log(data);                
            }
        }
    };

    static async beginGetData(dataCallback) {
        
        let numResults = 0;
        const firstResponse = await NYTAPI.getOffsetData(0);

        if(firstResponse.status === "OK"){
            numResults = firstResponse.num_results;
            console.log(`NumResults: ${numResults}`);
            const pages = Math.ceil(numResults / 20.0);

            dataCallback(firstResponse, pages - 1);
            console.log(`numpages: ${pages}`);

            for (var i=1; i < pages; i += 1) {
                const data = await NYTAPI.getOffsetData(i);
                dataCallback(data, pages - 1 - i);
                console.log(data);                
            }
        }
    };

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async getOffsetData_archive(offset){
        console.log(parseInt(process.env.REACT_APP_SLEEP_TIME_MS))
        await NYTAPI.sleep(parseInt(process.env.REACT_APP_SLEEP_TIME_MS));
        console.log(`getOffset_archive: ${offset}`);
    
        const end = new Date();
        const startStr = `${end.getFullYear()}${("0" + (end.getMonth() + 1)).slice(-2)}${end.getDate()}`

        const apiKey = process.env.REACT_APP_NYT_API_KEY;
        const requestUri = `https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=${startStr}&end_date=${startStr}&api-key=${apiKey}&fq=source:("The New York Times")&page=${offset}`;
        const response = await fetch(requestUri);
        console.log(`Request: ${requestUri}`);
        return response.json();
    }

    static async getOffsetData(offset){
        // await NYTAPI.sleep(process.env.REACT_APP_SLEEP_TIME_MS);
        console.log(`getOffset: ${offset}`);
        const source = 'all';
        const section = 'all';
        const timePeriod = 24;
    
        const apiKey = process.env.REACT_APP_NYT_API_KEY;
        const requestUri = `https://api.nytimes.com/svc/news/v3/content/${source}/${section}/${timePeriod}.json?api-key=${apiKey}&limit=20&offset=${offset}`;
        const response = await fetch(requestUri);
        console.log(`Request: ${requestUri}`);
        return response.json();
    }
};

export default NYTAPI;
