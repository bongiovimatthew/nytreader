class NYTAPI {
    static async getNytData() {
        
        let numResults = 0;
        let allArticles = [];
        const firstResponse = await NYTAPI.getOffsetData(0);

        if(firstResponse.status === "OK"){
            numResults = firstResponse.num_results;
            console.log(`NumResults: ${numResults}`);
            allArticles = allArticles.concat(firstResponse.results);

            console.log(firstResponse.results);

            const pages = Math.ceil(numResults / 20.0);
            console.log(`numpages: ${pages}`);
            // allArticles.concat([...Array(pages-5).keys()].map((item, index) => NYTAPI.getOffsetData(index+1)));
        }
        
        console.log(allArticles);
        return allArticles;
    };

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async getOffsetData(offset){
        await NYTAPI.sleep(2000);
        console.log("getOffset");
        const source = 'all';
        const section = 'all';
        const timePeriod = 48;
    
        // TODO: move to .env
        const apiKey = process.env.NYT_API_KEY;

        console.log(process.env);

        const requestUri = `https://api.nytimes.com/svc/news/v3/content/${source}/${section}/${timePeriod}.json?api-key=${apiKey}&limit=20&offset=${offset}`;
        const response = await fetch(requestUri);
        return response.json();
    }
};

export default NYTAPI;
