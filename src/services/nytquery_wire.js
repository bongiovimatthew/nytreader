class NYTAPI{ 
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
}