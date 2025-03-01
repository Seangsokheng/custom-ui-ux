import { mockClubs } from '../../fakedb/guest';
import mock from '../MockConfig';

mock.onGet('/api/featured-clubs').reply(200, mockClubs);