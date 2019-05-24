import requests
import json
import csv
import unidecode
import time
import math
import os

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

def saveData(data):
    with open('nytdata.csv', 'ab') as fd:
        writer = csv.writer(fd, delimiter=',')
        for doc in data['response']['docs']:
            doctype = unidecode.unidecode(doc['document_type'])
            url = doc['web_url']
            abstract = unidecode.unidecode(doc['abstract'])
            source = unidecode.unidecode(doc['source'])
            headline = unidecode.unidecode(doc['headline']['main'])
            date = unidecode.unidecode(doc['pub_date'])
            section = unidecode.unidecode(doc['section_name'])
            subsection = unidecode.unidecode(doc['subsection_name']) if ('subsection_name' in doc) else ""
            wordcount = doc['word_count']
            byline = unidecode.unidecode(doc['byline']['original']) if doc['byline']['original'] else ""

            writer.writerow([doctype, url, abstract, source, headline, date, section, subsection, wordcount, byline])

def getData(page, start, end, save, apikey):
    requestStr = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date={1}&end_date={2}&api-key={3}&fq=source:("The New York Times")ANDdocument_type:("article")&page={0}'.format(page, start, end, apikey)
    r = requests.get(requestStr)
    data = json.loads(r.content.decode('utf-8'))
    if (save):
        saveData(data)
    return data['response']['meta']['hits']

apikey = os.getenv("NYT_API_KEY")

start = '20190522'
getRange = getData(0, start, start, False, apikey)
print("numHits: {0}".format(getRange))
pages = int(math.ceil(getRange / 10.0))
print(pages)
for i in range(pages):
    print("Get Data Page: {0} of {1}".format(i, pages))
    getData(i, start, start, True, apikey)
    time.sleep(6)