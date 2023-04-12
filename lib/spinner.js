import ora from 'ora';

class Spinner {
  constructor(startMsg) {
    const options = {
      spinner: 'simpleDots',
      text: startMsg
    }
    
    this.spinner = ora(options);
    this.spinner.start();
  }

  succeed(msg) {
    this.spinner.succeed(msg);
  }

  fail(msg) {
    this.spinner.fail(msg);
  }

  info(msg) {
    this.spinner.info(msg);
  }

  start() {
    this.spinner.start();
  }

  update(text) {
    this.spinner.text = text;
  }
}

export default Spinner;