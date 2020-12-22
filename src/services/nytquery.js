class NYTAPI {
    constructor() {
        this.RequestTimes = JSON.parse(localStorage.getItem('requestTimes')) || [];
    }

    init(apiKey) {
        this.apiKey = apiKey;
    }

    async beginGetData_archive(dataCallback) {
        let numResults = 0;
        const firstResponse = await this.getOffsetData_archive(0);

        if (firstResponse.status === "OK") {
            numResults = firstResponse.response.meta.hits;
            const pages = Math.ceil(numResults / 10.0);
            dataCallback(firstResponse.response, pages - 1);

            for (var i = 1; i < pages; i += 1) {
                const data = await this.getOffsetData_archive(i);
                dataCallback(data.response, pages - 1 - i);
            }
        }
    };

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    cleanThrottleCounter() {
        const oldest = new Date().getTime() - 60000;
        // Remove any items that are older than 1 minute
        this.RequestTimes = this.RequestTimes.filter(function (value) {
            return value > oldest;
        });

        localStorage.setItem('requestTimes', JSON.stringify(this.RequestTimes));
    }

    async throttleIfNeeded() {
        if (this.RequestTimes.length >= 20) {
            // We have made at least 20 requests in the last 1 minute, 
            //  and our max is 30 in a minute, so we need to throttle
            //  incoming requests
            await NYTAPI.sleep(parseInt(process.env.REACT_APP_SLEEP_TIME_THROTTLED_MS));
        }

        this.RequestTimes.push(new Date().getTime());
        this.cleanThrottleCounter();
        return;
    }

    async getOffsetData_archive(offset) {
        await this.throttleIfNeeded();

        const end = new Date();
        const startStr = `${end.getFullYear()}-${("0" + (end.getMonth() + 1)).slice(-2)}-${end.getDate()}`

        const requestUri = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${this.apiKey}&fq=source:(%22The%20New%20York%20Times%22)%20AND%20pub_date:${startStr}&page=${offset}`
        // const requestUri = `https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=${startStr}&end_date=${startStr}&api-key=${this.apiKey}&fq=source:("The New York Times")&page=${offset}`;
        const response = await fetch(requestUri);
        return response.json();
    }
};

export default NYTAPI;
