
<div align="center">
    <h1>
        Project Monitoring & Observability Backend 
    </h1>
    <h3>
        Monitor github projects and python downloads
    </h3>
</div>

---
![Node.js](https://img.shields.io/badge/Node-18.17.1-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express&logoColor=white)
![Dotenv](https://img.shields.io/badge/Dotenv-16.4.4-000000)
![Date-fns](https://img.shields.io/badge/Date--fns-3.3.1-ff7f50)
![Lodash](https://img.shields.io/badge/Lodash-4.17.21-3498db)
![Body-Parser](https://img.shields.io/badge/Body--Parser-1.20.2-ff69b4)
![CORS](https://img.shields.io/badge/CORS-2.8.5-61DAFB)
![UUID](https://img.shields.io/badge/UUID-9.0.1-6f42c1)
![License](https://img.shields.io/badge/License-MIT-green)
---

## Installation

    npm install


## Roadmap

### Included features
- [x] Adding multi environment variables
- [x] Supporting Cross-Origin Resource Sharing (cors)
- [x] Fetch and parse Github repos
- [x] Fetch and parse Python packages downloads
- [x] Fetch and parse Github stargazers
- [x] Add fixtures for downloads and stargazers to be able to work offline and don't worry about the requests limits on the different APIs
- [x] Fetch and parse forecasts from timeGPT1 model
- [x] Add fixtures for download forecasts and stargazer forecasts, to be able to work offline and don't worry about the requests limits on the different APIs
- [x] Fetching data filling with zeros when there's no info for that dates
- [x] Fetching 2 pages stargazers when we reach less than 100 stargazers
- [x] Fetch and parse extra repo information for specific projectName, including pip package nane
- [x] Handle fetching error messages for repo's endpoints
- [x] Handle fetching error messages for project's endpoints
- [x] Handle fetching error messages for download's endpoints
- [x] Handle fetching error messages for stargazer's endpoints
- [x] Handle fetching error messages for forecast's endpoints
- [x] Add extra catch's for avoiding crashing app
- [x] Fetching data for specific page and per_page numbers
- [x] Fetching quantile pages using polling, to be able to extract several window's info to create whole star and download's history
- [x] Add middleware for logging and tracking info and unexpected errors
- [x] Add validation for missing parameters and query requirements

### Future features
- [ ] Save info in mongodb to be able to avoid doing several requests to external APIs, each time that we want to get the project info

## Environments

There's 3 environments: development, development fixtures and production.

1. For running development:

        $ npm run dev

2. For running development fixtures:

        $ npm run dev:fixtures

3. For running production:

        $ npm run start

## API

* For fetching github repos

    Request: **GET** `{serverBaseUrl}/repos?organizationName={organizationName}`

    Response: **200** `Array<{name: string, fullName: string, defaultBranch: string, stargazersCount: string}>`


* For fetching extra repo information for specific projectName

  Request: **GET** `{serverBaseUrl}/projects/{projectName}?organization={organization}&project={projectName}&default_branch={default_branch}`

  Response: **200** `{type: Python|Other, pipName: string}`


* For fetching downloads repository from PePy.tech

    Request: **GET** `{serverBaseUrl}/downloads/repos?repoFullName={projectName}&defaultBranch={defaultBranch}`

    Response: **200** `Array<{date: string(10), count: number, totalCounts: number}>`


* For fetching downloads organization from PePy.tech

  Request: **GET** `{serverBaseUrl}/downloads/organizations?organizationName={organizationName}`

  Response: **200** `Array<{date: string(10), count: number, totalCounts: number}>`


* For fetching stargazers repository from Github

  Request: **GET** `{serverBaseUrl}/stargazers?organizationName={organizationName}&repoName={repoName}&stargazersCount={stargazersCount}`

  Response: **200** `Array<{date: string(10), count: number, totalCounts: number}>`


* For fetching stargazers organization from Github

  Request: **GET** `{serverBaseUrl}/stargazers?organizationName={organizationName}`

  Response: **200** `Array<{date: string(10), count: number, totalCounts: number}>`


* For fetching forecasts from timeGPT1
    
    Request: **GET** `{serverBaseUrl}/forecasts?forecastsType={forecastsType}&forecastsName={forecastsName}`
    
    Response: **200** `Array<{date: string(10), count: number, totalCounts: number}>`


## Required Env variables

1. How to configure development? Please, create .env.development.local file with these variables:

        TIMEGPT1_SECRET=[string]        
        PEPYTECH_API_KEY=[string]             
        PAGINATION_MAX_PER_PAGE=[number]   
        POLLING_NUMBER_TIMES=[number]  
        GITHUB_SECRET=[string]

2. How to configure development fixtures? Please, create .env.development.fixtures.local file with these variables:

        USE_FIXTURES_DATA=true
        TIMEGPT1_SECRET=[string]        
        PEPYTECH_API_KEY=[string]             
        PAGINATION_MAX_PER_PAGE=[number]   
        POLLING_NUMBER_TIMES=[number]  
        GITHUB_SECRET=[string]

3. How to configure production? Please, create .env.production file with these variables:

        TIMEGPT1_SECRET=[string]        
        PEPYTECH_API_KEY=[string]             
        PAGINATION_MAX_PER_PAGE=[number]   
        POLLING_NUMBER_TIMES=[number]  
        GITHUB_SECRET=[string]
        DISABLE_LOGS=[true/false]
        HOST_ALLOWED=[string]

## Contributors ✨

Thanks goes to these wonderful people:


<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sgonzaloc"><img src="https://avatars.githubusercontent.com/u/6353386?v=4?s=100" width="100px;" alt="gonzalo"/><br /><sub><b>Gonzalo</b></sub></a></td>
    </tr>
  </tbody>
</table>
