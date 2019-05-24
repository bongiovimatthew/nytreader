class NYTAPI {
    static async beginGetData(dataCallback) {
        
        let numResults = 0;
        const firstResponse = await NYTAPI.getOffsetData(0);

        if(firstResponse.status === "OK"){
            numResults = firstResponse.num_results;
            console.log(`NumResults: ${numResults}`);
            dataCallback(firstResponse.results)

            console.log(firstResponse.results);

            const pages = Math.ceil(numResults / 20.0);
            console.log(`numpages: ${pages}`);

            for (var i=1; i < pages; i += 1) {
                const data = await NYTAPI.getOffsetData(i);
                dataCallback(data.results);
                console.log(data);                
            }

            /* [...Array(pages).keys()].map((item, index) => {
                return NYTAPI.getOffsetData(index+1).then(results => {
                    dataCallback(results.results);
                    console.log(results);
                });
            });*/
        }
    };

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async getOffsetData(offset){
        await NYTAPI.sleep(6000);
        console.log(`getOffset: ${offset}`);
        const source = 'all';
        const section = 'all';
        const timePeriod = 24;
    
        // TODO: move to .env
        const apiKey = process.env.REACT_APP_NYT_API_KEY;
        const requestUri = `https://api.nytimes.com/svc/news/v3/content/${source}/${section}/${timePeriod}.json?api-key=${apiKey}&limit=20&offset=${offset}`;
        const response = await fetch(requestUri);
        console.log(`Request: ${requestUri}`);
        return response.json();
    }
};

export default NYTAPI;
