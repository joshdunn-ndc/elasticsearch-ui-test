import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";

import ElasticSearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import moment from "moment";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new ElasticSearchAPIConnector({
  host: "http://localhost:9200",
  index: "test-index"
});

const config = {
  debug: true,
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    filters: [],
    search_fields: {
      entityName: {
        weight: 3
      },
      action: {},
      facility: {}
    },
    result_fields: {
      hall: { raw: {} },
      username: { raw: {} },
      facility: { raw: {} },
      entityName: { raw: {} },
      action: { raw: {} },
      eventTimestamp: {raw: {}},
      correlationId: {raw: {}}
    },
    disjunctiveFacets: [
      "acres",
      "states.keyword",
      "date_established",
      "location"
    ],
    facets: {
      "hall": {type: "value"},
      eventTimestamp: {
        type: "range",
        ranges: [
          {
            from: moment().subtract(7, "days").toISOString(),
            name: "Within the last 7 days"
          },
          {
            from: moment().subtract(14, "days").toISOString(),
            to: moment().subtract(7, "days").toISOString(),
            name: "Within the last 14 days"
          },
          {
            to: moment().subtract(14, "days").toISOString(),
            name: "More than 14 days ago"
          }
        ]
      }
    }
  }
};

const SORT_OPTIONS = [
  {
    name: "Date - Ascending",
    value: [
      {
        field: "eventTimestamp",
        direction: 'asc'
      }
    ]
  },
  {
    name: "Date - Descending",
    value: [
      {
        field: "eventTimestamp",
        direction: 'desc'
      }
    ]
  }
];

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      debounceLength={0}
                    />
                  }
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting label={"Sort by"} sortOptions={SORT_OPTIONS} />
                      )}
                      <Facet
                        field="hall"
                        label="Data Hall"
                        filterType="any"
                      />
                      <Facet
                        field="eventTimestamp"
                        label="Event Date/Time"
                      />
                      <Facet
                        field="action"
                        label="Action"
                      />
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField="action"
                      shouldTrackClickThrough={true}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
