![herald-logo](https://github.com/Herald-Inc/Herald-Cli/blob/main/img/herald-logo.png)
  
  
  
  
  
![shields.io npm license badge](https://img.shields.io/badge/license-ISC-brightgreen)

# Installation

```
$ npm install -g herald-cli
```

## Getting Started
To complete initialization successfully, the user must have aws-cli, aws-cdk and git-cli installed.

To initialize Herald and ensure you're environment is ready for deployment, run:

```
$ herald init
```

## Deploying to AWS
 Once Herald has been initialized, it is ready to be deployed to AWS, run:

 ```
 $ herald deploy
 ```

 The user will be prompted for the VPC they wish to deploy Herald to.
 
 Select a VPC and confirm your choice.

**Note:** The deployment can take upwards of 40 minutes.
 ## Tearing down Herald
 To delete Herald from AWS, run:

 ```
 $ herald destroy
 ```