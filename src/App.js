import React from 'react';
import { render } from '@testing-library/react';

import { WrapIntlProvider } from '../../testsHelper';
import TabContent from './TabContent';

const Tab = () => null;

xdescribe('<TabContent />', function () {
  const onChangeMock = jest.fn();
  const defaultProps = {
    onTabChange: onChangeMock,
    activeIndex: 0,
  };
  const tabs = [
    {
      title: 'product settigs',
      content: jest.mock(
        '../../containers/Tabs/ProductSettings/ProductSettings.js'
      ),
    },
  ];
  const getComponent = ({ testProps = defaultProps }) => {
    return (
      <WrapIntlProvider>
        <TabContent {...testProps}>
          {tabs.map((tab, i) => (
            <Tab key={i} title={tab.title}>
              {tab.content}
            </Tab>
          ))}
        </TabContent>
      </WrapIntlProvider>
    );
  };

  it('should render <TabContent />', () => {
    const { container } = render(getComponent({}));
    expect(container).toMatchSnapshot();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WrapIntlProvider, WrapStore } from '../../testsHelper';
import Suggestions from './Suggestions';
import { initialState as suggestionsInitialState } from '../../reducers/suggestions';

describe('<Suggestions />', function () {
  const handleSearchMock = jest.fn();
  const initialState = {
    suggestions: suggestionsInitialState,
  };
  const defaultProps = {
    suggestions: ['NP0001', 'NP000102', 'NP0001Test2674'],
    autoSuggestRef: React.createRef({ current: { style: { width: 200 } } }),
    cursor: 0,
    handleSearch: handleSearchMock,
  };
  const getComponent = ({ testProps = defaultProps, state = initialState }) => {
    return (
      <WrapStore initialState={state}>
        <WrapIntlProvider>
          <Suggestions {...testProps} />
        </WrapIntlProvider>
      </WrapStore>
    );
  };

  it('should render <Suggestions />', () => {
    const { container } = render(getComponent({}));
    expect(container).toMatchSnapshot();
  });

  it('should call onClick when autoSuggestions are visible and user clicks on an item', () => {
    const listItemValue = 'NP0001';

    render(getComponent({}));
    const listItem = screen.getByTestId('pdp-auto-suggestion-list-item-0');
    userEvent.click(listItem);
    expect(handleSearchMock).toHaveBeenCalledWith(listItemValue);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WrapIntlProvider, WrapStore } from '../../testsHelper';
import Suggestions from './Suggestions';
import { initialState as suggestionsInitialState } from '../../reducers/suggestions';

describe('<Suggestions />', function () {
  const handleSearchMock = jest.fn();
  const initialState = {
    suggestions: suggestionsInitialState,
  };
  const defaultProps = {
    suggestions: ['NP0001', 'NP000102', 'NP0001Test2674'],
    autoSuggestRef: React.createRef({ current: { style: { width: 200 } } }),
    cursor: 0,
    handleSearch: handleSearchMock,
  };
  const getComponent = ({ testProps = defaultProps, state = initialState }) => {
    return (
      <WrapStore initialState={state}>
        <WrapIntlProvider>
          <Suggestions {...testProps} />
        </WrapIntlProvider>
      </WrapStore>
    );
  };

  it('should render <Suggestions />', () => {
    const { container } = render(getComponent({}));
    expect(container).toMatchSnapshot();
  });

  it('should call onClick when autoSuggestions are visible and user clicks on an item', () => {
    const listItemValue = 'NP0001';

    render(getComponent({}));
    const listItem = screen.getByTestId('pdp-auto-suggestion-list-item-0');
    userEvent.click(listItem);
    expect(handleSearchMock).toHaveBeenCalledWith(listItemValue);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('<Pagination />', function () {
  const testStartPage = 0;
  const testTotalItems = 99;
  const onPageChange = jest.fn();
  const getComponent = ({
    totalItems = testTotalItems,
    startPage = testStartPage,
  }) => {
    return (
      <Pagination
        startPage={startPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    );
  };

  it('should render <Pagination />', () => {
    const { container } = render(getComponent({}));
    expect(container).toMatchSnapshot();
  });

  it('should move to next page', () => {
    const { container } = render(getComponent({}));
    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[1]);
    expect(container).toMatchSnapshot();
  });

  it('should render from a different start page', () => {
    const { container } = render(getComponent({ startPage: 6 }));
    expect(container).toMatchSnapshot();
  });

  it('should move to prev page', () => {
    const { container } = render(getComponent({ startPage: 6 }));
    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[0]);
    expect(container).toMatchSnapshot();
  });

  it('should move to a specific page', () => {
    const { container } = render(getComponent({ startPage: 6 }));
    const newPage = screen.getByTestId('page-4');
    userEvent.click(newPage);
    expect(container).toMatchSnapshot();
  });
});

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WrapIntlProvider, WrapStore } from './../../testsHelper';
import { initialState as existingBannerInitialState } from './../../reducers/existingBanner';
import { initialState as bannerInitialState } from './../../reducers/banners';
import { COUNTRY_CODES } from 'constants/constants';
import * as ReactRedux from 'react-redux';
import en from '../../i18n/en';
import Form from './Form';

let mockDispatch = () => {
  return Promise.resolve({ code: 200, status: 'OK' });
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  __setDispatch: (fn) => {
    mockDispatch = fn;
  },
}));

describe('<Form/>', () => {
  let initialState = {
    existingBanner: existingBannerInitialState,
    banners: bannerInitialState,
  };
  const getComponent = ({ state = initialState }) => {
    return (
      <WrapStore initialState={state}>
        <WrapIntlProvider>
          <Form
            isEdit={true}
            bannerName={initialState.bannerName}
            bannerData={initialState}
            bannerType={initialState.bannerType}
            onSuccess={jest.fn()}
          />
        </WrapIntlProvider>
      </WrapStore>
    );
  };
  it('should render <Form/>', () => {
    const { container } = render(getComponent({}));
    expect(container).toMatchSnapshot();
  });

  it('should render along with data of banner <Form/>', () => {
    initialState = {
      existingBanner: {
        content: [
          {
            isoCode: 'us',
            bannerMessage:
              'For accurate detection of microbiome composition by 16S rRNA genes, explore <a href="https://www.qa.thermofisher.com/global/en/home/life-science/pcr/pcr-enzymes-master-mixes.html?open=broadrangepcr">PCR enzymes certified for low bacterial gDNA &raquo;</a>',
          },
        ],
        isFetching: false,
      },
      banners: {
        content: [
          {
            bannerName: '16S rRNA SKU A42351',
            bannerMessage:
              'For accurate detection of microbiome composition by 16S rRNA genes, explore <a href="https://www.qa.thermofisher.com/global/en/home/life-science/pcr/pcr-enzymes-master-mixes.html?open=broadrangepcr">PCR enzymes certified for low bacterial gDNA &raquo;</a>',
          },
        ],
        isFetching: false,
      },
    };
    const { container } = render(getComponent({ state: initialState }));

    expect(container).toMatchSnapshot();
  });

  it('should click save button without valid inputs <Form/>', (done) => {
    render(getComponent({}));
    const saveButton = screen.getByText('Save');
    userEvent.click(saveButton);
    setTimeout(() => {
      const errorMsgsOnScreen = screen.getAllByText(
        en.messages.validationRequiredField,
        { exact: false }
      );
      expect(errorMsgsOnScreen).not.toHaveLength(0);
      done();
    }, 10);
  });

  it('should click save button without valid inputs', async () => {
    render(getComponent({}));
    const saveButton = screen.getByText('Save');
    userEvent.click(saveButton);
    expect(
      await screen.findAllByText(en.messages.validationRequiredField)
    ).not.toHaveLength(0);
  });

  it('should click save button with valid inputs in create banner', (done) => {
    const onSuccess = jest.fn();
    const getComponentCreateBanner = ({ state = initialState }) => {
      return (
        <WrapStore initialState={state}>
          <WrapIntlProvider>
            <Form
              bannerName={initialState.bannerName}
              bannerData={initialState}
              bannerType={initialState.bannerType}
              onSuccess={onSuccess}
            />
          </WrapIntlProvider>
        </WrapStore>
      );
    };
    render(getComponentCreateBanner({}));
    userEvent.type(
      screen.getByPlaceholderText(en.messages.bannerFromNamePlaceholder),
      'Banner Name'
    );
    userEvent.type(
      screen.getByPlaceholderText(en.messages.bannerFromTextPlaceholder),
      'Testing Text'
    );
    userEvent.type(
      screen.getByPlaceholderText(en.messages.bannerFormLocationPlaceholder),
      'al, af'
    );
    userEvent.type(
      screen.getByPlaceholderText(en.messages.bannerAddSkuPlaceHolder),
      'np0001, np0002'
    );
    const dateInputs = screen.getAllByPlaceholderText(
      en.messages.yyyyMMddDatePlaceholder
    );
    fireEvent.change(dateInputs[1], {
      target: { value: '2022-01-05' },
    });
    fireEvent.change(dateInputs[0], {
      target: { value: '2022-01-01' },
    });
    const saveButton = screen.getByText('Save');
    userEvent.click(saveButton);
    setTimeout(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
      done();
    }, 1500);
  });

  describe('viewAllHandler fn', () => {
    const initialStateWithLocation = {
      existingBanner: {
        content: [
          {
            isoCode: 'us',
            bannerMessage:
              'For accurate detection of microbiome composition by 16S rRNA genes, explore <a href="https://www.qa.thermofisher.com/global/en/home/life-science/pcr/pcr-enzymes-master-mixes.html?open=broadrangepcr">PCR enzymes certified for low bacterial gDNA &raquo;</a>',
          },
        ],
        isoCodeList: ['al', 'af'],
        isFetching: false,
      },
      banners: {
        content: [
          {
            bannerName: '16S rRNA SKU A42351',
            bannerMessage:
              'For accurate detection of microbiome composition by 16S rRNA genes, explore <a href="https://www.qa.thermofisher.com/global/en/home/life-science/pcr/pcr-enzymes-master-mixes.html?open=broadrangepcr">PCR enzymes certified for low bacterial gDNA &raquo;</a>',
          },
        ],
        isFetching: false,
      },
    };
    const getComponentViewAllHandler = ({ state = initialState }) => {
      return (
        <WrapStore initialState={state}>
          <WrapIntlProvider>
            <Form
              isEdit={true}
              bannerName={initialState.bannerName}
              bannerData={state.existingBanner}
              bannerType={initialState.bannerType}
              onSuccess={jest.fn()}
            />
          </WrapIntlProvider>
        </WrapStore>
      );
    };

    it('viewAllHandler fn', () => {
      render(getComponentViewAllHandler({ state: initialStateWithLocation }));
      const viewAllButton = screen.getByTestId('locations');
      userEvent.click(viewAllButton);
      expect(
        screen.getByDisplayValue(
          initialStateWithLocation.existingBanner.isoCodeList.join(', ')
        )
      ).toBeInTheDocument();
    });

    it('save fn', async () => {
      const state = {
        existingBanner: {
          content: [
            {
              isoCode: 'us',
              bannerMessage:
                'If your Applied Biosystems account has not yet been transferred to Life Technologies',
            },
          ],
          isFetching: false,
          fetched: true,
          error: null,
          allSkus: [],
          isoCodeList: ['us'],
          startDate: '2011-12-19 12:00:00',
          endDate: '2012-06-30 12:00:00',
        },
      };

      ReactRedux.__setDispatch(
        jest.fn().mockImplementation(() => Promise.resolve())
      );

      render(
        <WrapStore initialState={state}>
          <WrapIntlProvider>
            <Form
              isEdit={true}
              bannerName="Test Banner"
              bannerData={state.existingBanner}
              bannerType={initialState.bannerType}
              onSuccess={jest.fn()}
            />
          </WrapIntlProvider>
        </WrapStore>
      );
      fireEvent.change(
        screen.getByPlaceholderText(en.messages.bannerFromTextPlaceholder),
        {
          target: { value: 'Testing Text' },
        }
      );
      const saveButton = screen.getByText('Save');
      userEvent.click(saveButton);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('close modal fn', () => {
      render(getComponentViewAllHandler({ state: initialStateWithLocation }));
      const viewAllButton = screen.getByTestId('locations');
      userEvent.click(viewAllButton);
      const closeModalButton = screen.getByText(en.messages.close);
      userEvent.click(closeModalButton);
      expect(screen.queryByText(/Close/)).toBeNull();
    });
  });

  describe('Edit Banner<Form/>', () => {
    const getCreateBannerComponent = ({ state = initialState }) => {
      return (
        <WrapStore initialState={state}>
          <WrapIntlProvider>
            <Form
              isEdit={true}
              bannerName={initialState.bannerName}
              bannerData={state.existingBanner}
              bannerType={initialState.bannerType}
              onSuccess={jest.fn()}
            />
          </WrapIntlProvider>
        </WrapStore>
      );
    };

    it('viewAllCountryHandler fn', () => {
      render(getCreateBannerComponent({}));
      const addAllCountryButton = screen.getByText(
        en.messages.bannerFormAddAllCountries
      );
      userEvent.click(addAllCountryButton);
      expect(
        screen.getByDisplayValue(COUNTRY_CODES.join(', '))
      ).toBeInTheDocument();
    });
  });
});

// reducers..........

import priceLists, { initialState } from './priceLists';
import {
  REQUEST_LISTS,
  CREATE_LIST,
  DELETE_LIST,
  FETCH_PRICELISTS_TO_CREATE_ITEM,
  SEARCH_LISTS,
  SEARCH_PRICELISTS_TO_CREATE_ITEMS,
  TOGGLE_ALL_UNASSIGNED_LISTS,
  UPDATE_ASSIGN_LIST_FIELD,
  ASSIGN_PARTNER_LISTS,
  INCLUDE_EXCLUDE_ITEM,
  TOGGLE_ALL_INCLUSION_LISTS,
  UPDATE_INCLUDE_EXCLUDE_LIST_FIELD,
  UPDATE_ORDER_LIST_FIELD,
  ITEM_UPDATE_ORDER,
  CLEAR_LIST_TYPE_ERROR,
} from '../constants/actionTypes';
import { LIST_TYPES } from '../constants/constants';
import { PENDING, SUCCESS, ERROR } from '../constants/status';

describe('Reducers - priceLists', function () {
  let state;
  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return initial state', () => {
    expect(priceLists(state, { type: 'unhandled' })).toEqual(state);
  });
  it('should handle REQUEST_LISTS_PENDING action', () => {
    const expected = {
      ...state,
      isFetching: true,
    };
    const action = {
      type: `${REQUEST_LISTS}_${PENDING}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle REQUEST_LISTS_SUCCESS action for price lists', () => {
    const response = {
      response: {
        content: [{}],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceLists: response.response,
      priceListsFetched: true,
      listsError: null,
      entitlementListsError: null,
      priceAccessListsError: null,
      assignHeaderChecked: true,
    };
    const action = {
      type: `${REQUEST_LISTS}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.PRICE,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle REQUEST_LISTS_SUCCESS action for entitlement lists', () => {
    const response = {
      response: {
        content: [{}],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      entitlementLists: response.response,
      entitlementListsFetched: true,
      listsError: null,
      entitlementListsError: null,
      priceAccessListsError: null,
      assignHeaderChecked: true,
    };
    const action = {
      type: `${REQUEST_LISTS}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.ENTITLEMENT,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle REQUEST_LISTS_SUCCESS action for price access lists', () => {
    const response = {
      response: {
        content: [{}],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceAccessLists: response.response,
      priceAccessListsFetched: true,
      listsError: null,
      entitlementListsError: null,
      priceAccessListsError: null,
      assignHeaderChecked: true,
    };
    const action = {
      type: `${REQUEST_LISTS}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.PRICE_ACCESS,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle REQUEST_LISTS_SUCCESS action for product entitlement lists', () => {
    const response = {
      response: {
        content: [{}],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      productEntitlementLists: response.response,
      productEntitlementListsFetched: true,
      listsError: null,
      entitlementListsError: null,
      priceAccessListsError: null,
      assignHeaderChecked: true,
    };
    const action = {
      type: `${REQUEST_LISTS}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.PRODUCT_ENTITLEMENT,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle REQUEST_LISTS_SUCCESS action for product entitlement item lists', () => {
    const response = {
      response: {
        content: [{}],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      productEntitlementItemLists: response.response,
      productEntitlementItemListsFetched: true,
      listsError: null,
      entitlementListsError: null,
      priceAccessListsError: null,
      assignHeaderChecked: true,
    };
    const action = {
      type: `${REQUEST_LISTS}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle REQUEST_LISTS_ERROR action for price lists', () => {
    const error = {
      error: {
        responseMetaData: { processingTime: 61 },
        code: 401,
        status: 'UNAUTHORIZED',
        message: 'Not Valid user',
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceListsError: error,
      listsError: error.error,
      priceListsFetched: true,
    };
    const action = {
      type: `${REQUEST_LISTS}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.PRICE,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle REQUEST_LISTS_ERROR action for entitlement lists', () => {
    const error = {
      error: {
        responseMetaData: { processingTime: 61 },
        code: 401,
        status: 'UNAUTHORIZED',
        message: 'Not Valid user',
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      entitlementListsError: error,
      entitlementListsFetched: true,
      listsError: error.error,
    };
    const action = {
      type: `${REQUEST_LISTS}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.ENTITLEMENT,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle REQUEST_LISTS_ERROR action for price access lists', () => {
    const error = {
      error: {
        responseMetaData: { processingTime: 61 },
        code: 401,
        status: 'UNAUTHORIZED',
        message: 'Not Valid user',
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceAccessListsError: error,
      priceAccessListsFetched: true,
      listsError: error.error,
    };
    const action = {
      type: `${REQUEST_LISTS}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.PRICE_ACCESS,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle CREATE_LIST_PENDING action', () => {
    const expected = {
      ...state,
      isFetching: true,
    };
    const action = {
      type: `${CREATE_LIST}_${PENDING}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle CREATE_LIST_SUCCESS action for price lists', () => {
    const response = {
      response: {
        response: {
          id: 15,
          name: 'Australia - AUD Industrial PriceList',
          region: 'NA',
          country: 'au',
          currency: 'au',
          customerType: 'Industrial',
          supplier: '68929318',
          status: 'Active',
        },
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceLists: {
        content: [response.response],
        totalElements: 1,
      },
    };
    const action = {
      type: `${CREATE_LIST}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.PRICE,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle CREATE_LIST_SUCCESS action for entitlement lists', () => {
    const response = {
      response: {
        response: {
          id: 15,
          name: 'Australia - AUD Industrial PriceList',
          region: 'NA',
          country: 'au',
          currency: 'au',
          customerType: 'Industrial',
          supplier: '68929318',
          status: 'Active',
        },
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      entitlementLists: {
        content: [response.response],
        totalElements: 1,
      },
    };
    const action = {
      type: `${CREATE_LIST}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.ENTITLEMENT,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle CREATE_LIST_SUCCESS action for price access lists', () => {
    const response = {
      response: {
        response: {
          id: 15,
          name: 'Australia - AUD Industrial PriceList',
          country: 'au',
        },
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceAccessLists: {
        content: [response.response],
        totalElements: 1,
      },
    };
    const action = {
      type: `${CREATE_LIST}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.PRICE_ACCESS,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle CREATE_LIST_ERROR action for price lists', () => {
    const error = {
      error: {
        code: 400,
        message: 'Enter unique Name',
        status: 'BAD_REQUEST',
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceListsError: error.error,
    };
    const action = {
      type: `${CREATE_LIST}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.PRICE,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle CREATE_LIST_ERROR action for entitlement lists', () => {
    const error = {
      error: {
        code: 400,
        message: 'Enter unique Name',
        status: 'BAD_REQUEST',
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      entitlementListsError: error.error,
    };
    const action = {
      type: `${CREATE_LIST}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.ENTITLEMENT,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle CREATE_LIST_ERROR action for price access lists', () => {
    const error = {
      error: {
        code: 400,
        message: 'Enter unique Name',
        status: 'BAD_REQUEST',
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceAccessListsError: error.error,
    };
    const action = {
      type: `${CREATE_LIST}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.PRICE_ACCESS,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle DELETE_LIST_PENDING action', () => {
    const expected = {
      ...state,
      isFetching: true,
    };
    const action = {
      type: `${DELETE_LIST}_${PENDING}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle DELETE_LIST_SUCCESS action for price lists', () => {
    const existingState = {
      ...state,
      priceLists: {
        content: [
          {
            id: 15,
            name: 'Australia - AUD Industrial PriceList',
            region: 'NA',
            country: 'au',
            currency: 'au',
            customerType: 'Industrial',
            supplier: '68929318',
            status: 'Active',
          },
        ],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceLists: {
        content: [],
        totalElements: 0,
      },
    };
    const response = {
      responseMetaData: {
        processingTime: 269,
      },
      code: 200,
      status: 'OK',
    };
    const action = {
      type: `${DELETE_LIST}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.PRICE,
        id: 15,
      },
    };
    expect(priceLists(existingState, action)).toEqual(expected);
  });
  it('should handle DELETE_LIST_SUCCESS action for entitlement lists', () => {
    const existingState = {
      ...state,
      entitlementLists: {
        content: [
          {
            id: 15,
            name: 'Australia - AUD Industrial PriceList',
            region: 'NA',
            country: 'au',
            currency: 'au',
            customerType: 'Industrial',
            supplier: '68929318',
            status: 'Active',
          },
        ],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      entitlementLists: {
        content: [],
        totalElements: 0,
      },
    };
    const response = {
      responseMetaData: {
        processingTime: 269,
      },
      code: 200,
      status: 'OK',
    };
    const action = {
      type: `${DELETE_LIST}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.ENTITLEMENT,
        id: 15,
      },
    };
    expect(priceLists(existingState, action)).toEqual(expected);
  });
  it('should handle DELETE_LIST_SUCCESS action for price access lists', () => {
    const existingState = {
      ...state,
      priceAccessLists: {
        content: [
          {
            id: 15,
            name: 'Australia - AUD Industrial PriceList',
            country: 'au',
          },
        ],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceAccessLists: {
        content: [],
        totalElements: 0,
      },
    };
    const response = {
      responseMetaData: {
        processingTime: 269,
      },
      code: 200,
      status: 'OK',
    };
    const action = {
      type: `${DELETE_LIST}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.PRICE_ACCESS,
        id: 15,
      },
    };
    expect(priceLists(existingState, action)).toEqual(expected);
  });
  it('should handle DELETE_LIST_ERROR action for price lists', () => {
    const error = {
      error: 'test',
    };
    const expected = {
      ...state,
      isFetching: false,
      priceListsError: error,
      listsError: error.error,
    };
    const action = {
      type: `${DELETE_LIST}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.PRICE,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle DELETE_LIST_ERROR action for entitlement lists', () => {
    const error = {
      error: 'test',
    };
    const expected = {
      ...state,
      isFetching: false,
      entitlementListsError: error,
      listsError: error.error,
    };
    const action = {
      type: `${DELETE_LIST}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.ENTITLEMENT,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle DELETE_LIST_ERROR action for price access lists', () => {
    const error = {
      error: 'test',
    };
    const expected = {
      ...state,
      isFetching: false,
      priceAccessListsError: error,
      listsError: error.error,
    };
    const action = {
      type: `${DELETE_LIST}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.PRICE_ACCESS,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle FETCH_PRICELISTS_TO_CREATE_ITEM_PENDING action', () => {
    const expected = {
      ...state,
      isFetching: true,
    };
    const action = {
      type: `${FETCH_PRICELISTS_TO_CREATE_ITEM}_${PENDING}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle FETCH_PRICELISTS_TO_CREATE_ITEM_SUCCESS action for product entitlement items to create', () => {
    const response = {
      response: {
        content: [{}],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceListsToCreateItemsLists: response.response,
      priceListsToCreateItemsListsFetched: true,
      listsError: null,
      entitlementListsError: null,
      priceAccessListsError: null,
      assignHeaderChecked: false,
    };
    const action = {
      type: `${FETCH_PRICELISTS_TO_CREATE_ITEM}_${SUCCESS}`,
      response,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle FETCH_PRICELISTS_TO_CREATE_ITEM_ERROR action for product entitlement items to create', () => {
    const error = {
      error: {
        responseMetaData: { processingTime: 61 },
        code: 401,
        status: 'UNAUTHORIZED',
        message: 'Not Valid user',
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceListsToCreateItemsListsError: error,
      listsError: error.error,
      priceListsToCreateItemsListsFetched: true,
    };
    const action = {
      type: `${FETCH_PRICELISTS_TO_CREATE_ITEM}_${ERROR}`,
      error,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle SEARCH_LISTS_PENDING action', () => {
    const expected = {
      ...state,
      isFetching: true,
    };
    const action = {
      type: `${SEARCH_LISTS}_${PENDING}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle SEARCH_LISTS_SUCCESS action for price lists', () => {
    const response = {
      response: {
        content: [{}],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceLists: response.response,
    };
    const action = {
      type: `${SEARCH_LISTS}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.PRICE,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle SEARCH_LISTS_SUCCESS action for entitlement lists', () => {
    const response = {
      response: {
        content: [{}],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      entitlementLists: response.response,
    };
    const action = {
      type: `${SEARCH_LISTS}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.ENTITLEMENT,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle SEARCH_LISTS_SUCCESS action for price access lists', () => {
    const response = {
      response: {
        content: [{}],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceAccessLists: response.response,
    };
    const action = {
      type: `${SEARCH_LISTS}_${SUCCESS}`,
      response,
      payload: {
        listType: LIST_TYPES.PRICE_ACCESS,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle SEARCH_LISTS_ERROR action for price lists', () => {
    const error = {
      error: 'test',
    };
    const expected = {
      ...state,
      isFetching: false,
      priceListsError: error,
    };
    const action = {
      type: `${SEARCH_LISTS}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.PRICE,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle SEARCH_LISTS_ERROR action for entitlement lists', () => {
    const error = {
      error: 'test',
    };
    const expected = {
      ...state,
      isFetching: false,
      entitlementListsError: error,
    };
    const action = {
      type: `${SEARCH_LISTS}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.ENTITLEMENT,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle SEARCH_LISTS_ERROR action for price access lists', () => {
    const error = {
      error: 'test',
    };
    const expected = {
      ...state,
      isFetching: false,
      priceAccessListsError: error,
    };
    const action = {
      type: `${SEARCH_LISTS}_${ERROR}`,
      error,
      payload: {
        listType: LIST_TYPES.PRICE_ACCESS,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle SEARCH_PRICELISTS_TO_CREATE_ITEMS_PENDING action product entitlement items to create', () => {
    const expected = {
      ...state,
      isFetching: true,
    };
    const action = {
      type: `${SEARCH_PRICELISTS_TO_CREATE_ITEMS}_${PENDING}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle SEARCH_PRICELISTS_TO_CREATE_ITEMS_SUCCESS action for product entitlement items to create', () => {
    const response = {
      response: {
        content: [{}],
        totalElements: 1,
      },
    };
    const expected = {
      ...state,
      isFetching: false,
      priceListsToCreateItemsLists: response.response,
    };
    const action = {
      type: `${SEARCH_PRICELISTS_TO_CREATE_ITEMS}_${SUCCESS}`,
      response,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle SEARCH_PRICELISTS_TO_CREATE_ITEMS_ERROR action for product entitlement items to create', () => {
    const error = {
      error: 'test',
    };
    const expected = {
      ...state,
      isFetching: false,
      priceListsToCreateItemsListsError: error,
      listsError: null,
    };
    const action = {
      type: `${SEARCH_PRICELISTS_TO_CREATE_ITEMS}_${ERROR}`,
      error,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle TOGGLE_ALL_UNASSIGNED_LISTS action type and toggle allChecked value', () => {
    const toggleInitialState = {
      ...state,
      priceLists: {
        content: [
          {
            id: 618,
            name: 'test France78',
            region: 'NA',
            country: 'al',
            customerType: 'Industrial',
            supplier: 123,
            status: null,
            isAssigned: false,
          },
        ],
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageSize: 10,
          pageNumber: 3,
          offset: 30,
          unpaged: false,
          paged: true,
        },
        last: true,
        totalPages: 4,
        totalElements: 37,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        numberOfElements: 7,
        first: false,
        size: 10,
        number: 3,
        empty: false,
      },
      assignHeaderChecked: false,
    };
    const expectedState = {
      ...state,
      priceLists: {
        content: [
          {
            id: 618,
            name: 'test France78',
            region: 'NA',
            country: 'al',
            customerType: 'Industrial',
            supplier: 123,
            status: null,
            isAssigned: true,
          },
        ],
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageSize: 10,
          pageNumber: 3,
          offset: 30,
          unpaged: false,
          paged: true,
        },
        last: true,
        totalPages: 4,
        totalElements: 37,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        numberOfElements: 7,
        first: false,
        size: 10,
        number: 3,
        empty: false,
      },
      assignHeaderChecked: true,
    };
    const action = {
      type: TOGGLE_ALL_UNASSIGNED_LISTS,
      payload: {
        listType: LIST_TYPES.PRICE,
        checked: true,
      },
    };

    expect(priceLists(toggleInitialState, action)).toEqual(expectedState);
  });
  it('should handle UPDATE_ASSIGN_LIST_FIELD action', () => {
    const toggleInitialState = {
      ...state,
      priceLists: {
        content: [
          {
            id: 618,
            name: 'test France78',
            region: 'NA',
            country: 'al',
            customerType: 'Industrial',
            supplier: 123,
            status: null,
            isAssigned: false,
          },
        ],
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageSize: 10,
          pageNumber: 3,
          offset: 30,
          unpaged: false,
          paged: true,
        },
        last: true,
        totalPages: 4,
        totalElements: 37,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        numberOfElements: 7,
        first: false,
        size: 10,
        number: 3,
        empty: false,
      },
      assignHeaderChecked: false,
    };
    const expectedState = {
      ...state,
      priceLists: {
        content: [
          {
            id: 618,
            name: 'test France78',
            region: 'NA',
            country: 'al',
            customerType: 'Industrial',
            supplier: 123,
            status: null,
            isAssigned: true,
          },
        ],
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageSize: 10,
          pageNumber: 3,
          offset: 30,
          unpaged: false,
          paged: true,
        },
        last: true,
        totalPages: 4,
        totalElements: 37,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        numberOfElements: 7,
        first: false,
        size: 10,
        number: 3,
        empty: false,
      },
      assignHeaderChecked: true,
    };
    const action = {
      type: UPDATE_ASSIGN_LIST_FIELD,
      payload: {
        listType: LIST_TYPES.PRICE,
        id: 618,
        checked: true,
      },
    };

    expect(priceLists(toggleInitialState, action)).toEqual(expectedState);
  });
  it('should handle ASSIGN_PARTNER_LISTS_PENDING action', () => {
    const expected = {
      ...state,
      isFetching: true,
    };
    const action = {
      type: `${ASSIGN_PARTNER_LISTS}_${PENDING}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle ASSIGN_PARTNER_LISTS_SUCCESS action', () => {
    const expected = {
      ...state,
      isFetching: false,
    };
    const action = {
      type: `${ASSIGN_PARTNER_LISTS}_${SUCCESS}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle ASSIGN_PARTNER_LISTS_ERROR action', () => {
    const expected = {
      ...state,
      isFetching: false,
    };
    const action = {
      type: `${ASSIGN_PARTNER_LISTS}_${ERROR}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle INCLUDE_EXCLUDE_ITEM_PENDING action', () => {
    const expected = {
      ...state,
      isFetching: true,
    };
    const action = {
      type: `${INCLUDE_EXCLUDE_ITEM}_${PENDING}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle INCLUDE_EXCLUDE_ITEM_SUCCESS action', () => {
    const expected = {
      ...state,
      isFetching: false,
    };
    const action = {
      type: `${INCLUDE_EXCLUDE_ITEM}_${SUCCESS}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle INCLUDE_EXCLUDE_ITEM_ERROR action', () => {
    const expected = {
      ...state,
      isFetching: false,
    };
    const action = {
      type: `${INCLUDE_EXCLUDE_ITEM}_${ERROR}`,
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle TOGGLE_ALL_INCLUSION_LISTS action type and toggle allChecked value', () => {
    const toggleInitialState = {
      ...state,
      productEntitlementItemLists: {
        content: [
          {
            id: 3,
            name: 'productEntitlementItem3',
            sequenceId: 3,
            type: 'Feature',
            inclusion: 'Inclusion',
            selected: false,
          },
        ],
      },
      inclusionHeaderChecked: false,
    };
    const expectedState = {
      ...state,
      productEntitlementItemLists: {
        content: [
          {
            id: 3,
            name: 'productEntitlementItem3',
            sequenceId: 3,
            type: 'Feature',
            inclusion: 'Inclusion',
            selected: true,
          },
        ],
      },
      inclusionHeaderChecked: true,
    };
    const action = {
      type: TOGGLE_ALL_INCLUSION_LISTS,
      payload: {
        listType: LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM,
        checked: true,
      },
    };

    expect(priceLists(toggleInitialState, action)).toEqual(expectedState);
  });
  it('should handle UPDATE_INCLUDE_EXCLUDE_LIST_FIELD action', () => {
    const toggleInitialState = {
      ...state,
      productEntitlementItemLists: {
        content: [
          {
            id: 3,
            name: 'productEntitlementItem3',
            sequenceId: 3,
            type: 'Feature',
            inclusion: 'Inclusion',
            selected: false,
          },
        ],
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageSize: 10,
          pageNumber: 3,
          offset: 30,
          unpaged: false,
          paged: true,
        },
        last: true,
        totalPages: 4,
        totalElements: 37,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        numberOfElements: 7,
        first: false,
        size: 10,
        number: 3,
        empty: false,
      },
      inclusionHeaderChecked: false,
      showUpdateOrderError: 0,
    };
    const expectedState = {
      ...state,
      productEntitlementItemLists: {
        content: [
          {
            id: 3,
            name: 'productEntitlementItem3',
            sequenceId: 3,
            type: 'Feature',
            inclusion: 'Inclusion',
            selected: true,
          },
        ],
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageSize: 10,
          pageNumber: 3,
          offset: 30,
          unpaged: false,
          paged: true,
        },
        last: true,
        totalPages: 4,
        totalElements: 37,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        numberOfElements: 7,
        first: false,
        size: 10,
        number: 3,
        empty: false,
      },
      inclusionHeaderChecked: true,
      showUpdateOrderError: 0,
    };
    const action = {
      type: UPDATE_INCLUDE_EXCLUDE_LIST_FIELD,
      payload: {
        listType: LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM,
        id: 3,
        checked: true,
      },
    };

    expect(priceLists(toggleInitialState, action)).toEqual(expectedState);
  });
  it('should handle UPDATE_ORDER_LIST_FIELD action', () => {
    const updateOrderInitialState = {
      ...state,
      productEntitlementItemLists: {
        content: [
          {
            id: 3,
            name: 'productEntitlementItem3',
            sequenceId: 1,
            type: 'Feature',
            inclusion: 'Inclusion',
          },
        ],
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageSize: 10,
          pageNumber: 3,
          offset: 30,
          unpaged: false,
          paged: true,
        },
        last: true,
        totalPages: 4,
        totalElements: 37,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        numberOfElements: 7,
        first: false,
        size: 10,
        number: 3,
        empty: false,
      },
    };
    const expectedState = {
      ...state,
      productEntitlementItemLists: {
        content: [
          {
            id: 3,
            name: 'productEntitlementItem3',
            sequenceId: 3,
            type: 'Feature',
            inclusion: 'Inclusion',
          },
        ],
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageSize: 10,
          pageNumber: 3,
          offset: 30,
          unpaged: false,
          paged: true,
        },
        last: true,
        totalPages: 4,
        totalElements: 37,
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        numberOfElements: 7,
        first: false,
        size: 10,
        number: 3,
        empty: false,
      },
    };
    const action = {
      type: UPDATE_ORDER_LIST_FIELD,
      payload: {
        listType: LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM,
        id: 3,
        value: 3,
      },
    };

    expect(priceLists(updateOrderInitialState, action)).toEqual(expectedState);
  });
  it('should handle ITEM_UPDATE_ORDER_PENDING action', () => {
    const expected = {
      ...state,
      isFetching: true,
      productEntitlementItemListsFetched: false,
    };
    const action = {
      type: `${ITEM_UPDATE_ORDER}_${PENDING}`,
      payload: {
        listType: LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle ITEM_UPDATE_ORDER_SUCCESS action', () => {
    const expected = {
      ...state,
      isFetching: false,
      productEntitlementItemListsFetched: true,
    };
    const action = {
      type: `${ITEM_UPDATE_ORDER}_${SUCCESS}`,
      payload: {
        listType: LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle ITEM_UPDATE_ORDER_ERROR action', () => {
    const expected = {
      ...state,
      isFetching: false,
      productEntitlementItemListsFetched: true,
    };
    const action = {
      type: `${ITEM_UPDATE_ORDER}_${ERROR}`,
      payload: {
        listType: LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
  it('should handle CLEAR_LIST_TYPE_ERROR action', () => {
    const expected = {
      ...state,
      productEntitlementItemListsError: null,
    };
    const action = {
      type: CLEAR_LIST_TYPE_ERROR,
      payload: {
        listType: LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM,
      },
    };
    expect(priceLists(state, action)).toEqual(expected);
  });
});

// actions......

import fetchMock from 'fetch-mock';
import {
  REQUEST_LISTS,
  CREATE_LIST,
  DELETE_LIST,
  FETCH_PRICELISTS_TO_CREATE_ITEM,
  SEARCH_LISTS,
  SEARCH_PRICELISTS_TO_CREATE_ITEMS,
  TOGGLE_ALL_UNASSIGNED_LISTS,
  UPDATE_ASSIGN_LIST_FIELD,
  ASSIGN_PARTNER_LISTS,
  INCLUDE_EXCLUDE_ITEM,
  TOGGLE_ALL_INCLUSION_LISTS,
  UPDATE_INCLUDE_EXCLUDE_LIST_FIELD,
  UPDATE_ORDER_LIST_FIELD,
  ITEM_UPDATE_ORDER,
  CLEAR_LIST_TYPE_ERROR,
} from '../constants/actionTypes';
import { PENDING, SUCCESS, ERROR } from '../constants/status';
import {
  fetchLists,
  createList,
  deleteList,
  fetchPricelistsToCreateItem,
  searchLists,
  searchPricelistsToCreateItem,
  toggleAllUnassigned,
  updateAssignListFields,
  assignPartnerLists,
  includeExcludeItem,
  toggleAllInclusion,
  updateIncludeExcludeListField,
  updateOrderListField,
  itemUpdateOrder,
  formatFetchPricelistsToCreateItemResponse,
  clearListTypeError,
} from './priceLists';
import api from '../api';
import { createMockStore } from '../testsHelper';
import priceListsMock from '../mocks/priceLists';
import fetchItemsToCreateMock from '../mocks/fetchItemsToCreate';
import {
  LIST_TYPES,
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_START_PAGE,
} from '../constants/constants';

describe('Actions - priceLists', function () {
  describe('fetchLists', function () {
    const mockData = priceListsMock[LIST_TYPES.PRICE];
    const page = DEFAULT_START_PAGE;
    const size = DEFAULT_ITEMS_PER_PAGE;
    const listType = LIST_TYPES.PRICE;
    const response = {
      ...mockData,
      response: {
        ...mockData.response,
        content: mockData.response.content.slice(
          page * size,
          page * size + size
        ),
      },
    };
    it('should return mockData', () => {
      window.localStorage.setItem(
        'mockData',
        JSON.stringify({ priceLists: true })
      );
      expect(fetchLists({ listType })).toEqual({
        type: `${REQUEST_LISTS}_${SUCCESS}`,
        response,
        payload: {
          listType,
        },
      });
      window.localStorage.removeItem('mockData');
    });
    it('should call fetchLists actions success flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${REQUEST_LISTS}_${PENDING}` },
        {
          type: `${REQUEST_LISTS}_${SUCCESS}`,
          response,
          payload: { listType },
        },
      ];

      fetchMock.get(api.config.priceLists({ page, size }), {
        status: 200,
        body: response,
      });

      store.dispatch(fetchLists({ listType }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call fetchLists actions error flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${REQUEST_LISTS}_${PENDING}` },
        { type: `${REQUEST_LISTS}_${ERROR}` },
      ];

      fetchMock.get(api.config.priceLists({ page, size }), {
        status: 404,
        body: {},
      });

      store.dispatch(fetchLists({ listType }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
    it('should call fetchLists actions success flow for entitlement lists', (done) => {
      const store = createMockStore();
      const entListType = LIST_TYPES.ENTITLEMENT;
      const expectedActions = [
        { type: `${REQUEST_LISTS}_${PENDING}` },
        {
          type: `${REQUEST_LISTS}_${SUCCESS}`,
          response,
          payload: { listType: entListType },
        },
      ];

      fetchMock.get(api.config.entitlementLists({ page, size }), {
        status: 200,
        body: response,
      });

      store.dispatch(fetchLists({ listType: entListType }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call fetchLists actions error flow for entitlement lists', (done) => {
      const store = createMockStore();
      const entListType = LIST_TYPES.ENTITLEMENT;
      const expectedActions = [
        { type: `${REQUEST_LISTS}_${PENDING}` },
        { type: `${REQUEST_LISTS}_${ERROR}` },
      ];

      fetchMock.get(api.config.entitlementLists({ page, size }), {
        status: 404,
        body: {},
      });

      store.dispatch(fetchLists({ listType: entListType }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
    it('should call fetchLists actions success flow for price access lists', (done) => {
      const store = createMockStore();
      const priceAccessListType = LIST_TYPES.PRICE_ACCESS;
      const expectedActions = [
        { type: `${REQUEST_LISTS}_${PENDING}` },
        {
          type: `${REQUEST_LISTS}_${SUCCESS}`,
          response,
          payload: { listType: priceAccessListType },
        },
      ];

      fetchMock.get(api.config.priceAccessLists({ page, size }), {
        status: 200,
        body: response,
      });

      store.dispatch(fetchLists({ listType: priceAccessListType }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call fetchLists actions error flow for price access lists', (done) => {
      const store = createMockStore();
      const priceAccessListType = LIST_TYPES.PRICE_ACCESS;
      const expectedActions = [
        { type: `${REQUEST_LISTS}_${PENDING}` },
        { type: `${REQUEST_LISTS}_${ERROR}` },
      ];

      fetchMock.get(api.config.priceAccessLists({ page, size }), {
        status: 404,
        body: {},
      });

      store.dispatch(fetchLists({ listType: priceAccessListType }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
  });

  describe('createList', function () {
    const listType = LIST_TYPES.PRICE;
    const data = { test: 'test data' };
    const response = {
      code: 200,
      status: 'OK',
      response: {
        test: 'new list content properties',
      },
    };
    it('should call createList actions success flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${CREATE_LIST}_${PENDING}` },
        { type: `${CREATE_LIST}_${SUCCESS}`, response, payload: { listType } },
      ];

      fetchMock.post(api.config.createPriceList(), {
        status: 200,
        body: response,
      });

      store.dispatch(createList({ listType, data }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call createList actions error flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${CREATE_LIST}_${PENDING}` },
        { type: `${CREATE_LIST}_${ERROR}` },
      ];

      fetchMock.post(api.config.createPriceList(), {
        status: 404,
        body: {},
      });

      store.dispatch(createList({ listType, data }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
    it('should call createList actions success flow for entitlement lists', (done) => {
      const store = createMockStore();
      const entListType = LIST_TYPES.ENTITLEMENT;
      const expectedActions = [
        { type: `${CREATE_LIST}_${PENDING}` },
        {
          type: `${CREATE_LIST}_${SUCCESS}`,
          response,
          payload: { listType: entListType },
        },
      ];

      fetchMock.post(api.config.createEntitlementList(), {
        status: 200,
        body: response,
      });

      store.dispatch(createList({ listType: entListType }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call createList actions error flow for entitlement lists', (done) => {
      const store = createMockStore();
      const entListType = LIST_TYPES.ENTITLEMENT;
      const expectedActions = [
        { type: `${CREATE_LIST}_${PENDING}` },
        { type: `${CREATE_LIST}_${ERROR}` },
      ];

      fetchMock.post(api.config.createEntitlementList(), {
        status: 404,
        body: {},
      });

      store.dispatch(createList({ listType: entListType }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
    it('should call createList actions success flow for price access lists', (done) => {
      const store = createMockStore();
      const priceAccessListType = LIST_TYPES.PRICE_ACCESS;
      const expectedActions = [
        { type: `${CREATE_LIST}_${PENDING}` },
        {
          type: `${CREATE_LIST}_${SUCCESS}`,
          response,
          payload: { listType: priceAccessListType },
        },
      ];

      fetchMock.post(api.config.createPriceAccessList(), {
        status: 200,
        body: response,
      });

      store.dispatch(createList({ listType: priceAccessListType }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call createList actions error flow for price access lists', (done) => {
      const store = createMockStore();
      const priceAccessListType = LIST_TYPES.PRICE_ACCESS;
      const expectedActions = [
        { type: `${CREATE_LIST}_${PENDING}` },
        { type: `${CREATE_LIST}_${ERROR}` },
      ];

      fetchMock.post(api.config.createPriceAccessList(), {
        status: 404,
        body: {},
      });

      store.dispatch(createList({ listType: priceAccessListType }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
  });

  describe('deleteList', function () {
    const listType = LIST_TYPES.PRICE;
    const id = 15;
    const response = {
      responseMetaData: {
        processingTime: 269,
      },
      code: 200,
      status: 'OK',
    };
    it('should call deleteList actions success flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${DELETE_LIST}_${PENDING}` },
        {
          type: `${DELETE_LIST}_${SUCCESS}`,
          response,
          payload: { listType, id },
        },
      ];

      fetchMock.delete(api.config.deletePriceList(id), {
        status: 200,
        body: response,
      });

      store.dispatch(deleteList({ listType, id }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call deleteList actions error flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${DELETE_LIST}_${PENDING}` },
        { type: `${DELETE_LIST}_${ERROR}` },
      ];

      fetchMock.delete(api.config.deletePriceList(id), {
        status: 404,
        body: {},
      });

      store.dispatch(deleteList({ listType, id }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
    it('should call deleteList actions success flow for entitlement lists', (done) => {
      const store = createMockStore();
      const entListType = LIST_TYPES.ENTITLEMENT;
      const expectedActions = [
        { type: `${DELETE_LIST}_${PENDING}` },
        {
          type: `${DELETE_LIST}_${SUCCESS}`,
          response,
          payload: { listType: entListType, id },
        },
      ];

      fetchMock.delete(api.config.deleteEntitlementList(id), {
        status: 200,
        body: response,
      });

      store.dispatch(deleteList({ listType: entListType, id }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call deleteList actions error flow for entitlement lists', (done) => {
      const store = createMockStore();
      const entListType = LIST_TYPES.ENTITLEMENT;
      const expectedActions = [
        { type: `${DELETE_LIST}_${PENDING}` },
        { type: `${DELETE_LIST}_${ERROR}` },
      ];

      fetchMock.delete(api.config.deleteEntitlementList(id), {
        status: 404,
        body: {},
      });

      store.dispatch(deleteList({ listType: entListType, id }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
    it('should call deleteList actions success flow for price access lists', (done) => {
      const store = createMockStore();
      const priceAccessListType = LIST_TYPES.PRICE_ACCESS;
      const expectedActions = [
        { type: `${DELETE_LIST}_${PENDING}` },
        {
          type: `${DELETE_LIST}_${SUCCESS}`,
          response,
          payload: { listType: priceAccessListType, id },
        },
      ];

      fetchMock.delete(api.config.deletePriceAccessList(id), {
        status: 200,
        body: response,
      });

      store.dispatch(deleteList({ listType: priceAccessListType, id }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call deleteList actions error flow for price access lists', (done) => {
      const store = createMockStore();
      const priceAccessListType = LIST_TYPES.PRICE_ACCESS;
      const expectedActions = [
        { type: `${DELETE_LIST}_${PENDING}` },
        { type: `${DELETE_LIST}_${ERROR}` },
      ];

      fetchMock.delete(api.config.deletePriceAccessList(id), {
        status: 404,
        body: {},
      });

      store.dispatch(deleteList({ listType: priceAccessListType, id }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
  });

  describe('fetchPricelistsToCreateItem', function () {
    const mockData =
      fetchItemsToCreateMock[LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM.toLowerCase()];
    const page = DEFAULT_START_PAGE;
    const size = DEFAULT_ITEMS_PER_PAGE;
    const id = 1095;
    const listType = LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM;
    const response = formatFetchPricelistsToCreateItemResponse({
      mockData,
      page,
      size,
    });
    it('should return mockData', () => {
      window.localStorage.setItem(
        'mockData',
        JSON.stringify({ fetchPricelistsToCreateItem: true })
      );
      expect(fetchPricelistsToCreateItem({ listType })).toEqual({
        type: `${FETCH_PRICELISTS_TO_CREATE_ITEM}_${SUCCESS}`,
        response,
      });
      window.localStorage.removeItem('mockData');
    });
    it('should call fetchPricelistsToCreateItem actions success flow for create prdocuct entitlement items', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${FETCH_PRICELISTS_TO_CREATE_ITEM}_${PENDING}` },
        { type: `${FETCH_PRICELISTS_TO_CREATE_ITEM}_${SUCCESS}`, response },
      ];

      fetchMock.get(
        api.config.fetchPricelistsToCreateItem({ page, size, id }),
        {
          status: 200,
          body: response,
        }
      );

      store.dispatch(fetchPricelistsToCreateItem({ listType, id }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        done();
      }, 10);
    });
    it('should call fetchPricelistsToCreateItem actions error flow for create prdocuct entitlement items', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${FETCH_PRICELISTS_TO_CREATE_ITEM}_${PENDING}` },
        { type: `${FETCH_PRICELISTS_TO_CREATE_ITEM}_${ERROR}` },
      ];

      fetchMock.get(
        api.config.fetchPricelistsToCreateItem({ page, size, id }),
        {
          status: 404,
          body: {},
        }
      );

      store.dispatch(fetchPricelistsToCreateItem({ listType, id }));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
  });

  describe('searchLists', function () {
    const mockData = priceListsMock[LIST_TYPES.PRICE];
    const page = DEFAULT_START_PAGE;
    const size = DEFAULT_ITEMS_PER_PAGE;
    const listType = LIST_TYPES.PRICE;
    const filter = 'country';
    const searchValue = 'au';
    const response = {
      ...mockData,
      response: {
        ...mockData.response,
        content: mockData.response.content.slice(
          page * size,
          page * size + size
        ),
      },
    };
    it('should return mockData', () => {
      window.localStorage.setItem(
        'mockData',
        JSON.stringify({ priceLists: true })
      );
      expect(searchLists({ listType, filter, searchValue })).toEqual({
        type: `${SEARCH_LISTS}_${SUCCESS}`,
        response,
        payload: {
          listType,
        },
      });
      window.localStorage.removeItem('mockData');
    });
    it('should call searchLists actions success flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${SEARCH_LISTS}_${PENDING}` },
        { type: `${SEARCH_LISTS}_${SUCCESS}`, response, payload: { listType } },
      ];

      fetchMock.get(
        api.config.priceLists({ page, size, filter, searchValue }),
        {
          status: 200,
          body: response,
        }
      );

      store.dispatch(
        searchLists({ page, size, listType, filter, searchValue })
      );
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call searchLists actions error flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${SEARCH_LISTS}_${PENDING}` },
        { type: `${SEARCH_LISTS}_${ERROR}` },
      ];

      fetchMock.get(
        api.config.priceLists({
          page,
          size,
          filter,
          searchValue,
        }),
        {
          status: 404,
          body: {},
        }
      );

      store.dispatch(
        searchLists({ page, size, listType, filter, searchValue })
      );
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
    it('should call searchLists actions success flow for entitlement lists', (done) => {
      const store = createMockStore();
      const entitilementListType = LIST_TYPES.ENTITLEMENT;
      const expectedActions = [
        { type: `${SEARCH_LISTS}_${PENDING}` },
        {
          type: `${SEARCH_LISTS}_${SUCCESS}`,
          response,
          payload: { listType: entitilementListType },
        },
      ];

      fetchMock.get(
        api.config.entitlementLists({ page, size, filter, searchValue }),
        {
          status: 200,
          body: response,
        }
      );

      store.dispatch(
        searchLists({
          page,
          size,
          listType: entitilementListType,
          filter,
          searchValue,
        })
      );
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call searchLists actions error flow for entitlement lists', (done) => {
      const store = createMockStore();
      const entitilementListType = LIST_TYPES.ENTITLEMENT;
      const expectedActions = [
        { type: `${SEARCH_LISTS}_${PENDING}` },
        { type: `${SEARCH_LISTS}_${ERROR}` },
      ];

      fetchMock.get(
        api.config.entitlementLists({
          page,
          size,
          filter,
          searchValue,
        }),
        {
          status: 404,
          body: {},
        }
      );

      store.dispatch(
        searchLists({
          page,
          size,
          listType: entitilementListType,
          filter,
          searchValue,
        })
      );
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
    it('should call searchLists actions success flow for price access lists', (done) => {
      const store = createMockStore();
      const priceAccessListType = LIST_TYPES.PRICE_ACCESS;
      const expectedActions = [
        { type: `${SEARCH_LISTS}_${PENDING}` },
        {
          type: `${SEARCH_LISTS}_${SUCCESS}`,
          response,
          payload: { listType: priceAccessListType },
        },
      ];

      fetchMock.get(
        api.config.priceAccessLists({ page, size, filter, searchValue }),
        {
          status: 200,
          body: response,
        }
      );

      store.dispatch(
        searchLists({
          page,
          size,
          listType: priceAccessListType,
          filter,
          searchValue,
        })
      );
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call searchLists actions error flow for price access lists', (done) => {
      const store = createMockStore();
      const priceAccessListType = LIST_TYPES.PRICE_ACCESS;
      const expectedActions = [
        { type: `${SEARCH_LISTS}_${PENDING}` },
        { type: `${SEARCH_LISTS}_${ERROR}` },
      ];

      fetchMock.get(
        api.config.priceAccessLists({
          page,
          size,
          filter,
          searchValue,
        }),
        {
          status: 404,
          body: {},
        }
      );

      store.dispatch(
        searchLists({
          page,
          size,
          listType: priceAccessListType,
          filter,
          searchValue,
        })
      );
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
  });

  describe('searchPricelistsToCreateItem', function () {
    const mockData =
      fetchItemsToCreateMock[LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM.toLowerCase()];
    const page = DEFAULT_START_PAGE;
    const size = DEFAULT_ITEMS_PER_PAGE;
    const listType = LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM;
    const id = 1095;
    const searchValue = 'pr';
    const response = formatFetchPricelistsToCreateItemResponse({
      mockData,
      page,
      size,
    });
    it('should return mockData', () => {
      window.localStorage.setItem(
        'mockData',
        JSON.stringify({ fetchPricelistsToCreateItem: true })
      );
      expect(
        searchPricelistsToCreateItem({ listType, id, searchValue })
      ).toEqual({
        type: `${SEARCH_PRICELISTS_TO_CREATE_ITEMS}_${SUCCESS}`,
        response,
      });
      window.localStorage.removeItem('mockData');
    });
    it('should call searchPricelistsToCreateItem actions success flow for create prdocuct entitlement items', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${SEARCH_PRICELISTS_TO_CREATE_ITEMS}_${PENDING}` },
        {
          type: `${SEARCH_PRICELISTS_TO_CREATE_ITEMS}_${SUCCESS}`,
          response,
          payload: { listType },
        },
      ];

      fetchMock.get(
        api.config.fetchPricelistsToCreateItem({ id, page, size, searchValue }),
        {
          status: 200,
          body: response,
        }
      );

      store.dispatch(
        searchPricelistsToCreateItem({ listType, id, searchValue })
      );
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        done();
      }, 10);
    });
    it('should call searchPricelistsToCreateItem actions error flow for create prdocuct entitlement items', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${SEARCH_PRICELISTS_TO_CREATE_ITEMS}_${PENDING}` },
        { type: `${SEARCH_PRICELISTS_TO_CREATE_ITEMS}_${ERROR}` },
      ];

      fetchMock.get(
        api.config.fetchPricelistsToCreateItem({ id, page, size, searchValue }),
        {
          status: 404,
          body: {},
        }
      );

      store.dispatch(
        searchPricelistsToCreateItem({ listType, id, searchValue })
      );
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
  });

  describe('toggleAllUnassigned', function () {
    it('should return TOGGLE_ALL_UNASSIGNED_LISTS', () => {
      const listType = LIST_TYPES.PRICE;
      const checked = true;
      expect(toggleAllUnassigned(listType, checked)).toEqual({
        type: TOGGLE_ALL_UNASSIGNED_LISTS,
        payload: {
          listType,
          checked,
        },
      });
    });
  });

  describe('updateAssignListFields', function () {
    it('should return UPDATE_ASSIGN_LIST_FIELD', () => {
      const listType = LIST_TYPES.PRICE;
      const id = 123;
      const checked = true;
      expect(updateAssignListFields(listType, id, checked)).toEqual({
        type: UPDATE_ASSIGN_LIST_FIELD,
        payload: {
          listType,
          id,
          checked,
        },
      });
    });
  });

  describe('assignPartnerLists', function () {
    const data = {
      priceLists: {
        priceListKey: 666,
        partnerKey: 3600339351,
      },
    };
    const response = {
      code: 200,
      status: 'OK',
      response: [
        {
          priceListKey: 666,
          partnerkey: 3600339351,
        },
      ],
    };
    const listType = LIST_TYPES.PRICE;
    it('should call assignPartnerLists actions success flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${ASSIGN_PARTNER_LISTS}_${PENDING}` },
        {
          type: `${ASSIGN_PARTNER_LISTS}_${SUCCESS}`,
          response,
        },
      ];

      fetchMock.post(api.config.assignPartnerPriceLists(data), {
        status: 200,
        body: response,
      });

      store.dispatch(assignPartnerLists(listType, data));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        done();
      }, 10);
    });

    it('should call assignPartnerLists actions error flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${ASSIGN_PARTNER_LISTS}_${PENDING}` },
        { type: `${ASSIGN_PARTNER_LISTS}_${ERROR}` },
      ];

      fetchMock.post(api.config.assignPartnerPriceLists(), {
        status: 404,
        body: {},
      });
      store.dispatch(assignPartnerLists(listType, data));

      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });

    it('should call assignPartnerLists actions success flow for Entitlement lists', (done) => {
      const listTypeEntitlement = LIST_TYPES.ENTITLEMENT;
      const store = createMockStore();
      const expectedActions = [
        { type: `${ASSIGN_PARTNER_LISTS}_${PENDING}` },
        {
          type: `${ASSIGN_PARTNER_LISTS}_${SUCCESS}`,
          response,
        },
      ];

      fetchMock.post(api.config.assignPartnerEntitlementLists(data), {
        status: 200,
        body: response,
      });

      store.dispatch(assignPartnerLists(listTypeEntitlement, data));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        done();
      }, 10);
    });

    it('should call assignPartnerLists actions error flow for Entitlement lists', (done) => {
      const listTypeEntitlement = LIST_TYPES.ENTITLEMENT;
      const store = createMockStore();
      const expectedActions = [
        { type: `${ASSIGN_PARTNER_LISTS}_${PENDING}` },
        { type: `${ASSIGN_PARTNER_LISTS}_${ERROR}` },
      ];

      fetchMock.post(api.config.assignPartnerEntitlementLists(), {
        status: 404,
        body: {},
      });
      store.dispatch(assignPartnerLists(listTypeEntitlement, data));

      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });

    it('should call assignPartnerLists actions success flow for price access lists', (done) => {
      const listTypePriceAccess = LIST_TYPES.PRICE_ACCESS;
      const store = createMockStore();
      const expectedActions = [
        { type: `${ASSIGN_PARTNER_LISTS}_${PENDING}` },
        {
          type: `${ASSIGN_PARTNER_LISTS}_${SUCCESS}`,
          response,
        },
      ];

      fetchMock.post(api.config.assignPartnerPriceAccessLists(data), {
        status: 200,
        body: response,
      });

      store.dispatch(assignPartnerLists(listTypePriceAccess, data));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        done();
      }, 10);
    });

    it('should call assignPartnerLists actions error flow for price access lists', (done) => {
      const listTypePriceAccess = LIST_TYPES.PRICE_ACCESS;
      const store = createMockStore();
      const expectedActions = [
        { type: `${ASSIGN_PARTNER_LISTS}_${PENDING}` },
        { type: `${ASSIGN_PARTNER_LISTS}_${ERROR}` },
      ];

      fetchMock.post(api.config.assignPartnerPriceAccessLists(), {
        status: 404,
        body: {},
      });
      store.dispatch(assignPartnerLists(listTypePriceAccess, data));

      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
  });

  describe('includeExcludeItem', function () {
    const id = 1;
    const data = { action: 'exclude', incExcList: [1, 2] };
    const response = {
      code: 200,
      status: 'OK',
      response: {
        test: 'Include Exclude success',
      },
    };
    it('should call includeExcludeItem actions success flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${INCLUDE_EXCLUDE_ITEM}_${PENDING}` },
        { type: `${INCLUDE_EXCLUDE_ITEM}_${SUCCESS}`, response },
      ];

      fetchMock.post(api.config.includeExcludeItem(id), {
        status: 200,
        body: response,
      });

      store.dispatch(includeExcludeItem(id, data));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call includeExcludeItem actions error flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${INCLUDE_EXCLUDE_ITEM}_${PENDING}` },
        { type: `${INCLUDE_EXCLUDE_ITEM}_${ERROR}` },
      ];

      fetchMock.post(api.config.includeExcludeItem(id), {
        status: 404,
        body: {},
      });

      store.dispatch(includeExcludeItem(id, data));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
  });

  describe('toggleAllInclusion', function () {
    it('should return UPDATE_ASSIGN_LIST_FIELD', () => {
      const listType = LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM;
      const checked = true;
      expect(toggleAllInclusion(listType, checked)).toEqual({
        type: TOGGLE_ALL_INCLUSION_LISTS,
        payload: {
          listType,
          checked,
        },
      });
    });
  });

  describe('updateIncludeExcludeListField', function () {
    it('should return UPDATE_ASSIGN_LIST_FIELD', () => {
      const listType = LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM;
      const checked = true;
      const id = 2;
      expect(updateIncludeExcludeListField(listType, id, checked)).toEqual({
        type: UPDATE_INCLUDE_EXCLUDE_LIST_FIELD,
        payload: {
          listType,
          id,
          checked,
        },
      });
    });
  });

  describe('updateOrderListField', function () {
    it('should return UPDATE_ORDER_LIST_FIELD', () => {
      const listType = LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM;
      const value = 2;
      const id = 2;
      expect(updateOrderListField(listType, id, value)).toEqual({
        type: UPDATE_ORDER_LIST_FIELD,
        payload: {
          listType,
          id,
          value,
        },
      });
    });
  });

  describe('itemUpdateOrder', function () {
    const id = 1;
    const data = {
      items: [
        { id: 3600000167, sequenceId: '3' },
        { id: 3600000562, sequenceId: 2 },
        { id: 3600000168, sequenceId: '1' },
        { id: 3600000169, sequenceId: 4 },
      ],
    };
    const response = {
      code: 200,
      status: 'OK',
      response: {
        responseMetaData: { processingTime: 113 },
        code: 200,
        status: 'OK',
        response: [
          { id: 3600000167, sequenceId: 3 },
          { id: 3600000562, sequenceId: 2 },
          { id: 3600000168, sequenceId: 1 },
          { id: 3600000169, sequenceId: 4 },
        ],
      },
    };
    it('should call itemUpdateOrder actions success flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${ITEM_UPDATE_ORDER}_${PENDING}` },
        {
          type: `${ITEM_UPDATE_ORDER}_${SUCCESS}`,
          response,
          payload: { listType: LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM },
        },
      ];

      fetchMock.post(api.config.itemUpdateOrder(id), {
        status: 200,
        body: response,
      });

      store.dispatch(itemUpdateOrder('productEntitlementItem', id, data));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].response).toEqual(
          expectedActions[1].response
        );
        expect(store.getActions()[1].payload).toEqual(
          expectedActions[1].payload
        );
        done();
      }, 10);
    });
    it('should call itemUpdateOrder actions error flow for price lists', (done) => {
      const store = createMockStore();
      const expectedActions = [
        { type: `${ITEM_UPDATE_ORDER}_${PENDING}` },
        {
          type: `${ITEM_UPDATE_ORDER}_${ERROR}`,
          payload: { listType: LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM },
        },
      ];

      fetchMock.post(api.config.itemUpdateOrder(id), {
        status: 404,
        body: {},
      });

      store.dispatch(itemUpdateOrder('productEntitlementItem', id, data));
      // to track both actions we need to assert on next tick
      setTimeout(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        done();
      }, 10);
    });
  });

  describe('clearListTypeError', function () {
    it('should clear error of corresponding listtype', () => {
      const listType = LIST_TYPES.PRODUCT_ENTITLEMENT_ITEM;
      expect(clearListTypeError(listType)).toEqual({
        type: CLEAR_LIST_TYPE_ERROR,
        payload: {
          listType,
        },
      });
    });
  });
});

// test helper........

import React from 'react';
import { IntlProvider } from 'react-intl';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import configureStore from './store/configureStore';
import getMiddlewares from './middlewares';
import dictionary from './i18n/en';

import { initialState as alternativeSkuInitialState } from './reducers/alternativeSku';
import { initialState as dictionaryInitialState } from './reducers/dictionary';
import { initialState as searchInitialState } from './reducers/search';
import { initialState as productSettingsInitialState } from './reducers/productSettings';
import { initialState as suggestionsInitialState } from './reducers/suggestions';
import { initialState as priceListsInitialState } from './reducers/priceLists';
import { fireEvent } from '@testing-library/react';

const originalInitialState = {
  requests: {},
  dictionary: dictionaryInitialState,
  search: searchInitialState,
  productSettings: productSettingsInitialState,
  suggestions: suggestionsInitialState,
  priceLists: priceListsInitialState,
  alternativeSku: alternativeSkuInitialState,
};

export const WrapStore = ({ children, initialState = {} }) => {
  const state = { ...originalInitialState, ...initialState };
  const storeConfig = configureStore(getMiddlewares(), state);
  return (
    <storeConfig.Provider store={storeConfig.store}>
      {children}
    </storeConfig.Provider>
  );
};

export const WrapIntlProvider = ({ children }) => {
  return (
    <IntlProvider
      key={dictionary.locale}
      locale={dictionary.locale}
      messages={dictionary.messages}
    >
      {children}
    </IntlProvider>
  );
};

export const createMockStore = () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  return mockStore({});
};

// used to test middlewares
export const create = (middleware) => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn(() => 'RESULT');

  const invoke = (action) => middleware(store)(next)(action);

  return { store, next, invoke };
};

export const backspace = (element) => {
  let actuallyTyped = element.value;

  const backspaceKey = {
    key: 'Backspace',
    code: 8,
    inputType: 'deleteContentBackward',
  };

  const sharedEventConfig = {
    key: backspaceKey.key,
    charCode: backspaceKey.code,
    keyCode: backspaceKey.code,
    which: backspaceKey.code,
    modifier: backspaceKey.modifier,
  };
  const downEvent = fireEvent.keyDown(element, sharedEventConfig);

  if (downEvent) {
    actuallyTyped = actuallyTyped.slice(0, -1);

    fireEvent.input(element, {
      target: { value: actuallyTyped },
      inputType: backspaceKey.inputType,
      bubbles: true,
      cancelable: true,
    });
  }

  fireEvent.keyUp(element, sharedEventConfig);
};
