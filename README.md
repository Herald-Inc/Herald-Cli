# README #

### Installation
Herald has not yet been published to npm. To use the cli, clone the repo and skip the installation step. For now, do this:

Clone the repo and run this command in the root directory:

```
$ npm i -g .
```

**Not yet available**
```
$ npm i -g herald-cli
```

### Getting Started
To complete initialization successfully, the user must have aws-cli, aws-cdk and git-cli installed.

To initialize Herald and ensure you're environment is ready for deployment, run:

```
$ herald init
```

### Deploying to AWS
 Once Herald has been initialized, it is ready to be deployed to AWS. Run:

 ```
 $ herald deploy
 ```

 The user will be prompted for the VPC they wish to deploy Herald to.
 
 Select a VPC and confirm your choice.

 ### Tearing down Herald
 To destroy any evidence of Herald from AWS, run:

 ```
 $ herald destroy
 ```