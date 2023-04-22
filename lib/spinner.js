import ora from 'ora';

class Spinner {
  constructor(startMsg) {
    const options = {
      spinner: 'point',
      text: startMsg
    }
    
    this.spinner = ora(options);
  }

  succeed(msg) {
    this.spinner.succeed(msg);
  }

  fail(msg) {
    this.spinner.fail(msg);
  }

  start() {
    this.spinner.start();
  }

  update(msg) {
    this.spinner.text = msg;
  }
}

export default Spinner;
