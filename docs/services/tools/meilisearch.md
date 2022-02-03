---
title: meilisearch
date: 2021-11-01
sidebar: "auto"
tags:
  - meilisearch
  - vuepress
categories:
  - frontend
---


## github url


[https://github.com/meilisearch/MeiliSearch](https://github.com/meilisearch/MeiliSearch)


## Add a Search Bar to Your Docs


- [https://docs.meilisearch.com/create/how_to/search_bar_for_docs.html#scrape-your-content](https://docs.meilisearch.com/create/how_to/search_bar_for_docs.html#scrape-your-content)

[![](https://raw.githubusercontent.com/meilisearch/docs-scraper/main/assets/selectors-display.png#crop=0&crop=0&crop=1&crop=1&id=Ro6Q6&originHeight=1092&originWidth=1554&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width)](https://raw.githubusercontent.com/meilisearch/docs-scraper/main/assets/selectors-display.png)


## algolia search

- [https://www.algolia.com/doc/tools/crawler/netlify-plugin/quick-start/](https://www.algolia.com/doc/tools/crawler/netlify-plugin/quick-start/)
- [https://www.npmjs.com/package/@algolia/netlify-plugin-crawler](https://www.npmjs.com/package/@algolia/netlify-plugin-crawler)


## docs-scrape


-  [meilisearch docs-scraper](https://github.com/meilisearch/docs-scraper#custom_settings-optional)
-  [docs-scraper/docs-scraper.config.json](https://github.com/meilisearch/documentation/blob/master/.vuepress/docs-scraper/docs-scraper.config.json)
-  [https://github.com/meilisearch/MeiliSearch](https://github.com/meilisearch/MeiliSearch)
-  [https://github.com/algolia/docsearch-configs](https://github.com/algolia/docsearch-configs)


## docs-scraper.config.json

```json
{
  "index_uid": "vuepress",
  "sitemap_urls": ["https://guide.chenio.top/sitemap.xml"],
  "start_urls": ["https://guide.chenio.top"],
  "selectors": {
    "lvl0": {
      "selector": ".page-title h1",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": ".theme-reco-content h1",
    "lvl2": ".theme-reco-content h2",
    "lvl3": ".theme-reco-content h3",
    "lvl4": ".theme-reco-content h4",
    "lvl5": ".theme-reco-content h5",
    "text": ".theme-reco-content p, .theme-reco-content li, .theme-reco-content a"
  },
  "strip_chars": " .,;:#",
  "scrap_start_urls": true,
  "custom_settings": {
    "synonyms": {
      "relevancy": ["relevant", "relevance"],
      "relevant": ["relevancy", "relevance"],
      "relevance": ["relevancy", "relevant"]
    },
    "stopWords": ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"]
  }
}
```


- use custom selectors per page

```json
{
  "start_urls": [
    "http://www.example.com/docs/",
    {
      "url": "http://www.example.com/docs/concepts/",
      "selectors_key": "concepts"
    },
    {
      "url": "http://www.example.com/docs/contributors/",
      "selectors_key": "contributors"
    }
  ],
  "selectors": {
    "default": {
      "lvl0": ".main h1",
      "lvl1": ".main h2",
      "lvl2": ".main h3",
      "lvl3": ".main h4",
      "lvl4": ".main h5",
      "text": ".main p"
    },
    "concepts": {
      "lvl0": ".header h2",
      "lvl1": ".main h1.title",
      "lvl2": ".main h2.title",
      "lvl3": ".main h3.title",
      "lvl4": ".main h5.title",
      "text": ".main p"
    },
    "contributors": {
      "lvl0": ".main h1",
      "lvl1": ".contributors .name",
      "lvl2": ".contributors .title",
      "text": ".contributors .description"
    }
  }
}
```


- [https://github.com/meilisearch/docs-scraper](https://github.com/meilisearch/docs-scraper)



```
docker run -t --rm \
    -e MEILISEARCH_HOST_URL= \
    -e MEILISEARCH_API_KEY= \
    -v ${PWD}/docs/.vuepress/config/docs-scraper.config.json:/docs-scraper/config.json \
    getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json
```


## docSearch algolia


-  [https://docsearch.algolia.com/](https://docsearch.algolia.com/)
-  [run-your-own](https://docsearch.algolia.com/docs/legacy/run-your-own)
-  [https://www.bilibili.com/video/BV1vb411m7NY?p=20&t=26](https://www.bilibili.com/video/BV1vb411m7NY?p=20&t=26)
-  [https://github.com/darrenjennings/algolia-docsearch-action](https://github.com/darrenjennings/algolia-docsearch-action)
-  vuepress



```
algolia:{
    appId: 'xxx',
    apiKey: 'xxx',
    indexName: 'xxx',
    algoliaOptions:{
        facetFilters: ''
    }
}
```


- github action yml



```yml
name: Build and Deploy

on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2.3.4
        with:
          persist-credentials: false
          fetch-depth: 0

      - name: Get npm cache directory
        id: npm-cache-dir
        run: |
          echo "::set-output name=dir::$(npm config get cache)"
      - uses: actions/cache@v2
        id: npm-cache # use this to check for `cache-hit` ==> if: steps.npm-cache.outputs.cache-hit != 'true'
        with:
          path: ${{ steps.npm-cache-dir.outputs.dir }}
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install and Build 🔧
        run: |
          npm install
          npm run build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.1
        with:
          token: ${{ secrets.ACCESS_TOKEN }}
          branch: gh-pages # The branch the action should deploy to.
          folder: dist # The folder the action should deploy.

  scrape-docs:
    needs: build-and-deploy
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@v2.3.4
    - name: Run docs-scraper
      env:
        HOST_URL: ${{ secrets.MEILISEARCH_HOST_URL }}
        API_KEY: ${{ secrets.MEILISEARCH_API_KEY }}
        CONFIG_FILE_PATH: ${{ github.workspace }}/docs/.vuepress/docs-scraper/docs-scraper.config.json
      run: |
        docker run -t --rm \
          -e MEILISEARCH_HOST_URL=$HOST_URL \
          -e MEILISEARCH_API_KEY=$API_KEY \
          -v $CONFIG_FILE_PATH:/docs-scraper/config.json \
          getmeili/docs-scraper:v0.10.4 pipenv run ./docs_scraper config.json

  algolia-docs:
    needs: build-and-deploy
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@v2.3.4
    - uses: darrenjennings/algolia-docsearch-action@v0.1.0
      with:
        algolia_application_id: ${{ secrets.ALGOLIA_APP_ID }}
        algolia_api_key: ${{ secrets.ALGOLIA_API_KEY }}
        file: docs/.vuepress/docs-scraper/docs-scraper.config.json
```


- json



```
{
  "index_name": "vuepress",
  "sitemap_urls": [
    "https://guide.chenio.top/sitemap.xml"
  ],
  "start_urls": [
    "https://guide.chenio.top"
  ],
  "selectors": {
    "lvl0": {
      "selector": "p.sidebar-heading.open",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": ".page h1",
    "lvl2": ".page h2",
    "lvl3": ".page h3",
    "lvl4": ".page h4",
    "lvl5": ".page h5",
    "text": ".page p, .page li, .page a",
    "lang": {
      "selector": "/html/@lang",
      "type": "xpath",
      "global": true,
      "default_value": "en-US"
    }
  },
  "selectors_exclude": [
    ".table-of-contents"
  ],
  "strip_chars": " .,;:#",
  "scrap_start_urls": false,
  "custom_settings": {
    "attributesForFaceting": [
      "lang"
    ]
  },
  "nb_hits": 7042
}
```
