import config from '~app/common/config';
import ApiRequest, { RequestData } from '~lib/utils/ApiRequest';

type OperatorsListQuery = {
    page?: number,
    search?: string,
    type?: string[],
    perPage?: number
    status?: boolean,
    ordering?: string,
    validatorsCount?: boolean,
};

class Operator {
    private static instance: Operator;
    private readonly baseUrl: string = '';

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    static getInstance(): Operator {
        if (!Operator.instance) {
            Operator.instance = new Operator(config.links.EXPLORER_CENTER);
        }
        return Operator.instance;
    }

    static get NETWORK() {
        return 'prater';
    }

    /**
     * Get operators by owner Address
     */
    async getOperatorsByOwnerAddress(page: number = 1, perPage: number = 5, ownerAddress: string) {
        const operatorsEndpointUrl = `${String(process.env.REACT_APP_OPERATORS_ENDPOINT)}/operators/owned_by/${ownerAddress}?page=${page}&perPage=${perPage}`;
        const requestInfo: RequestData = {
            url: operatorsEndpointUrl,
            method: 'GET',
            headers: [
                { name: 'content-type', value: 'application/json' },
                { name: 'accept', value: 'application/json' },
            ],
        };
        const response: any = await new ApiRequest(requestInfo).sendRequest();
        return response;
    }

    /**
     * Get operators
     */
    async getOperators(props: OperatorsListQuery) {
        const { page, perPage, type, ordering, status, search, validatorsCount } = props;
        let operatorsEndpointUrl = `${String(process.env.REACT_APP_OPERATORS_ENDPOINT)}/operators?`;
        if (validatorsCount) operatorsEndpointUrl += 'validatorsCount=true&';
        if (search) operatorsEndpointUrl += `search=${search}&`;
        if (ordering) operatorsEndpointUrl += `ordering=${ordering}&`;
        if (status) operatorsEndpointUrl += 'status=true&';
        if (page) operatorsEndpointUrl += `page=${page}&`;
        if (perPage) operatorsEndpointUrl += `perPage=${perPage}&`;
        if (type) operatorsEndpointUrl += `type=${type.join(',')}`;

        const requestInfo: RequestData = {
            url: operatorsEndpointUrl,
            method: 'GET',
            headers: [
                { name: 'content-type', value: 'application/json' },
                { name: 'accept', value: 'application/json' },
            ],
        };
        const response: any = await new ApiRequest(requestInfo).sendRequest();
        return response;
    }
}

export default Operator;