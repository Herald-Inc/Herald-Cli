// import shell from 'shelljs';

export default async function destroy(args) {
  try {
    console.log("cdk destroy");
    // shell.exec("cdk destroy");
  } catch (error) {
    console.error(error);
  }
}