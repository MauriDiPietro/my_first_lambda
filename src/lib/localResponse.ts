export class localresponse {
  status: number;
  response: response;
  constructor(_status = 500, _response: response) {
    this.status = _status;
    this.response = _response;
  }
}
export class response {
  title: string;
  msg: string;
  data: any;
  constructor(_title = "", _msg = "", _data: any = "") {
    this.title = _title;
    this.msg = _msg;
    this.data = _data;
  }
}
export class httpresponse {
  code: number;
  status: boolean;
  response: response;
  constructor(_code: number, _status = false, _response: response) {
    this.code = _code;
    this.status = _status;
    this.response = _response;
  }
}
