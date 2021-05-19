import { actionToIpcAction } from './action-to-ipc-action';
import { detailRepoStarted } from '../constant/actions';
const url = 'url';

describe('actionToIpcAction', () => {
    it('worx', () => {
        expect(actionToIpcAction(detailRepoStarted({ url }))).toMatchSnapshot();
    });
});