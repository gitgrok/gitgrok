import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { skip } from 'rxjs/operators';

@Injectable()
export class SocketService {
    private _socket: any;
    private _socketSubject = new Subject();

    messages$ = this._socketSubject.pipe(
        skip(1)
    );

    send(msg: any) {
        this._socket.send(msg);
    }

    private init() {
        if (!this._socket) {
            this._socket = new WebSocket(this.host);

            this._socket.onopen = function (event) {
                this._socketSubject.next(event);
            };

            this._socket.onmessage = function (event) {
                this._socketSubject.next(event);
            }
        }
    }

    constructor(private readonly host: string) {
        this.init();
    }
}