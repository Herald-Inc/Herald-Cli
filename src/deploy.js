// import shell from 'shelljs';

export default async function deploy(args) {
  try {
    console.log("cdk deploy");
    // shell.exec("cdk deploy");
  } catch (error) {
    console.error(error);
  }
}

