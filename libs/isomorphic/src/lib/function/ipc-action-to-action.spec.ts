import { ipcActionToAction } from './ipc-action-to-action';
const actionType = 'actionType';
const actionProps = {any: 'thing'}

describe('ipcActionToAction', () => {
    it('worx', () => {
        expect(ipcActionToAction({actionType, actionProps})).toMatchSnapshot();
    });
});