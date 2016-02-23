export class ByteBeat {
  constructor(context) {
    const BUFFER_SIZE = 1024;

    this._context = context;
    this._processor = context.createScriptProcessor(BUFFER_SIZE, 1, 1);
    this._sampleRate = 8000;
    this._t = 0;
    this._step = 0;

    this.code = "Math.sin(t) * 127 + 127";

    this._processor.onaudioprocess = (e) => {
      const stepSize = this._context.sampleRate / this._sampleRate;
      const data = e.outputBuffer.getChannelData(0);
      data.forEach((v, i) => {
        data[i] = this.calc(this._t);
        if (Math.floor(++this._step % stepSize) === 0) {
          this._t++;
        }
      });
    };
  }

  connect(destination) {
    this._processor.connect(destination);
  }

  disconnect() {
    this._processor.disconnect();
  }

  calc(t) {
    return ((this._fn(t) & 255) - 127) / 255;
  }

  reset() {
    this._t = 0;
    this._step = 0;
  }

  set code(value){
    this._code = value;
    this._fn = eval("(function(){return function(t){return " + value +";}})()");
  }

  get code() {
    return this._code;
  }

  set sampleRate(value) {
    this._sampleRate = value;
  }

  get sampleRate() {
    return this._sampleRate;
  }

  get t() {
    return this._t;
  }
}

export default ByteBeat;
