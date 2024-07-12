<div align="center">
    <h1>
        Project Monitoring & Observability Webapp
    </h1>
    <h3>
        Monitor github projects and python downloads
    </h3>
</div>


---

## Installation

    npm install

## Roadmap

### Included tech features

- [x] Adding multi environment variables
- [x] Add Material UI for GUI components
- [x] Fetch and parse Github repos of selected organization
- [x] Fetch and parse Github stargazers
- [x] Fetch and parse Python packages downloads
- [x] Fetch and parse Stargazer Forecasts using TimeGPT API
- [x] Fetch and parse Download Forecasts on Python packages
- [x] Add fixtures to be able to work offline and don't worry about the requests limits on the different APIs
- [x] Include sagas for managing actions
- [x] Include react router
- [x] Add react logger

### Included GUI features

- [x] Add component for searching an organization Github name
- [x] Add Navigation Bar that be hidden when you scroll, to have full screen view
- [x] Add Nixtla Logo to Navigation Bar, tooltip and redirection to Nixtla.com
- [x] Add Navigation idebar, for allowing navigation in the app
- [x] Add Navigation Bar Menu button, for allowing hiding the Navigation Sidebar
- [x] Make Navigation Bar responsive
- [x] Add favicon
- [x] Add Vertical Bar Chart
- [x] Add Line Chart
- [x] Add Area Chart
- [x] Add charts for displaying Stars from github at repo level on Star Section
- [x] Add charts for displaying downloads from python packages at repo level on Download Section
- [x] Add charts for displaying Stargazer Forecasts from github at repo level on Star Section
- [x] Add charts for displaying Download Forecasts from python packages at repo level on Star Section
- [x] Make all chart's layouts responsive, change layout to columns when the layout page is too small
- [x] Add zoom options to all the charts
- [x] Add pan options to all the charts
- [x] Add reset zoom and pan options to all the charts
- [x] Add charts for displaying Stars from github at repo level on Dashboard section
- [x] Add charts for displaying downloads from python packages at repo level on Dashboard Section
- [x] Add charts for displaying Download Forecasts from python packages for Dashboard Section
- [x] Add charts for displaying Stargazer Forecasts from pip python packages for Dashboard Section
- [x] Allow to compare between different datasets in same chart on Dashboard Section
- [x] Allow show/hide charts datasets
- [x] Add *Fixtures* to be able to develop without affecting to External API's rate limits
- [x] Add level option, to be able to choose between repositories or organizations levels in all sections
- [x] Mix all functionalities on dashboard unifying info on same chart
- [x] Add tracking logs
- [x] Add info message in case that selected repository or organization is not found
- [x] Add error message in downloads section in case that is not a python project
- [x] Add warning message if any repository or organization was not added yet
- [x] Allow to configure the number of polling times, to be able to have more granularity
- [x] Check to get the real  pip *projectName*

### Future features

- [ ] Add extra charts, for example for getting which projects are the most important
- [ ] Add extra charts, for example for getting which projects are trendy
- [ ] Add mongodb for avoiding requests

## Environments

There's 2 environments: development and production.

1. For running development:

        $ npm start

2. For running production:

        $ npm build


## Required Env variables

1. How to configure development? Please, create .env.development.local file with these variables:

        REACT_APP_BASE_URL=http://localhost:3500

2. How to configure production? Please, create .env.production file with these variables:

        REACT_APP_BASE_URL=[string]

## Contributors ✨

Thanks goes to these wonderful people:


<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sgonzaloc"><img src="https://avatars.githubusercontent.com/u/6353386?v=4?s=100" width="100px;" alt="gonzalo"/><br /><sub><b>Gonzalo</b></sub></a></td>
    </tr>
  </tbody>
</table>